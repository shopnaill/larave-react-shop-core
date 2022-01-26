import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class SubCategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: [],
            isLoading: true,
        };

        this.getSubCategories = this.getSubCategories.bind(this);
        this.deleteSubCategory = this.deleteSubCategory.bind(this);
    }

    componentDidMount() {
        this.getSubCategories();
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
            .then((res) => res.json())
            .then((subCategories) =>
                this.setState({ subCategories, isLoading: false })
            )
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteSubCategory(id) {
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
                fetch("/api/sub_category/delete/" + id, {
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
                        // remove deleted subCategory from state
                        let subCategories = this.state.subCategories.filter(
                            (subCategory) => subCategory.id !== id
                        );
                        this.setState({ subCategories });
                    })
                    .catch((error) => {
                        alert(error);
                        this.setState({
                            isLoading: false,
                        });
                    });
            }
        });
    }

    render() {
        const { subCategories, isLoading } = this.state;
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Sub Categories</h4>
                                <Link
                                    to="/dashboard/sub_category/create"
                                    className="btn btn-primary float-right"
                                >
                                    Create
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subCategories.map(
                                                (subCategory, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {subCategory.name}
                                                        </td>
                                                        <td>
                                                            {
                                                                subCategory
                                                                    .category
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/dashboard/sub_category/${subCategory.id}`}
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    this.deleteSubCategory(
                                                                        subCategory.id
                                                                    )
                                                                }
                                                                className="btn btn-danger btn-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubCategoryList;
