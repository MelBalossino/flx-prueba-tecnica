//! Modularización de las columnas de la tabla de usuarios

import React from "react";
import { Tag, Space } from 'antd';

export const getColumns = (showEditModal, showDeleteModal) => [
    {
        title: 'Usuario',
        dataIndex: 'username',
        key: 'username',
        width: '26.65%',
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        width: '26.65%',
    },
    {
        title: 'Apellido',
        dataIndex: 'lastname',
        key: 'lastname',
        width: '26.65%',
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: status => {
            let color;
            let text = status.charAt(0).toUpperCase() + status.slice(1);
            switch (status.toLowerCase()) {
                case 'active':
                    color = 'green';
                    break;
                case 'inactive':
                    color = 'red';
                    break;
                default:
                    color = 'default';
            }
            return (
                <Tag color={color}>
                    {text}
                </Tag>
            );
        },
    },
    {
        title: 'Acciones',
        key: 'actions',
        width: '10%',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => showEditModal (record)}>Editar</a>
                <a onClick={() => showDeleteModal(record)}>Eliminar</a>
            </Space>
        ),
    },
];
