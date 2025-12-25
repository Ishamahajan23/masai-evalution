import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLists = createAsyncThunk(
    'list/fetchLists',
    async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lists`);
        const data = await res.json();
        // console.log("Fetched lists data:", data);
        return data.equipments;
    }
);

const listSlice = createSlice({
    name: "list",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
  })

const reducer = listSlice.reducer;
export default reducer;