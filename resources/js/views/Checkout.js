import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            cart: [],
            total: 0,
            loading: true,
        };
    }

    componentDidMount() {
        this.getCart();
    }

    getCart = () => {
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"));
            let total = 0;
            cart.forEach((item) => {
                total += item.price * item.quntity;
            });
            this.setState({
                cart: cart,
                total: total,
            });
        }
       
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    removeCart = () => {
        localStorage.removeItem("cart");
        this.setState({
            cart: [],
            total: 0,
        });
    };

    Checkout = () => {
        // check if all fields are filled
        if (
            this.state.name == "" ||
            this.state.email == "" ||
            this.state.phone == "" ||
            this.state.address == "" ||
            this.state.city == "" ||
            this.state.state == "" ||
            this.state.zip == "" ||
            this.state.country == ""
        ) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please fill all fields",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            // send data to server
        let data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            country: this.state.country,
            cart: this.state.cart,
            total_price: this.state.total,
        };
        fetch("/api/checkout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem("cart");
                    // sweet alert
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Checkout Successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // update cart counter
                    this.removeCart();
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Checkout Failed",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        }
    };

    render() {
        let cart = this.state.cart;

        if (cart.length > 0) {
            return (
                <div className="container">
                    <h1>Checkout</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    aria-describedby="emailHelp"
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    onChange={(e) =>
                                        this.setState({ name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    name="phone"
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter phone"
                                    value={this.state.phone}
                                    onChange={(e) =>
                                        this.setState({ phone: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter address"
                                    value={this.state.address}
                                    onChange={(e) =>
                                        this.setState({
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    name="city"
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter city"
                                    value={this.state.city}
                                    onChange={(e) =>
                                        this.setState({ city: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    name="state"
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter state"
                                    value={this.state.state}
                                    onChange={(e) =>
                                        this.setState({ state: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">Zip</label>
                                <input
                                    name="zip"
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter zip"
                                    value={this.state.zip}
                                    onChange={(e) =>
                                        this.setState({ zip: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <select
                                    name="country"
                                    id="country"
                                    className="form-control"
                                    value={this.state.country}
                                    onChange={(e) =>
                                        this.setState({
                                            country: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                </select>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-6">
                            <h3>Cart</h3>
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
                            <h3>Total: {this.state.total}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg btn-block"
                                onClick={this.Checkout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h1>Cart Is Empty</h1>
                     <Link to="/home">
                        <button className="btn btn-primary">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            );
        }
    }
}

export default Checkout;
