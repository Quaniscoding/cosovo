import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "../states/slices/CategoriesSlice";
import { getCategories } from "../services/CategoriesServices";

export function useCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const cache = useRef(null);

  useEffect(() => {
    async function fetchData() {
      if (cache.current) {
        dispatch(fetchCategoriesSuccess(cache.current));
        return;
      }

      dispatch(fetchCategoriesRequest());
      try {
        const { data } = await getCategories();
        dispatch(fetchCategoriesSuccess(data));
        cache.current = data;
      } catch (err) {
        dispatch(fetchCategoriesFailure(err.message));
      }
    }

    fetchData();
  }, [dispatch]);

  return { categories, loading, error };
}
