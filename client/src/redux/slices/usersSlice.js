import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    total: 0,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.total -= 1;
        },
    },
});

export const { getUsers, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;