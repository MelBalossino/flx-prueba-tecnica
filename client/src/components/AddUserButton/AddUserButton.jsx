import React, { useState } from 'react';
import { Button } from 'antd';
import UserModal from '../UserModal/UserModal';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/usersActions';

const AddUserButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleSubmit = (values) => {
        dispatch(addUser(values));
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Agregar usuario
            </Button>
            <UserModal
                isVisible={isModalVisible}
                handleCancel={handleCancel}
                actionType="add"
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default AddUserButton;