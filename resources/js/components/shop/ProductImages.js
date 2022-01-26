import React from "react";

class ProductImages extends React.Component {
    render() {
        let product_image = this.props.product.image;
        return (
            <div className="col-md-3">
                <div className="product-image">
                    <img className="img-fluid" src={product_image} alt="" />
                </div>
            </div>
        );
    }
}

export default ProductImages;
