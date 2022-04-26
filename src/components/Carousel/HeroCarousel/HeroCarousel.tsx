import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./HeroCarousel.css";
import { heroImages } from "../../../assets/assetsVariable";

function HeroCarousel() {
  return (
    <div className="hero-carousel container mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        navigation
        speed={800}
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="hero-carousel__slides"
      >
        {heroImages.map((img, index) => {
          return (
            <SwiperSlide className="hero-carousel__slide" key={index}>
              <img src={img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
