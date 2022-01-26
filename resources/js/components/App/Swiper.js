import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default function App() {
    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://www.maxmuscleelite.com/web/image/1317433/New-year-offer-banner-website-Final.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.maxmuscleelite.com/web/image/1315557/C4-banner-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.maxmuscleelite.com/web/image/1315558/cruse-banner-whitepsd.jpg" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
