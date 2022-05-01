import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./HeroCarousel.css";
import { heroImages } from "../../../assets/assetsVariable";

function HeroCarousel() {
  const heroCarouselRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    heroCarouselRef.current.style.opacity = "1";
  }, []);

  return (
    <div className="hero-carousel opacity-0 transition-opacity duration-[1500ms]" ref={heroCarouselRef}>
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
            <SwiperSlide className="hero-carousel__slide w-full" key={index}>
              <img src={img} alt="" className="hero-carousel__img w-full" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
