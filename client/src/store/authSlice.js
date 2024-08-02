import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:false,
    userData:null,
    userEducation :[],
    userExperience:[],
    userAchivement:[]
}


const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            login: (state, action) => {
                state.status = true;
                state.userData = action.payload;
            },
            logout: (state) => {
                state.status = false;
                state.userData = null;
            },
            updateEducation: (state, action) => {
                state.userEducation = action.payload
            },
            updateExperience: (state, action) => {
                state.userExperience.push(action.payload)
            },
            updateAchivement: (state, action) => {
                state.userAchivement.push(action.payload)
            }
        }
    }
)


export const { login, logout, updateEducation, updateExperience, updateAchivement} = authSlice.actions;
export default authSlice.reducer;