import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

export default function ProductImages({
  productDetails,
  setProductDetails,
  selectedColor,
  colorToImagesMap,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình để điều chỉnh layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Kiểm tra ban đầu
    checkScreenSize();

    // Theo dõi thay đổi kích thước màn hình
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const currentImages = colorToImagesMap[selectedColor] || [];

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full lg:col-span-6">
      {/* Main Swiper với responsive height */}
      <div className="w-full rounded-lg overflow-hidden">
        <Swiper
          spaceBetween={10}
          navigation={!isMobile}
          pagination={isMobile ? { clickable: true } : false}
          modules={[Thumbs, Navigation, Pagination]}
          className="w-full"
          style={{
            // Responsive height cho main swiper
            height: isMobile ? "300px" : "400px",
          }}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {currentImages.map((img, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <img
                src={productDetails.image || img}
                alt={`Product Image ${idx + 1}`}
                className="h-full w-full object-contain md:object-cover rounded-lg cursor-pointer"
                onClick={() =>
                  setProductDetails((prev) => ({ ...prev, image: img }))
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails với responsive cho các màn hình khác nhau */}
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
                className={`aspect-square rounded-md overflow-hidden border ${
                  productDetails.image === img
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-all duration-300"
                  onClick={() =>
                    setProductDetails((prev) => ({ ...prev, image: img }))
                  }
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
