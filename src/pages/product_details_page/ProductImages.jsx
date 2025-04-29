import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Image } from "antd";
export default function ProductImages({
  product,
  thumbsSwiper,
  setThumbsSwiper,
}) {
  return (
    <div className="flex flex-col gap-4 lg:col-span-8">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation]}
        className="w-full rounded-lg cursor-grab overflow-hidden"
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Main Image ${index}`}
              className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        modules={[Navigation, Thumbs]}
        className="py-2 w-full overflow-x-auto m-2"
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              preview={false}
              className="!w-24 !h-24 sm:w-20 sm:h-20 lg:!w-30 lg:!h-30 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200 m-2"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
