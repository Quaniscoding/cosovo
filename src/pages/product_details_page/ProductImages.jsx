import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import { Image, Skeleton } from "antd";
export default function ProductImages({
  productDetails,
  setProductDetails,
  selectedColor,
  colorToImagesMap,
  loadingVariant,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const currentImages = colorToImagesMap[selectedColor] || [];

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full lg:col-span-6">
      <div className="w-full overflow-hidden">
        <Swiper
          spaceBetween={10}
          navigation={!isMobile}
          pagination={isMobile ? { clickable: true } : false}
          modules={[Thumbs, Navigation, Pagination]}
          className="w-full"
          style={{
            height: isMobile ? "300px" : "650px",
          }}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {currentImages.map((img, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              {loadingVariant ? (
                <Skeleton.Image active rootClassName="!h-full !w-full" />
              ) : (
                <Image
                  src={productDetails.image}
                  fallback="src/assets/images/noimg.png"
                  alt={`Product Image ${idx + 1}`}
                  className="!h-full w-full !object-contain cursor-pointer"
                  onClick={() =>
                    setProductDetails((prev) => ({ ...prev, image: img }))
                  }
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          ))}
          {currentImages.length === 0 && (
            <SwiperSlide className="flex items-center justify-center">
              {loadingVariant ? (
                <Skeleton.Image active rootClassName="!h-full !w-full" />
              ) : (
                <img
                  src="/src/assets/images/noimg.png"
                  alt="Product Image"
                  className="!h-full !w-full !object-contain cursor-pointer"
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      <div className={`w-full ${isMobile ? "px-2" : "px-0"}`}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={3}
          freeMode
          watchSlidesProgress
          modules={[Navigation, Thumbs]}
          className="thumbnails-swiper"
          breakpoints={{
            0: { slidesPerView: 3, spaceBetween: 6 },
            480: { slidesPerView: 4, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 8 },
            768: { slidesPerView: 5, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 12 },
          }}
        >
          {currentImages.map((img, index) => (
            <SwiperSlide key={index} className="p-1 sm:p-2">
              <div
                className={`aspect-square overflow-hidden border ${
                  productDetails.image === img
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200"
                }`}
              >
                {loadingVariant ? (
                  <Skeleton.Image active rootClassName="!h-full !w-full" />
                ) : (
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-all duration-300"
                    onClick={() =>
                      setProductDetails((prev) => ({ ...prev, image: img }))
                    }
                    loading="lazy"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
