import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'antd';
import { getAllUsers, editUser } from "../../redux/actions/usersActions";
import styles from "./UserTable.module.css";
import { getColumns } from "./columns";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";
import UserModal from "../UserModal/UserModal";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, total } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalActionType, setModalActionType] = useState('edit');

    useEffect(() => {                                                     //! <= Paginación con limit y offset
        const page = currentPage;
        dispatch(getAllUsers(page, 9));
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

    const columns = getColumns(showEditModal, showDeleteModal);

    return (
        <div className={styles['table-container']}>
            <div className={styles['ant-table-wrapper']}>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"                           //! <= Key
                    pagination={{
                        current: currentPage,
                        pageSize: 9,
                        total: total,
                        position: ['bottomRight']
                    }}
                    onChange={handleTableChange} />
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






