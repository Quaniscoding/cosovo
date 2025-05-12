import { createSlice } from "@reduxjs/toolkit";

const variantDetailsSlice = createSlice({
  name: "variantDetails",
  initialState: {
    variantDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchVariantDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVariantDetailsSuccess: (state, action) => {
      state.loading = false;
      state.variantDetails = action.payload;
    },
    fetchVariantDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVariantDetailsRequest,
  fetchVariantDetailsSuccess,
  fetchVariantDetailsFailure,
} = variantDetailsSlice.actions;
export default variantDetailsSlice.reducer;
