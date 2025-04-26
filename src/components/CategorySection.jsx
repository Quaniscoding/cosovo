import React, { useState } from "react";
import { Button, Radio } from "antd";

const CategorySection = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <Radio.Group onChange={handleCategoryChange} value={selectedCategory}>
        <Radio value="all">Tất cả</Radio>
        <Radio value="clothing">Quần áo</Radio>
        <Radio value="electronics">Đồ điện tử</Radio>
      </Radio.Group>
    </div>
  );
};

export default CategorySection;
