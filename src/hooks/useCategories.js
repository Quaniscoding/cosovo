import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./useDebounce";
import {
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "../states/slices/CategoriesSlice";
import { getCategories } from "../services/CategoriesServices";

export function useCategories(payload) {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const cache = useRef({});

  const debouncedPayload = useDebounce(payload, 500);

  useEffect(() => {
    const key = JSON.stringify(debouncedPayload);
    async function fetchData() {
      dispatch(fetchCategoriesRequest());
      try {
        if (cache.current[key]) {
          await new Promise((res) => setTimeout(res, 300));
          dispatch(fetchCategoriesSuccess(cache.current[key]));
          return;
        }

        const { data } = await getCategories(debouncedPayload);
        await new Promise((res) => setTimeout(res, 300));

        dispatch(fetchCategoriesSuccess(data));
        cache.current[key] = data;
      } catch (err) {
        dispatch(fetchCategoriesFailure(err.message));
      }
    }
    fetchData();
  }, [dispatch, debouncedPayload]);

  return { categories, loading, error };
}
