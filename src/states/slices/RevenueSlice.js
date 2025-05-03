import { createSlice } from "@reduxjs/toolkit";

const revenueSlice = createSlice({
  name: "revenues",
  initialState: {
    revenues: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchRevenuesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRevenuesSuccess: (state, action) => {
      state.loading = false;
      state.revenues = action.payload;
    },
    fetchRevenuesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRevenuesFailure,
  fetchRevenuesRequest,
  fetchRevenuesSuccess,
} = revenueSlice.actions;
export default revenueSlice.reducer;
