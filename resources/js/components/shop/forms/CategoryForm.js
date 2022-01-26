import React from "react";
import { Link } from "react-router-dom";

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            title: "",
            id: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // update state from props
    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.setState({
                name: this.props.name,
                description: this.props.description,
                title: this.props.title,
            });
        }
    }

    componentDidMount() {
        // set props to state when component mounts
        this.setState({
            name: this.props.name,
            description: this.props.description,
            title: this.props.title,
        });
    }

    handleInputChange(event) {
       // update props  when input changes
         let name  = event.target.name;
         let value = event.target.value;
        this.setState({
            [name]: value,
        });

      
    }

    handleSubmit(event) {
        event.preventDefault();
        // send data to parent
        this.props.onSubmit(this.state);
    }
    render() {
        let name = this.state.name == undefined ? this.props.name : this.state.name;
        let description = this.state.description == undefined ? this.props.description : this.state.description;
        let title = this.state.title == undefined ? this.props.title : this.state.title;

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
                            <textarea
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link
                            to="/dashboard/categories"
                            className="btn btn-link"
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default CategoryForm;
