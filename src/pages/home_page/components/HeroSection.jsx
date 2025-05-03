import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import { heroSlides } from "../../../constants/heroSlides,js";

export default function HeroSection() {
  return (
    <Swiper
      className="h-[150px] sm:h-[200px] md:h-[250px] bg-gray-100"
      spaceBetween={0}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Navigation]}
      centeredSlides={true}
    >
      {heroSlides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div
            className={`flex justify-center items-center h-full ${slide.bg}`}
          >
            <div
              className={`text-4xl font-bold text-center max-w-2xl mx-auto ${slide.textColor}`}
            >
              {slide.text}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
