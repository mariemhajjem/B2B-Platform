import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedUser: {},
    loading: false,
    displayed: false,
    displayUpdate: false,
    errors: false,
    list: [],
  };
  
// Slice
const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            state.list = action.payload;
        }, 
    },
});
export default slice.reducer
// Actions
const { getAllUsers } = slice.actions