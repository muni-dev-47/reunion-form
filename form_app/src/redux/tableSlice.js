import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    employeesDetails: []
}

const tableSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployeesDetails: (state, action) => {
            state.employeesDetails = action.payload;
        }
    }
})

export const { addEmployeesDetails } = tableSlice.actions;
export default tableSlice.reducer;