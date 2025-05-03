import React, { useState } from "react";
import { Button, Skeleton } from "antd";
import { useCategories } from "../../../hooks/useCategories";
import { categoryLabels } from "../../../constants/categories";

const CategorySection = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const { categories, loading } = useCategories({});

  const displayCategories = [
    { label: "Tất cả", value: "" },
    ...categories.map((cat) => {
      const normalizedCategory = cat.name.toLowerCase();
      const label = categoryLabels[normalizedCategory];

      return {
        label: label || cat.name,
        value: cat.name,
      };
    }),
  ];

  return (
    <div className="flex items-center gap-2 w-full mx-auto sm:max-w-7xl">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              active
              size="default"
              style={{ width: 100, borderRadius: 8 }}
            />
          ))
        : displayCategories.map((category) => (
            <Button
              key={category.value}
              type={selectedCategory === category.value ? "default" : "default"}
              style={{
                backgroundColor:
                  selectedCategory === category.value ? "#333" : "#f5f5f5",
                color: selectedCategory === category.value ? "#fff" : "#333",
                borderColor:
                  selectedCategory === category.value ? "#333" : "#ccc",
              }}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </Button>
          ))}
    </div>
  );
};

export default CategorySection;
