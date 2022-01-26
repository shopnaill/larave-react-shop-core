import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            isLoading: true,
        };

        this.getCategories = this.getCategories.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
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
            .then((categories) =>
                this.setState({ categories, isLoading: false })
            )
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteCategory(id) {
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
                fetch("/api/category/delete/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "OK",
                            }).then((result) => {
                                if (result.value) {
                                    //window.location.href = "/dashboard/categories";
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
                            // remove the deleted category from the list
                            this.setState({
                                categories: this.state.categories.filter(
                                    (category) => category.id !== id
                                ),
                            });
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
        });
    }

    render() {
        return (
            <div className="container">
                <div className="table-responsive text-right">
                    <div className="card">
                        <div className="card-header">
                            <h3>Categories</h3>

                            <Link to="/dashboard/category/create" className="btn btn-primary">
                                Create 
                            </Link>

                    </div>
                        <div className="card-body">
                    <table className="table mb-0 dataTable">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <Link
                                            to={`/dashboard/category/${category.id}`}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                this.deleteCategory(category.id)
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
            </div>
        );
    }
}

export default CategoryList;
