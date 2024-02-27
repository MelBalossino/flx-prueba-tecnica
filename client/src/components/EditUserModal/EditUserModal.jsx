import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, InputNumber, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/usersActions';

const { Option } = Select;

const EditUserModal = ({ isVisible, handleCancel, user }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(editUser(user.id, values));
        handleCancel();
    };

    useEffect(() => {
        form.setFieldsValue(user);       // <= Solución bug: para que "user" sea el usuario actual a editar
    }, [user, form]);

    return (
        <Modal title="Editar Usuario" open={isVisible} onCancel={handleCancel} footer={null}>
            <Form form={form} initialValues={user} onFinish={onSubmit} requiredMark={false} layout='vertical'>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Usuario"
                            rules={[{ required: true, message: 'El usuario es requerido' },
                            { min: 4, message: 'El usuario debe tener al menos 4 caracteres' },
                            { max: 12, message: 'El usuario no puede tener más de 12 caracteres' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: 'El usuario sólo puede contener letras, números y guiones bajos' },]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="name" label="Nombre" rules={[
                            { required: true, message: 'El nombre es requerido' },
                            { min: 4, message: 'El nombre debe tener al menos 4 caracteres' },
                            { max: 40, message: 'El nombre no puede tener más de 40 caracteres' },
                            { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'El nombre sólo puede contener letras y espacios' }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="status" label="Estado">
                            <Select placeholder="Selecciona un estado">
                                <Option value="active">Activo</Option>
                                <Option value="inactive">Inactivo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'El email es requerido' },
                                { type: 'email', message: 'El email debe tener un formato válido' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="lastname" label="Apellido" rules={[
                            { required: true, message: 'El apellido es requerido' },
                            { min: 4, message: 'El apellido debe tener al menos 4 caracteres' },
                            { max: 40, message: 'El apellido no puede tener más de 40 caracteres' },
                            { pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'El apellido sólo puede contener letras y espacios' }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="age" label="Edad" rules={[
                            { required: true, message: 'La edad es requerida' },
                            { type: 'number', message: 'La edad debe ser un número' },
                            {
                                validator: (_, value) =>           // <= Solución bug: validación personalizada para evitar el error que surge en cómo antd maneja la validación de InputNumber con las reglas min y max.
                                    value >= 0 && value <= 120
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('La edad debe estar entre 0 y 120')),
                            },
                        ]}>
                            <InputNumber min={0} max={120} />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Editar usuario
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditUserModal;