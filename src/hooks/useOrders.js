import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrdersFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
} from "../states/slices/OrdersSlice";

import { useDebounce } from "./useDebounce";
import { getAllOrders } from "../services/OrderServices";

export function useOrders(payload) {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
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
      dispatch(fetchOrdersRequest());
      try {
        if (cache.current[key]) {
          await new Promise((res) => setTimeout(res, 300));
          dispatch(fetchOrdersSuccess(cache.current[key]));
          return;
        }

        const { data } = await getAllOrders(debouncedPayload);
        await new Promise((res) => setTimeout(res, 300));

        dispatch(fetchOrdersSuccess(data.data));
        cache.current[key] = data.data;
      } catch (err) {
        dispatch(fetchOrdersFailure(err.message));
      }
    }

    fetchData();
  }, [dispatch, debouncedPayload, refetchKey]);

  return { orders, loading, error, refetch };
}
