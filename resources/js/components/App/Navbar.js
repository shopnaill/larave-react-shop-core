import React, { useReducer } from "react";
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
        this.getCategories();
    };
    getCartCount = () => {
        let cartCount = 0;
        if (localStorage.getItem("cart")) {
            cartCount = JSON.parse(localStorage.getItem("cart")).length;
        }
        this.setState({ cartCount: cartCount });
    };

    logout = () => {
        axios.post("/logout").then(() => (location.href = "/home"));
    };

    getCategories = () => {
        fetch("/api/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((categories) => this.setState({ categories, loading: false }))
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    };

    render() {
        // Router Links
        return (
            <div className="topbar d-flex align-items-center mb-5">
                <nav className="navbar navbar-expand">
                    <Link to="/home" className="navbar-brand">
                        <img
                            width="105px"
                            className="img-fluid"
                            src="https://seeklogo.com/images/S/shopping-logo-0803BFE032-seeklogo.com.png"
                            alt=""
                            srcSet=""
                        />
                    </Link>

                    <div className="top-menu ms-auto">
                        <ul className="navbar-nav align-items-center">
                            

                            {this.state.categories.map((category,mKey) => (
                                <li key={mKey} className="nav-item dropdown dropdown-menu-lg-end">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        id="navbarDarkDropdownMenuLink"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        to={`/category/${category.id}`}
                                    >
                                        {category.name}
                                    </Link>
                                    <ul
                                        className="dropdown-menu dropdown-menu-dark"
                                        aria-labelledby="navbarDarkDropdownMenuLink"
                                    >
                                        <li>
                                            {category.sub_categories.map(
                                                (sub_category,key) => (
                                                    <Link
                                                        className="dropdown-item"
                                                        to={`/category/${sub_category.id}`}
                                                        key={key}
                                                    >
                                                        {sub_category.name}
                                                    </Link>
                                                )
                                            )}
                                        </li>
                                    </ul>
                                </li>
                            ))}
                            <li className="nav-item dropdown dropdown-menu-lg-end">
                                <a
                                    className="nav-link dropdown-toggle"
                                    id="navbarDarkDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-cog  fa-lg"></i>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-dark"
                                    aria-labelledby="navbarDarkDropdownMenuLink"
                                    style={{ marginLeft: "-85px" }}
                                >
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/dashboard"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={this.logout}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
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
        fontSize: "32px",
    },
    relative: {
        position: "relative",
    },
};
