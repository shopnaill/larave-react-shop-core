import React from "react";
import Product from "../../components/shop/Product";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            category_id: "",
            products: [],
        };

        this.getCategory = this.getCategory.bind(this);
    }

    componentDidMount() {
        this.getCategory();
        this.getCategoryProducts();
    }

    getCategory() {
        fetch(
            "/api/sub_categories/" + document.location.pathname.split("/")[2],
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Authorization":
                        "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    category: data,
                });
            });
    }

    getCategoryProducts() {
        fetch(
            "/api/category/" +
                document.location.pathname.split("/")[2] +
                "/products",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-Authorization":
                        "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    products: data,
                });
            });
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.category.name}</h1>
                <div className="row">
                        {this.state.products.map((product) => {
                            return (
                                <Product key={product.id} product={product} />
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default Category;
