import React from "react";
import SliderForm from "../../../components/shop/forms/SliderForm";
import Swal from "sweetalert2";
import axios from "axios";

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            title: "",
            edit: false,
            category_id: "",
            product_id: "",
        };

        this.getSlider = this.getSlider.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (document.location.pathname.split("/")[3] != "create") {
            this.setState({
                edit: true,
            });
            this.getSlider();
        } else {
            this.setState({
                edit: false,
            });
        }
    }

    getSlider() {
        fetch("/api/slider/" + document.location.pathname.split("/")[3], {
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
                    image: data.image,
                    title: data.title,
                    category_id: data.category_id,
                    product_id: data.product_id,
                });
            });
    }

    handleSubmit(data) {
        this.setState({ loading: true });
        // add id to formData
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("title", data.title);
        formData.append("category_id", data.category_id);
        formData.append("product_id", data.product_id);
        if (this.state.edit) {
            formData.append("id", document.location.pathname.split("/")[3]);
            console.log(data.title);
        }

        // check if image is not empty
        if (data.image && !this.state.edit || this.state.edit) {
            // if image is not empty, send request to server

            axios({
                method: "POST",
                url: "/api/slider/update_create",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    "X-Authorization":
                        "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                },
            }).then((res) => {
                this.setState({ loading: false });
                // if success
                if (res.data.success) {
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "/dashboard/sliders";
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: res.data.message,
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Please select an image",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    }

    render() {
        return (
            <div className="container">
                <SliderForm
                    image={this.state.image}
                    edit={this.state.edit}
                    title={this.state.title}
                    category_id={this.state.category_id}
                    product_id={this.state.product_id}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Slider;
