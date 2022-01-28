import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isLoading: true,
        };

        this.getOrders = this.getOrders.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders() {
        fetch("/api/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((orders) => this.setState({ orders, isLoading: false }))
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteOrder(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.value) {
                fetch("/api/order/delete/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((order) => this.setState({ order, isLoading: false }))
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
                                <h4>Orders</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>

                                            {this.state.orders.map(
                                                (order, key) => (
                                                    <tr key={key}>
                                                        <td>{order.id}</td>
                                                        <td>{order.name}</td>
                                                        <td>
                                                            {order.total_price}
                                                        </td>
                                                        <td>{order.status}</td>
                                                        <td>
                                                            <Link
                                                                to={`/dashboard/order/${order.id}`}
                                                                className="btn btn-primary"
                                                            >
                                                                View
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    this.deleteOrder(
                                                                        order.id
                                                                    )
                                                                }
                                                                className="btn btn-danger"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </thead>
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
export default OrderList;
