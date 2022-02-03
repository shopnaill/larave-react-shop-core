import React from "react";
import { Link } from "react-router-dom";

class SliderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            file: null,
            title: "",
            category_id: "",
            product_id: "",
            categories: [],
            products: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.hndaleFileChange = this.hndaleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
    // update state from props
    componentDidUpdate(prevProps) {
        if (this.props.category_id !== prevProps.category_id) {
            this.setState({
                product_id: this.props.product_id,
                image: this.props.image,
                title: this.props.title,
                category_id: this.props.category_id,
            });
        }
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value,
        });

    }

    hndaleFileChange(event) {
        let file = event.target.files[0];
        this.setState({
            image: file
        });
    }

    getCategories() {
        fetch("/api/sub_categories", {
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
                    categories: data,
                });
            });
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

    handleSubmit(event) {
        event.preventDefault();
        // send data to parent
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Slider Form</h4>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            onChange={this.hndaleFileChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            className="form-control"
                                            name="category_id"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {this.state.categories
                                                ? this.state.categories.map(
                                                      (category) => (
                                                          <option
                                                              key={category.id}
                                                              value={
                                                                  category.id
                                                              }
                                                              {...(this.state
                                                                  .category_id ===
                                                              category.id
                                                                  ? {
                                                                        selected: true,
                                                                    }
                                                                  : {})}
                                                          >
                                                              {category.name}
                                                          </option>
                                                      )
                                                  )
                                                : null}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Product</label>
                                        <select
                                            className="form-control"
                                            name="product_id"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">
                                                Select Product
                                            </option>
                                            {this.state.products
                                                ? this.state.products.map(
                                                      (product) => (
                                                          <option
                                                              key={product.id}
                                                              value={
                                                                product.id
                                                              }
                                                              {...(this.state
                                                                  .product_id ===
                                                                  product.id
                                                                  ? {
                                                                        selected: true,
                                                                    }
                                                                  : {})}
                                                          >
                                                              {product.name}
                                                          </option>
                                                      )
                                                  )
                                                : null}
                                        </select>
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                     {' '}
                                    <Link
                                        to="/dashboard/sliders"
                                        className="btn btn-danger"
                                    >
                                        Cancel
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SliderForm;
