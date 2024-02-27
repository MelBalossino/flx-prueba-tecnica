import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin } from 'antd';
import { getAllUsers, editUser } from "../../redux/actions/usersActions";
import styles from "./UserTable.module.css";
import { getColumns } from "./columns";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";
import UserModal from "../UserModal/UserModal";
import useDelayedLoader from "../../hooks/useDelayedLoader";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, total } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalActionType, setModalActionType] = useState('edit');

    const fetchUsers = useCallback(() => {
        return dispatch(getAllUsers(currentPage, 9));
    }, [dispatch, currentPage]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    }

    const showEditModal = (user) => {
        setCurrentUser(user);
        setModalActionType('edit');
        setIsUserModalVisible(true);
    };

    const showDeleteModal = (user) => {
        setCurrentUser(user);
        setIsDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setIsUserModalVisible(false);
        setCurrentUser(null);
    };

    const onSubmit = (values) => {
        console.log('Updated values:', values);
        if (currentUser && currentUser.id) {
            dispatch(editUser(currentUser.id, values)).then(() => {
                setIsUserModalVisible(false);
                dispatch(getAllUsers(currentPage, 9));
            });
        }
    };

    const loading = useDelayedLoader(fetchUsers);            //! <= Uso de hook personalizado.
    const columns = getColumns(showEditModal, showDeleteModal);

    return (

        <div className={styles['table-container']}>
            <div className={styles['ant-table-wrapper']}>
                <Spin spinning={loading} tip="Loading...">
                    <Table
                        columns={columns}
                        dataSource={users}
                        rowKey="id"                            //! <= Key
                        pagination={{
                            current: currentPage,
                            pageSize: 9,
                            total: total,
                            position: ['bottomRight']
                        }}
                        onChange={handleTableChange} />
                </Spin>
                <UserModal
                    user={currentUser}
                    isVisible={isUserModalVisible}
                    handleCancel={handleCancel}
                    actionType={modalActionType}
                    onSubmit={onSubmit}
                />

                {currentUser && isDeleteModalVisible && (
                    <UserDeleteModal
                        userToDelete={currentUser}
                        isModalVisible={isDeleteModalVisible}
                        setIsModalVisible={setIsDeleteModalVisible}
                    />
                )}
            </div>
        </div>
    );
}

export default UserTable;






