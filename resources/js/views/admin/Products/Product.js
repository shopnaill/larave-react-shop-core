import React from "react";
import ProductForm from "../../../components/shop/forms/ProductForm";
import Swal from "sweetalert2";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            edit: false,
            errors: {},
            loading: false,
        };

        this.getProduct = this.getProduct.bind(this);
    }

    componentDidMount() {
        if (document.location.pathname.split("/")[3] != "create") {
            this.setState({
                edit: true,
            });
            this.getProduct();
        } else {
            this.setState({
                edit: false,
            });
        }
    }

    onSubmit(data) {
        this.setState({ loading: true });
        // add id to data
        if (this.state.edit) {
            data.id = document.location.pathname.split("/")[3];
        }
        fetch("/api/product/update_create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ loading: false });
                // if success
                if (data.success) {
                    Swal.fire({
                        title: "Success",
                        text: data.message,
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "/dashboard/products";
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.message,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                }
            });
    }

    getProduct() {
        fetch(`/api/product/${document.location.pathname.split("/")[3]}`, {
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
                this.setState({ product: data });
            }
            );
    }

    render() {
        
        return (
            <div>
                <ProductForm
                    edit={this.state.edit}
                    product={this.state.product}
                    category_id={this.state.product.category_id}
                    name={this.state.product.name}
                    price={this.state.product.price}
                    description={this.state.product.description}
                    images={this.state.product.images}
                    onSubmit={this.onSubmit.bind(this)}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default Product;