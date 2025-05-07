import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import "swiper/css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { useProductDetails } from "../../hooks/useProductDetails";
import { useCategories } from "../../hooks/useCategories";
import Loading from "../../components/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading } = useProductDetails(id);
  const { categories } = useCategories();
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({
    color: "",
    size: [""],
    quantity: 1,
    image: "",
    price: 0,
    stock: 0,
    variant_id: null,
  });
  const [selectedColor, setSelectedColor] = useState("");
  const colorToImagesMap = product?.variants.reduce((acc, variant) => {
    acc[variant.color] = variant.images.map((img) => img.url);
    return acc;
  }, {});
  const currentCategory = categories.find(
    (cat) => cat.id === product?.category_id
  );
  useEffect(() => {
    if (product) {
      const defaultVariant = product.variants[0];
      setProductDetails({
        color: defaultVariant?.color || "",
        size: [defaultVariant?.size || ""],
        quantity: 1,
        image: defaultVariant?.images[0]?.url || "",
        price: defaultVariant?.price || 0,
        stock: defaultVariant?.stock || 0,
        variant_id: defaultVariant?.id || null,
      });
      setSelectedColor(defaultVariant?.color || "");
    }
  }, [product]);

  if (loading || !product) {
    return <Loading loading={loading} />;
  }

  const handleAdd = () => {
    const selectedVariant =
      product.variants.find(
        (variant) =>
          variant.color === productDetails.color &&
          variant.size === productDetails.size
      ) || product.variants[0];

    setError(null);
    addToCart({
      id: product.id,
      name: product.name,
      price: productDetails.price,
      color: productDetails.color,
      size: productDetails.size,
      quantity: productDetails.quantity,
      image: selectedVariant.images[0]?.url || "",
      variant_id: selectedVariant.id,
    });
    return true;
  };

  const handleAddAndOpenModal = () => {
    const ok = handleAdd();
    if (ok) {
      setIsModalOpen(true);
    }
  };

  const handleViewCart = () => {
    navigate("/gio-hang");
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <ProductImages
          product={product}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          colorToImagesMap={colorToImagesMap}
        />
        <ProductInfo
          product={product}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          handleAddAndOpenModal={handleAddAndOpenModal}
          isModalOpen={isModalOpen}
          handleContinueShopping={handleContinueShopping}
          handleViewCart={handleViewCart}
          categories={categories}
          error={error}
          setError={setError}
          currentCategory={currentCategory}
          setSelectedColor={setSelectedColor}
          colorToImagesMap={colorToImagesMap}
          selectedColor={selectedColor}
        />
      </div>
    </div>
  );
}
