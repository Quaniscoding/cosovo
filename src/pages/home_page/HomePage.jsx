import React, { useState, useCallback } from "react";
import Loading from "../../components/Loading";
import CategorySection from "./components/CategorySection";
import ProductCard from "./components/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import PaginationCustom from "../../components/PaginationCustom";
import HeroSection from "./components/HeroSection";
import SearchBarSection from "./components/SearchBarSection";

export default function HomePage() {
  const [payload, setPayload] = useState({
    page: 1,
    size: 30,
    category: "",
  });
  const { products, loading } = useProducts(payload);

  const handleCategoryChange = useCallback((category) => {
    setPayload((p) => ({ ...p, category, page: 1 }));
  }, []);

  const onChange = useCallback((page, size) => {
    setPayload((p) => ({ ...p, page: page, size: size }));
  }, []);

  const totalItems = products.total_items || 0;

  return (
    <>
      {loading && !products.items && <Loading loading />}
      <HeroSection />
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <SearchBarSection />
          <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4 px-2 sm:px-0">
            <CategorySection onCategoryChange={handleCategoryChange} />
            <PaginationCustom
              current={payload.page}
              pageSize={payload.size}
              total={totalItems}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto py-4">
          {products?.items?.map((product, idx) => (
            <div key={product?.id || idx} className="w-full">
              <ProductCard product={product} loading={loading} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
