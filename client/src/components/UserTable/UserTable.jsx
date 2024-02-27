import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'antd';
import { getAllUsers } from "../../redux/actions/usersActions";
import styles from "./UserTable.module.css";
import { getColumns } from "./columns";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, total } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const page = currentPage;
        dispatch(getAllUsers(page, 9));
    }, [dispatch, currentPage]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    }

    const showModal = (user) => {
        setUserToDelete(user);
        setIsModalVisible(true);
    };

    const columns = getColumns(showModal);

    return (
        <div className={styles['table-container']}>
            <div className={styles['ant-table-wrapper']}>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: 9,
                        total: total,
                        position: ['bottomRight']
                    }}
                    onChange={handleTableChange} />
                {userToDelete && (
                    <UserDeleteModal userToDelete={userToDelete} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />

                )}
            </div>
        </div>
    );
}

export default UserTable;






