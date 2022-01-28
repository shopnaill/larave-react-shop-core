import React from "react";
import Swal from "sweetalert2";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Order extends React.Component {
    static defaultProps = {
        center: {
            lat: 29.9728896,
            lng: 31.0214656,
        },
        zoom: 11,
    };
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            order_items: [],
            isLoading: true,
            lat: 0,
            lng: 0,
        };

        this.getOrder = this.getOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentDidMount() {
        let that = this;
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                that.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        }

        this.getOrder();
    }

    getOrder() {
        let id = document.location.pathname.split("/")[3];

        fetch("/api/order/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            // return orders and order items
            .then((order) =>
                this.setState({
                    order: order.orders,
                    order_items: order.order_items,
                    isLoading: false,
                })
            )
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
            icon: "error",
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

    deliverOrder(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.value) {
                fetch("/api/order/deliver/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((order) => {
                        this.setState({ order, isLoading: false });
                        Swal.fire(
                            "Delivered!",
                            "Your order has been delivered.",
                            "success"
                        );
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

    approveOrder(id) {
        //   let order = this.state.order;
        Swal.fire({
            title: "Are you sure to approve order?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.value) {
                fetch("/api/order/approve/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((order) => {
                        this.setState({ order, isLoading: false });
                        Swal.fire(
                            "Approved!",
                            "Your order has been approved.",
                            "success"
                        );
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
                <h1>Order Details</h1>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Order Details</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Order ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.order.id}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Order Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    this.state.order.created_at
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Order Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.order.status}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Order Total</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    this.state.order.total_price
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.order.address}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.order.phone}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Customer ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    this.state.order.user_id
                                                        ? this.state.order.user
                                                              .name
                                                        : this.state.order.name
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Actions</label>
                                            <br />
                                            <div
                                                className="btn-group"
                                                role="group"
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-lg"
                                                    onClick={() =>
                                                        this.deleteOrder(
                                                            this.state.order.id
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                                {this.state.order.status ===
                                                "pending" ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-success btn-lg"
                                                        onClick={() =>
                                                            this.approveOrder(
                                                                this.state.order
                                                                    .id
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-check"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-lg"
                                                        onClick={() =>
                                                            this.deliverOrder(
                                                                this.state.order
                                                                    .id
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-truck"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Order Items</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.order_items
                                            ? this.state.order_items.map(
                                                  (item) => (
                                                      <tr key={item.id}>
                                                          <td>
                                                              {item.product_id}
                                                          </td>
                                                          <td>
                                                              {
                                                                  item.product
                                                                      .name
                                                              }
                                                          </td>
                                                          <td>
                                                              {item.quantity}
                                                          </td>
                                                          <td>
                                                              {
                                                                  item.product
                                                                      .price
                                                              }
                                                          </td>
                                                          <td>
                                                              {item.product
                                                                  .price *
                                                                  item.quantity}
                                                          </td>
                                                      </tr>
                                                  )
                                              )
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyDQZiv5wC90b88opgwVSp2hdepr5ZtXpRc",
                            }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >
                            <AnyReactComponent
                                lat={29.9728896}
                                lng={31.0214656}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;
