import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRevenuesFailure,
  fetchRevenuesRequest,
  fetchRevenuesSuccess,
} from "../states/slices/RevenueSlice";

import { useDebounce } from "./useDebounce";
import { getAllRevenue } from "../services/RevenueServices";

export function useRevenues(payload) {
  const dispatch = useDispatch();
  const { revenues, error } = useSelector((state) => state.revenues);
  const cache = useRef({});
  const debouncedPayload = useDebounce(payload, 500);

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    const key = JSON.stringify(debouncedPayload);
    async function fetchData() {
      if (!revenues || revenues.length === 0) setLoadingPage(true);
      else setLoadingTable(true);

      dispatch(fetchRevenuesRequest());

      try {
        if (cache.current[key]) {
          await new Promise((res) => setTimeout(res, 300));
          dispatch(fetchRevenuesSuccess(cache.current[key]));
        } else {
          const { data } = await getAllRevenue(debouncedPayload);
          await new Promise((res) => setTimeout(res, 300));
          dispatch(fetchRevenuesSuccess(data.data));
          cache.current[key] = data.data;
        }
      } catch (err) {
        dispatch(fetchRevenuesFailure(err.message));
      } finally {
        setLoadingPage(false);
        setLoadingTable(false);
      }
    }

    fetchData();
  }, [dispatch, debouncedPayload, revenues]);

  return { revenues, error, loadingPage, loadingTable };
}
