import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postFormData = createAsyncThunk(
    "formData",
    async (statment, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/formdata", { ...statment });
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
)


const initialState = {};

const formSlice = createSlice({
    name: 'formInput',
    initialState,
    reducers: {
        formInput: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearInputDatas: (state) => {
            return {};
        }
    }
})

export const { formInput, clearInputDatas } = formSlice.actions;
export default formSlice.reducer;