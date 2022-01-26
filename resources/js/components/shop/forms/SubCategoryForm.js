import React from "react";
import { Link } from "react-router-dom";

class SubCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            category_id: "",
            title: "",
            categories: [],
            id: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }
   // update state from props
   componentDidUpdate(prevProps) {
         if (this.props.category !== prevProps.category) {
            this.setState({
                name: this.props.name,
                description: this.props.description,
                title: this.props.title,
                category_id: this.props.category_id,
            });
        }
    }

    componentDidMount() {
        // set props to state when component mounts
        this.setState({
            name: this.props.name,
            description: this.props.description,
            title: this.props.title,
            category_id: this.props.category_id,
        });
        this.getCategories();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
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
        let category_id = this.state.category_id == undefined ? this.props.category_id : this.state.category_id;

        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_id">Category</label>
                            <select
                                className="form-control"
                                name="category_id"
                                value={category_id}
                                onChange={this.handleInputChange}
                            >
                                <option value="">Select Category</option>
                                {this.state.categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <Link
                                to="/dashboard/sub_categories"
                                className="btn btn-secondary"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SubCategoryForm;
