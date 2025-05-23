import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from "../states/slices/ProductSlice";
import { useDebounce } from "./useDebounce";
import { getProducts } from "../services/ProductsServices";

export function useProducts(payload) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const cache = useRef({});
  const [refetchKey, setRefetchKey] = useState(0);

  const debouncedPayload = useDebounce(payload, 500);

  const refetch = () => {
    const key = JSON.stringify(debouncedPayload);
    delete cache.current[key];
    setRefetchKey((prev) => prev + 1);
  };

  useEffect(() => {
    const key = JSON.stringify(debouncedPayload);
    async function fetchData() {
      dispatch(fetchProductsRequest());
      try {
        if (cache.current[key]) {
          await new Promise((res) => setTimeout(res, 1000));
          dispatch(fetchProductsSuccess(cache.current[key]));
          return;
        }

        const { data } = await getProducts(debouncedPayload);
        await new Promise((res) => setTimeout(res, 1000));

        dispatch(fetchProductsSuccess(data.data));
        cache.current[key] = data.data;
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    }

    fetchData();
  }, [dispatch, debouncedPayload, refetchKey]);

  return { products, loading, error, refetch };
}
