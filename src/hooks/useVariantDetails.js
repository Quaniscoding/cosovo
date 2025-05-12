import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVariantDetailsRequest,
  fetchVariantDetailsSuccess,
  fetchVariantDetailsFailure,
} from "../states/slices/VariantDetailsSlice";
import { useDebounce } from "./useDebounce";
import { getVariantDetails } from "../services/VariantsServices";

export function useVariantDetails(id) {
  const dispatch = useDispatch();
  const { variantDetails, loading, error } = useSelector(
    (state) => state.variantDetails
  );
  console.log(variantDetails);

  const cache = useRef({});

  const debouncedPayload = useDebounce(id, 500);

  useEffect(() => {
    const key = JSON.stringify(debouncedPayload);
    async function fetchData() {
      dispatch(fetchVariantDetailsRequest());
      try {
        if (cache.current[key]) {
          await new Promise((res) => setTimeout(res, 300));
          dispatch(fetchVariantDetailsSuccess(cache.current[key]));
          return;
        }

        const { data } = await getVariantDetails(debouncedPayload);

        let validData;
        if (Array.isArray(data)) {
          validData = data.filter((item) => !item.error);
        } else if (Array.isArray(data?.data)) {
          validData = data.data.filter((item) => !item.error);
        } else {
          validData = data;
        }

        if (
          !validData ||
          (Array.isArray(validData) && validData.length === 0)
        ) {
          throw new Error("Không tìm thấy variant nào hợp lệ");
        }

        await new Promise((res) => setTimeout(res, 300));
        dispatch(fetchVariantDetailsSuccess(validData));
        cache.current[key] = validData;
      } catch (err) {
        dispatch(fetchVariantDetailsFailure(err.message));
      }
    }

    fetchData();
  }, [dispatch, debouncedPayload]);

  return { variantDetails, loading, error };
}
