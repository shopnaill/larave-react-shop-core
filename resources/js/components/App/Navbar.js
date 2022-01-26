import React from "react";
import { Link } from "react-router-dom";
import { createGlobalState } from "react-hooks-global-state";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
            cartCount: 0,
            error: null,
        };
    }

    componentDidMount = () => {
        this.getCartCount();
    };
    getCartCount = () => {
        let cartCount = 0;
        if (localStorage.getItem("cart")) {
            cartCount = JSON.parse(localStorage.getItem("cart")).length;
        }
        this.setState({ cartCount: cartCount });
    };

    render() {
        // Router Links
        return (
            <div className="topbar d-flex align-items-center mb-5">
                <nav className="navbar navbar-expand">
                    <a className="navbar-brand" href="#">
                        <img
                            width="105px"
                            className="img-fluid"
                            src="https://seeklogo.com/images/S/shopping-logo-0803BFE032-seeklogo.com.png"
                            alt=""
                            srcSet=""
                        />
                    </a>

                    <div className="top-menu ms-auto">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item open-demo">
                                <Link to="/home">
                                    <div className="nav-link">Home</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard">
                                    <div className="nav-link">Dashboard</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link style={styles.relative} to="/cart">
                                    <span
                                        id="cart-count"
                                        className="alert-count bg-warning"
                                    >
                                        {this.props.cartCount}
                                    </span>
                                    <i
                                        style={styles.navbar}
                                        className="bx bx-cart"
                                    ></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;

const styles = {
    navbar: {
        fontSize: "23px",
    },
    relative: {
        position: "relative",
    },
};
