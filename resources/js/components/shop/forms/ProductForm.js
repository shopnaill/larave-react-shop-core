import React from "react";
import Uppy from "@uppy/core";
import { Dashboard, FileInput } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import ImageEditor from "@uppy/image-editor";
import Tus from "@uppy/tus";

class ProductForm extends React.Component {
    uppy = new Uppy({
        autoProceed: false,
        allowMultipleUploads: false,
        restrictions: {
            maxFileSize: 50000000,
            maxNumberOfFiles: null,
            minNumberOfFiles: null,
            allowedFileTypes: ["image/*"],
        },
    })
        .use(Tus, {
            endpoint: "https://tusd.tusdemo.net/files/", // use your tus endpoint here
            resume: true,
            retryDelays: [0, 3000, 5000, 10000],
            withCredentials: false,
        })
        .use(ImageEditor, {})
        .on("complete", (result) => {
            console.log("successful files:", result.successful);
            console.log("failed files:", result.failed);
            result.successful.map((file) => {
                console.log(file.response.uploadURL);
                // add all successful uploads to state images array
                if (this.state.images !== undefined) {
                    this.setState({
                        images: [...this.state.images, file.response.uploadURL],
                    });
                } else {
                    this.setState({
                        images: [file.response.uploadURL],
                    });
                }
            });
        });

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            price: "",
            category_id: "",
            url: "",
            categories: [],
            loading: true,
            error: null,
            images: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSubCategories = this.getSubCategories.bind(this);
        this.getImages = this.getImages.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    // update state from props
    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({
                name: this.props.product.name,
                description: this.props.product.description,
                price: this.props.product.price,
                category_id: this.props.product.category_id,
                url: this.props.product.url,
                images: this.props.product.images,
            });
            this.getImages(this.props.product.id);
        }
    }
    componentWillUnmount() {
        this.uppy.close();
    }

    componentDidMount() {
        this.getSubCategories();
    }

    handleInputChange(event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    deleteImage(id) {
        // remove image from state
        let images = this.state.images;
        images = images.filter((image) => image.id !== id);
        this.setState({
            images: images,
        });
    }

    getImages(id) {
        fetch("/api/product/" + id + "/images", {
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
                    images: data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getSubCategories() {
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

    handleSubmit(event) {
        event.preventDefault();
        // send data to parent
        this.props.onSubmit(this.state);
    }

    render() {
        let name =
            this.state.name == undefined ? this.props.name : this.state.name;
        let description =
            this.state.description == undefined
                ? this.props.description
                : this.state.description;
        let title =
            this.state.title == undefined ? this.props.title : this.state.title;
        let price =
            this.state.price == undefined ? this.props.price : this.state.price;
        let category_id =
            this.state.category_id == undefined
                ? this.props.category_id
                : this.state.category_id;
        let images =
            this.state.images == undefined
                ? this.props.images
                : this.state.images;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Product Form</h1>
                        <form
                            onSubmit={this.handleSubmit}
                            className="form-horizontal"
                            encType="multipart/form-data"
                        >
                            <div className="form-group">
                                <label
                                    htmlFor="name"
                                    className="col-sm-2 control-label"
                                >
                                    Name
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="description"
                                    className="col-sm-2 control-label"
                                >
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="category_id"
                                    className="col-sm-2 control-label"
                                >
                                    Category
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-control"
                                        id="category_id"
                                        name="category_id"
                                        value={category_id}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {this.state.categories.map(
                                            (category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="price"
                                    className="col-sm-2 control-label"
                                >
                                    Price
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="number"
                                        className="form-control"
                                        step="0.1"
                                        id="price"
                                        name="price"
                                        value={price}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="images"
                                    className="col-sm-2 control-label"
                                >
                                    Product Images
                                </label>
                                <div className="col-sm-10">
                                    <div className="row">
                                        {images.map((image, key) => (
                                            <div key={key} className="col-md-3">
                                                <img
                                                    src={image.image}
                                                    alt={image.id}
                                                    className="img-thumbnail"
                                                />
                                                <div
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        this.deleteImage(
                                                            image.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-sm-10">
                                    <Dashboard
                                        uppy={this.uppy}
                                        width="100%"
                                        height={450}
                                        onChange={this.handleInputChange}
                                        metaFields={[
                                            { id: "name", name: "Name" },
                                        ]}
                                        proudlyDisplayPoweredByUppy={false}
                                        showProgressDetails={true}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductForm;
