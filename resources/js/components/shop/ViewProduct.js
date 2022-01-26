import React, { useReducer } from "react";
import { Link , useNavigate } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import ProductImages from "./ProductImages";
import LazyLoad from "react-lazyload";
import { createGlobalState } from "react-hooks-global-state";
import Swal from "sweetalert2";


class ViewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            product_id: this.props.product_id,
            product_images: [],
            loading: true,
            quntity: 1,
            navigator: this.props.navigator,
            
        };
    }

    getCartCount = () => {
        let cartCount = 0;
        if (localStorage.getItem("cart")) {
            cartCount = JSON.parse(localStorage.getItem("cart")).length;
        }
        this.props.updateCartCounter(cartCount);
    };

    componentDidMount() {
        this.getProduct();
        this.getProductImages();
        this.getCartCount();
    }

    pluse = () => {
        this.setState({
            quntity: parseInt(this.state.quntity) + 1,
        });
    };

    minus = () => {
        if (this.state.quntity > 1) {
            this.setState({
                quntity: this.state.quntity - 1,
            });
        }
    };

    // update  cart counter in header
    addToCart = (checkout=false) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart == null) {
            cart = [];
        }
        // check if product is already in cart
        let product = this.state.product;
        let product_id = this.state.product_id;
        let quntity = this.state.quntity;
        let product_in_cart = cart.find(
            (item) => item.product_id == product_id
        );
        if (product_in_cart) {
            // update quntity
            product_in_cart.quntity += quntity;
        } else {
            // add product to cart
            cart.push({
                product_id: product_id,
                image: product.cover,
                name: product.name,
                price: product.price,
                quntity: quntity,
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        // sweet alert
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to cart",
            showConfirmButton: false,
            timer: 1500,
        });

        this.props.updateCartCounter(cart.length);

        if (checkout) {
            // redirect to checkout after delay
            setTimeout(() => {
                 window.location.href = "/checkout";
            }, 1500);

             
               
        }

    };

    onChange = (e) => {
        this.setState({
            quntity: e.target.value.replace(/[^0-9]/g, ""),
        });
    };

    // get product data from the server

    getProduct = () => {
        this.setState({
            loading: true,
        });
        fetch("/api/product/" + this.state.product_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((product) => this.setState({ product, loading: false }))
            .catch((error) => {
                alert(error);
                this.setState({
                    loading: false,
                });
            });
    };

    getProductImages = () => {
        fetch("/api/product/" + this.state.product_id + "/images", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((product_images) => this.setState({ product_images }))
            .catch((error) => {
                alert(error);
                this.setState({
                    loading: false,
                });
            });
    };

    render() {
        let cover = this.state.product.cover;
        let name = this.state.product.name;
        let price = this.state.product.price;
        let description = this.state.product.description;

        return (
            <div className="card">
                <div className="row g-0">
                    <div className="col-md-4 border-end">
                        <SRLWrapper>
                            <a href={cover}>
                                <LazyLoad height={200} once>
                                    <img
                                        src={cover}
                                        className="img-fluid"
                                        alt="lightbox"
                                    />
                                </LazyLoad>
                            </a>
                        </SRLWrapper>
                        <SRLWrapper>
                            <div className="row  g-2 justify-content-center mt-3">
                                {this.state.product_images.map((image) => (
                                    <ProductImages
                                        key={image.id}
                                        product={image}
                                    />
                                ))}
                            </div>
                        </SRLWrapper>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title">{name}</h4>
                            <div className="mb-3">
                                <span className="price h4">{price} EGP</span>
                            </div>
                            <p className="card-text fs-6">{description}</p>

                            <hr />
                            <div className="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                                <div className="col">
                                    <label className="form-label">الكمية</label>
                                    <div className="input-group input-spinner">
                                        <button
                                            className="btn btn-white"
                                            onClick={this.pluse}
                                        >
                                            +{" "}
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.quntity}
                                        />
                                        <button
                                            className="btn btn-white"
                                            onClick={this.minus}
                                        >
                                            −{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mt-3">
                                <a
                                    href="#"
                                    className="btn add_to_cart btn-primary"
                                    onClick={ ()=> this.addToCart(true) }
                                >
                                    Buy now
                                </a>
                                <a
                                    href="#"
                                    className="btn add_cart_only add_to_cart btn-outline-primary"
                                >
                                    <span
                                    onClick={ ()=> this.addToCart(false) }
                                    className="text"
                                    >
                                        Add to cart
                                    </span>
                                    <i className="bx bxs-cart-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProduct;
