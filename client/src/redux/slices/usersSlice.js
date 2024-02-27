import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    total: 0,
    searchResults: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total;
        },
        createUser: (state, action) => {
            state.users.push(action.payload);
            state.total += 1;
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.total -= 1;
        },
        searchUsers: (state, action) => {
            state.searchResults = action.payload.users;
        },
    },
});

export const { getUsers, createUser, deleteUser, updateUser, searchUsers } = usersSlice.actions;
export default usersSlice.reducer;