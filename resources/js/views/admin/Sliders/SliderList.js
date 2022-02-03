import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class SliderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliders: [],
            isLoading: true,
        };

        this.getSliders = this.getSliders.bind(this);
        this.deleteSlider = this.deleteSlider.bind(this);
    }

    componentDidMount() {
        this.getSliders();
    }

    getSliders() {
        fetch("/api/sliders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((sliders) => this.setState({ sliders, isLoading: false }))
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteSlider(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.value) {
                fetch("/api/slider/delete/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((data)  =>{
                        let sliders = this.state.sliders.filter( (slider) => {
                            return slider.id !== id;
                        });
                        this.setState({
                            sliders,
                        });
                        Swal.fire("Deleted!", "Your slider has been deleted.", "success");
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Sliders</h4>
                                <Link to="/dashboard/slider/create" className="btn btn-primary">
                                    Create
                                </Link>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sliders.map((slider) => (
                                            <tr key={slider.id}>
                                                <td>{slider.id}</td>
                                                <td>{slider.title}</td>
                                                <td>
                                                    <img
                                                        src={'/storage/' + slider.image}
                                                        alt="slider"
                                                        width="100"
                                                    />
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/dashboard/slider/${slider.id}`}
                                                        className="btn btn-primary"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            this.deleteSlider(
                                                                slider.id
                                                            )
                                                        }
                                                        className="btn btn-danger"
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
            </div>
        );
    }
}

export default SliderList;
