import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/usersActions";
import styles from "./UserTable.module.css";
import { Table } from 'antd';
import { columns } from "./columns";

const UserTable = () => {
    const dispatch = useDispatch();
    const { users, total } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const page = currentPage;
        dispatch(getAllUsers(page, 9));
    }, [dispatch, currentPage]);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
    }

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
            </div>
        </div>
    );
}

export default UserTable;






