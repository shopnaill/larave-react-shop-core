import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        fetch("/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    products: data,
                });
            });
    }

    deleteProduct(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                fetch("/api/product/delete/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // remove deleted product from state
                        let products = this.state.products.filter(
                            (product) => product.id != id
                        );
                        this.setState({
                            products: products,
                        });
                    });
            }
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Products List</h1>
                        <Link to="/dashboard/product/create" className="btn btn-primary">
                            Create Product
                        </Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category.name}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/product/${product.id}`}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    this.deleteProduct(
                                                        product.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductsList;
