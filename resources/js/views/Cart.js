import React from "react";
import { Link } from "react-router-dom";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            loading: true,
            error: null,
        };
        this.getCart = this.getCart.bind(this);
        this.removeCart = this.removeCart.bind(this);
    }

    componentDidMount() {
        this.getCart();
    }

    // get cart from localStorage
    getCart() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart == null) {
            cart = [];
        }
        console.log(cart);
        this.setState({
            cart: cart,
            loading: false,
        });
    }

    // remove cart from localStorage
    removeCart() {
        localStorage.removeItem("cart");
        this.setState({
            cart: [],
            loading: false,
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        }
        return (
            <div className="container">
                <h1>Cart</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cart.map((item, key) => (
                            <tr key={key}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quntity}</td>
                                <td>{item.price * item.quntity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>
                    Total:{" "}
                    {this.state.cart.reduce((total, item) => {
                        return total + item.price * item.quntity;
                    }, 0)}
                </h2>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        this.removeCart();
                    }}
                >
                    Remove Cart
                </button>{" "}
                <Link to="/checkout" className="btn btn-primary">
                    Checkout
                </Link>
            </div>
        );
    }
}

export default Cart;
