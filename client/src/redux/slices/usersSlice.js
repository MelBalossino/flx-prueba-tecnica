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
    },
});

export const { getUsers } = usersSlice.actions;
export default usersSlice.reducer;