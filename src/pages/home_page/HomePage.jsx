import React from "react";
import { products } from "../../data/products";
import CategorySection from "../../components/CategorySection";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";

export default function HomePage() {
  const totalProducts = products.length;

  return (
    <div className="container mx-auto p-4">
      <CategorySection />
      <div className="flex justify-between items-center my-4 w-full mx-auto sm:max-w-7xl ">
        <Pagination total={totalProducts} />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
