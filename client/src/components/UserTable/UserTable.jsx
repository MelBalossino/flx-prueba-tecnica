import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'antd';
import { getAllUsers } from "../../redux/actions/usersActions";
import styles from "./UserTable.module.css";
import { getColumns } from "./columns";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";
import EditUserModal from "../EditUserModal/EditUserModal";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, total } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {                           // <= Paginación con limit y offset
        const page = currentPage;
        dispatch(getAllUsers(page, 9));
    }, [dispatch, currentPage]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    }

    const showEditModal = (user) => {
        setUserToEdit(user);
        setIsEditModalVisible(true);
    };

    const showDeleteModal = (user) => {
        setUserToDelete(user);
        setIsDeleteModalVisible(true);
    };

    const columns = getColumns(showEditModal, showDeleteModal);

    return (
        <div className={styles['table-container']}>
            <div className={styles['ant-table-wrapper']}>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"                           // <= Key
                    pagination={{
                        current: currentPage,
                        pageSize: 9,
                        total: total,
                        position: ['bottomRight']
                    }}
                    onChange={handleTableChange} />
                {userToEdit && (
                    <EditUserModal
                        user={userToEdit}
                        isVisible={isEditModalVisible}
                        handleCancel={() => setIsEditModalVisible(false)}
                    />
                )}
                {userToDelete && (
                    <UserDeleteModal 
                        userToDelete={userToDelete} 
                        isModalVisible={isDeleteModalVisible} 
                        setIsModalVisible={setIsDeleteModalVisible} 
                    />
                )}
            </div>
        </div>
    );
}

export default UserTable;






