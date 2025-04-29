import React, { useState, useCallback, useMemo } from "react";
import { Skeleton } from "antd";
import Loading from "../../components/Loading";
import CategorySection from "./CategorySection";
import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    page: 1,
    size: 12,
    category: "",
  });
  const { products, loading, error } = useProducts(payload);

  const handleCategoryChange = useCallback((category) => {
    setPayload((p) => ({ ...p, category, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page, size) => {
    setPayload((p) => ({ ...p, page, size }));
  }, []);

  const totalItems = products.total_items || 0;

  const itemsToShow = useMemo(
    () => (loading ? Array(8).fill(null) : products.items || []),
    [loading, products.items]
  );

  if (loading && !products.items) return <Loading loading />;
  if (error) navigate("/loi");

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4 max-w-7xl mx-auto">
        <CategorySection onCategoryChange={handleCategoryChange} />
        <Pagination
          current={payload.page}
          pageSize={payload.size}
          total={totalItems}
          onChange={handlePageChange}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="w-full">
                <Skeleton.Node
                  active
                  className="!w-[165px] sm:!w-[200px] md:!w-[240px] xl:!w-[300px] h-48 rounded-lg border border-gray-200"
                >
                  {/* Có thể để trống hoặc thêm box giả nếu muốn */}
                </Skeleton.Node>
              </div>
            ))
          : itemsToShow.map((product, idx) => (
              <div key={product?.id || idx} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
