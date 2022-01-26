import React from "react";
import SubCategoryForm from "../../../components/shop/forms/SubCategoryForm";
import Swal from "sweetalert2";

class SubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            edit: false,
            errors: {},
            loading: false,
        };

        this.getCategory = this.getCategory.bind(this);
    }

    componentDidMount() {
        if (document.location.pathname.split("/")[3] != "create") {
            this.setState({
                edit: true,
            });
            this.getCategory();
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
        fetch("/api/sub_category/update_create", {
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
                            window.location.href = "/dashboard/sub_categories";
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
                if (data.errors) {
                    this.setState({ errors: data.errors });
                } else {
                    this.setState({ edit: false });
                    this.getCategory();
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                this.setState({ loading: false });
            });
    }

    getCategory() {
        // get id from url
        const id = document.location.pathname.split("/")[3];
        this.setState({
            loading: true,
        });
        fetch("/api/sub_categories/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((category) =>
                this.setState({ category, edit: true, loading: false })
            )
            .catch((error) => {
                alert(error);
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        let name = this.state.category.name;
        let description = this.state.category.description;
        let category_id = this.state.category.category_id;
        let edit = this.state.edit;

        return (
            <div className="container">
                <SubCategoryForm
                    onSubmit={this.onSubmit.bind(this)}
                    name={name}
                    description={description}
                    category={this.state.category}
                    category_id={category_id}
                />
            </div>
        );
    }
}

export default SubCategory;
