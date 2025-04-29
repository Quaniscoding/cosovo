import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductDetailsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailsSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
