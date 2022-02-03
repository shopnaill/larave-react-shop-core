import React from "react";
import Card from "../../components/App/Card";
import "./style.css";
class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: 0,
            products: 0,
            sub_categories: 0,
            orders: 0,
            users: 0,
            sliders: 0,
            cart: 0,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch("/api/admin/dashboard", {
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
                this.setState({
                    categories: data.categories,
                    products: data.products,
                    sub_categories: data.sub_categories,
                    orders: data.orders,
                    users: data.users,
                    sliders: data.sliders,
                    cart: data.cart,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error,
                });
            });
    };

    render() {
        if (!this.state.loading) {
            let categories = this.state.categories;
            let products = this.state.products;
            let sub_categories = this.state.sub_categories;
            let orders = this.state.orders;
            let users = this.state.users;
            let sliders = this.state.sliders;

            return (
                <div className="container">
                    <h2 className="text-center">Dashboard</h2>

                    <div className="row">
                        <Card
                            title="Products"
                            description="Total Products"
                            icon="fas fa-shopping-cart"
                            link="/dashboard/products"
                            counter={products}
                            color="#2196f3"
                        />

                        <Card
                            title="Main Categories"
                            description="Total Categories"
                            icon="fas fa-rocket"
                            link="/dashboard/categories"
                            counter={categories}
                            color="#9c27b0"
                        />

                        <Card
                            title="Sub Categories"
                            description="Total Sub Categories"
                            icon="fas fa-list"
                            link="/dashboard/sub_categories"
                            counter={sub_categories}
                            color="#e91e63"
                        />

                        <Card
                            title="Orders"
                            description="Total Orders"
                            icon="fas fa-shopping-cart"
                            link="/dashboard/orders"
                            counter={orders}
                            color="#f44336"
                        />

                        <Card
                            title="Customers"
                            description="Total Customers"
                            icon="fas fa-users"
                            link="/dashboard/users"
                            counter={users}
                            color="#ff9800"
                        />

                        <Card
                            title="Sliders"
                            description="Manage Slider"
                            icon="fas fa-film"
                            link="/dashboard/sliders"
                            counter={sliders}
                            color="#009688"
                        />

                        <Card
                            title="Settings"
                            description="Settings & Configration"
                            icon="fas fa-cog"
                            link="/dashboard/settings"
                            counter={orders}
                            color="#4caf50"
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h2 className="text-center">Loading...</h2>
                </div>
            );
        }
    }
}

export default Manage;
