import React, { useState } from "react";
import { products } from "../../data/products";
import CategorySection from "../../components/CategorySection";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalProducts = filteredProducts.length;

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-4 w-full mx-auto sm:max-w-7xl gap-4">
        <CategorySection onCategoryChange={handleCategoryChange} />
        <Pagination total={totalProducts} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
