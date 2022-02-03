import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
        };
    }



    render() {
        return (
            <div className="col-lg-3">

                <div className="card">
                    <Link to={`/product/${this.state.product.id}`}>
                        <LazyLoadImage
                            src={this.state.product.cover}
                            className="card-img-top"
                            alt=".yy."
                        />
                 
                        <div className="card-body">
                            <h6 className="card-title cursor-pointer">
                                {this.state.product.name.slice(0, 25)}...
                            </h6>
                            <div className="clearfix">
                                <p className="mb-0 float-start">
                                    {" "}
                                    {this.state.product.description.slice(
                                        0,
                                        20
                                    )}
                                    ...
                                </p>
                                <p className="mb-0 float-end fw-bold">
                                    <span className="me-2 text-decoration-line-through text-warning">
                                        {this.state.product.old_price} EGP
                                    </span>
                                    <span className="text-success">
                                        {this.state.product.price} EGP
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Product;
