import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    message :"",
    code:""
};
// Slice
const slice = createSlice({
    name: 'error',
    initialState: initialState,
    reducers: { 
        SET_ERRORS: (state, action) => {
            state.message= action.payload.message;
            state.code= action.payload.code
        },
        CLEAR_ERRORS: (state, action) => {
            state.message= "";
            state.code= ""
        },
    },
});
export default slice.reducer

// Actions
export const { SET_ERRORS, CLEAR_ERRORS } = slice.actions
