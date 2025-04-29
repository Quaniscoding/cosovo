import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";

import { CartContext } from "../../contexts/CartContext";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import "swiper/css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import {
  fetchProductDetailsFailure,
  fetchProductDetailsRequest,
  fetchProductDetailsSuccess,
} from "../../states/slices/ProductDetailsSlice";
import { getProductsDetails } from "../../services/ProductsServices";
// import "swiper/css/thumbs";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const product = products.find((product) => product.id === parseInt(id, 10));
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product);

  const debouncedPayload = useDebounce(product, 300);
  const cache = useRef({});
  useEffect(() => {
    const key = JSON.stringify(debouncedPayload);
    async function fetchData() {
      if (cache.current[key]) {
        dispatch(fetchProductDetailsSuccess(cache.current[key]));
        return;
      }
      dispatch(fetchProductDetailsRequest());
      try {
        const { data } = await getProductsDetails(id);
        dispatch(fetchProductDetailsSuccess(data.data));
        cache.current[key] = data.data;
      } catch (error) {
        dispatch(fetchProductDetailsFailure(error.message));
      }
    }
    fetchData();
  }, [dispatch, id, debouncedPayload]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productDetails, setProductDetails] = useState({
    price: product?.price,
    color: product?.colors[0],
    size: product?.sizes[0],
    quantity: 1,
  });
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: productDetails.color,
      size: productDetails.size,
      quantity: productDetails.quantity,
      image: product.images[0],
    });
  };
  const handleAddAndOpenModal = () => {
    handleAdd();
    setIsModalOpen(true);
  };

  const handleViewCart = () => {
    navigate("/gio-hang");
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
  };
  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">Product not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      <CustomBreadcrumb
        items={[
          {
            href: `/san-pham/${product.id}`,
            title: (
              <span className="text-xl font-semibold text-black">
                {product.name}
              </span>
            ),
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Product Images */}

        <ProductImages
          product={product}
          thumbsSwiper={thumbsSwiper}
          setThumbsSwiper={setThumbsSwiper}
        />
        {/* Product Info */}
        <ProductInfo
          product={product}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          handleAddAndOpenModal={handleAddAndOpenModal}
          isModalOpen={isModalOpen}
          handleContinueShopping={handleContinueShopping}
          handleViewCart={handleViewCart}
        />
      </div>
    </div>
  );
}
