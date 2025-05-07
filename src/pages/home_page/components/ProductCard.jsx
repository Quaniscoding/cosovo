import React from "react";
import { formatVND } from "../../../helpers/format";

const ProductCard = ({ product }) => {
  const firstVariant = product.variants[0];
  const firstImage =
    firstVariant?.images?.[0]?.url || "/public/assets/images/noimg.png";

  return (
    <div className=" text-center rounded-lg hover:shadow-lg transition duration-300">
      <div
        id="img"
        className="relative text-center w-full h-0 overflow-hidden pt-[130%]"
      >
        <a href={`/san-pham/${product.id}`}>
          <img
            src={firstImage}
            alt={product?.name}
            className="absolute top-0 left-0 w-full h-full object-contain m-auto"
            loading="lazy"
          />
        </a>
      </div>
      <div id="content" className="pt-2 px-2.5">
        <h3 className="mb-0 text-nowrap overflow-hidden text-ellipsis text-sm sm:text-base">
          <a
            href={`/san-pham/${product.id}`}
            className="uppercase text-[#3d4246] inline hover:border-b hover:border-[#3d4246]"
          >
            {product?.name}
          </a>
        </h3>
      </div>
      <div id="price" className="relative">
        <div className="text-base h-8 w-full transition-all ease-[.3s]">
          <span className="font-bold text-black leading-[30px]">
            {formatVND(firstVariant?.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
