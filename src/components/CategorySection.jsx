import React, { useState } from "react";
import { Button } from "antd";

const CategorySection = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const categories = [
    { label: "Tất cả", value: "all" },
    { label: "Quần áo", value: "clothing" },
    { label: "Đồ điện tử", value: "electronics" },
  ];

  return (
    <div className="flex items-center gap-2 mb-4 w-full mx-auto sm:max-w-7xl">
      {categories.map((category) => (
        <Button
          key={category.value}
          type={selectedCategory === category.value ? "primary" : "default"}
          onClick={() => handleCategoryChange(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategorySection;
