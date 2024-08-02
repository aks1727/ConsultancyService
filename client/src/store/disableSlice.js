// this slice is for disabling next button in become mentor.jsx  from mentor update .jsx


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    disableNext: false,
};

const disableSlice = createSlice(
    {
        name: 'disable',
        initialState,
        reducers: {
            disableNext: (state) => {
                state.disableNext = true;
            },
            enableNext: (state) => {
                state.disableNext = false;
            },
        },
    }
)

export const { disableNext, enableNext } = disableSlice.actions;

export default disableSlice.reducer;