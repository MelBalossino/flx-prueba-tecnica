import React from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/actions/usersActions';

const UserDeleteModal = ({ userToDelete, isModalVisible, setIsModalVisible }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (userToDelete) {
            dispatch(removeUser(userToDelete.id));
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                title="Eliminar usuario"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Eliminar"
                cancelText="Cancelar"
                okButtonProps={{ danger: true }}       //! <= Se utiliza la propiedad danger para resaltar el botón de eliminar.
            >
                <p>¿Está seguro que quiere eliminar el usuario {userToDelete?.username}?</p>
            </Modal>
        </>
    );
};

export default UserDeleteModal;