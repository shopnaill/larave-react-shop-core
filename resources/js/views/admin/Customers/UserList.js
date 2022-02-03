import React from "react";
import Swal from "sweetalert2";

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
        };

        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        fetch("/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((users) => this.setState({ users, isLoading: false }))
            .catch((error) => {
                alert(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteUser(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.value) {
                fetch("/api/user/delete/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-Authorization":
                            "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
                    },
                })
                    .then((res) => res.json())
                    .then((user) =>
                        this.setState({
                            user,
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
        });
    }

    render() {
        return (
            <div className="container">
                <h1>User List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Actions</th>
                        </tr>

                        {this.state.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.orders_count}</td>
                                <td>{user.orders_sum_total_price}</td>
                                <td>
                                    <button 
                                    onClick={() => this.deleteUser(user.id)}
                                    className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </thead>
                </table>
            </div>
        );
    }
}

export default UserList;
