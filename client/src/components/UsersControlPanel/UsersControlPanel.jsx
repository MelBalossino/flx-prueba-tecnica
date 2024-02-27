//! Componente para agrupar búsqueda, filtro y botón de agregar usuario.

import React from 'react';
import SearchUser from '../SearchUser/SearchUser';
import FilterUserByStatus from '../FilterUsersByStatus/FilterUserByStatus';
import AddUserButton from '../AddUserButton/AddUserButton';
import styles from './UsersControlPanel.module.css';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const UsersControlPanel = () => {
    return (
        <>
            <div className={styles.title}>
                <Title level={1}>
                    <Text type='secondary'>Usuarios / </Text>
                    <Text strong>Listado de usuarios</Text>
                </Title>
            </div>
            <div className={styles.toolbar}>
                <div className={styles.leftPart}>
                    <div className={styles.searchPart}>
                        <SearchUser />
                    </div>
                    <div className={styles.statusFilterPart}>
                        <FilterUserByStatus />
                    </div>
                </div>
                <div className={styles.addButtonPart}>
                    <AddUserButton />
                </div>
            </div>
        </>
    );
};

export default UsersControlPanel;