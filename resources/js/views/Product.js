import React from "react";
import RelatedProducts from "../components/shop/RelatedProducts";
import ViewProduct from "../components/shop/ViewProduct";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            loading: true,
            cartCount: 0,
        };
    }

    updateCartCounter = (cartCount) => {
       // localStorage update cart counter
        this.setState({
            cartCount: cartCount,
        });

        // update Navbar component cart counter
        this.props.updateCartCounter(cartCount);
        
    };

    render() {
        // get the product id from the url in js
        const id = document.location.pathname.split("/")[2];
        return (
            <div className="container">
                <ViewProduct  product_id={id}  updateCartCounter={this.updateCartCounter} cartCount={this.state.cartCount} />
                <RelatedProducts product_id={id} />
            </div>
        );
    }
}

export default ProductPage;
