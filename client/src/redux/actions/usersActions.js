import axios from 'axios';
import { getUsers, deleteUser, updateUser } from '../slices/usersSlice';

const apiUrl = import.meta.env.VITE_BASE_URL;

export const getAllUsers = (page = 1, limit = 9) => async (dispatch) => {
    try {
        const response = await axios.get(`${apiUrl}/users`, {
            params: {
                _page: page,
                _limit: limit
            }
        });
        const totalUsers = parseInt(response.headers['x-total-count'], 10);
        dispatch(getUsers({ users: response.data, total: totalUsers }));
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

export const editUser = (id, userData) => async (dispatch) => {
    try {
        const response = await axios.put(`${apiUrl}/users/${id}`, userData);
        dispatch(updateUser({ id: response.data.id, ...userData }));
        dispatch(getAllUsers());
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const removeUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`${apiUrl}/users/${id}`);
        dispatch(deleteUser(id));
        dispatch(getAllUsers());
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};