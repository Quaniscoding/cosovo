import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const formatVND = (price) => {
    return price.toLocaleString("vi-VN") + "₫";
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          className="h-48 object-cover rounded-t-md"
        />
      }
      className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Meta
        title={<span className="text-lg font-semibold">{product.name}</span>}
        description={
          <span className="text-red-600 font-semibold text-xl">
            {formatVND(product.price)}
          </span>
        }
      />
    </Card>
  );
};

export default ProductCard;
