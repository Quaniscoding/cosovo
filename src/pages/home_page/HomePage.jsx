import React, { useState, useCallback } from "react";
import { Skeleton } from "antd";
import Loading from "../../components/Loading";
import CategorySection from "./CategorySection";
import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import PaginationCustom from "../../components/PaginationCustom";

export default function HomePage() {
  const [payload, setPayload] = useState({
    page: 1,
    size: 12,
    category: "",
  });
  const { products, loading } = useProducts(payload);

  const handleCategoryChange = useCallback((category) => {
    setPayload((p) => ({ ...p, category, page: 1 }));
  }, []);

  const onChange = useCallback((page, size) => {
    console.log(page, size);

    setPayload((p) => ({ ...p, page: page, size: size }));
  }, []);

  const totalItems = products.total_items || 0;

  if (loading && !products.items) return <Loading loading />;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4 max-w-7xl mx-auto">
        <CategorySection onCategoryChange={handleCategoryChange} />
        <PaginationCustom
          current={payload.page}
          pageSize={payload.size}
          total={totalItems}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto py-4">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="w-full">
                <Skeleton.Node
                  active
                  className="!w-[165px] sm:!w-[200px] md:!w-[240px] xl:!w-[300px] h-48 rounded-lg border border-gray-200"
                ></Skeleton.Node>
              </div>
            ))
          : products?.items?.map((product, idx) => (
              <div key={product?.id || idx} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
