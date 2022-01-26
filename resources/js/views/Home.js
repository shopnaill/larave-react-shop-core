import React from "react";
import Products from "../components/shop/Products";
import Swiper from "../components/App/Swiper";

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <Swiper />
                <Products />
            </div>
        );
    }
}

export default Home;
