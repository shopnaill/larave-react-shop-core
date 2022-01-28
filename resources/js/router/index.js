import React from "react";
import { BrowserRouter as Router, Route, Routes , useHistory  } from "react-router-dom";

import Home from "../views/Home";
import ProductPage from "../views/Product";

import Navbar from "../components/App/Navbar";
import Manage from "../views/admin/Manage";
import Cart from "../views/Cart";
import CategoryList from "../views/admin/Categories/CategoryList";
import Category from "../views/admin/Categories/Category";
import Product from "../views/admin/Products/Product";
import SubCategory from "../views/admin/SubCategories/SubCategory";
import SubCategoryList from "../views/admin/SubCategories/SubCategoryList";
import ProductsList from "../views/admin/Products/ProductsList";
import Cookies from 'universal-cookie';
import Checkout from "../views/Checkout";
import OrderList from "../views/admin/Orders/OrderList";
import Order from "../views/admin/Orders/Order";
const cookies = new Cookies();

class RouterList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
            cartCount: 0,
            error: null,
        };
    }

    updateCartCounter = (cartCount) => {
        this.setState({
            cartCount: cartCount,
        });
    };

    render() {
        return (
            <Router>
                <Navbar updateCartCounter={this.updateCartCounter} cartCount={this.state.cartCount} />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Manage />} />

                    <Route path="/dashboard/categories"element={<CategoryList />}/>
                    <Route path="/dashboard/sub_categories" element={<SubCategoryList />} />
                    <Route path="/dashboard/products" element={<ProductsList />} />
                    <Route path="/dashboard/orders" element={<OrderList />} />

                    <Route path="/dashboard/category/:id" element={<Category />} />
                    <Route path="/dashboard/category/create" element={<Category />} />

                    <Route path="/dashboard/sub_category/:id" element={<SubCategory />} />
                    <Route path="/dashboard/sub_category/create" element={<SubCategory />} />

                    <Route path="/dashboard/product/:id" element={<Product />} />
                    <Route path="/dashboard/product/create" element={<Product />} />

                    <Route path="/dashboard/order/:id" element={<Order />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout/>} />
                    

                    <Route path="/product/:id" element={<ProductPage updateCartCounter={this.updateCartCounter} />} />
                </Routes>
            </Router>
        );
    }
}

export default RouterList;
