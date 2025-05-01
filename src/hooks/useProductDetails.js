import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetailsFailure,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
} from "../states/slices/ProductDetailsSlice";
import { getProductsDetails } from "../services/ProductsServices";

export function useProductDetails(id) {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchProductDetailsSuccess());
      dispatch(fetchProductDetailsRequest());
      try {
        const { data } = await getProductsDetails(id);
        dispatch(fetchProductDetailsSuccess(data.data));
      } catch (error) {
        dispatch(fetchProductDetailsFailure(error.message));
      }
    }
    fetchData();
  }, [dispatch, id]);

  return { product, loading, error };
}
