import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Link } from "react-router-dom";
// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

export default function App() {
    // get sliders from api
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSliders = () => {
        fetch("/api/sliders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSliders(data);
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };
    // call getSliders function when component mount
    useEffect(() => {
        getSliders();
        console.log(sliders);
    }, []);

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
                {sliders.map((slider, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Link to={`/category/${slider.category_id}`}>
                                <img
                                    src={"/storage/" + slider.image}
                                    alt={slider.title}
                                    className="img-fluid"
                                />
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
