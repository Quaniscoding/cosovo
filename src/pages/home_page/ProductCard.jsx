import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { formatVND } from "../../helpers/format";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const firstVariant = product.variants[0];
  const firstImage =
    firstVariant?.images?.[0]?.url || "src/assets/images/noimg.png";

  return (
    <Link to={`/san-pham/${product.id}`} className="block h-full">
      <Card
        hoverable
        cover={
          <img
            alt={product.name}
            src={firstImage}
            className="h-48 object-cover rounded-t-md"
          />
        }
        className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <Meta
          title={<span className="text-lg font-semibold">{product.name}</span>}
          description={
            firstVariant ? (
              <span className="text-red-600 font-semibold text-xl">
                {formatVND(firstVariant.price)}
              </span>
            ) : (
              <span className="text-gray-400 text-xl">Hết hàng</span>
            )
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;
