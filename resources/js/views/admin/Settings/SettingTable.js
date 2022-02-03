import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

class SettingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: [],
            user: [],
            loading: true,
            error: null,
        };

        this.getSetting = this.getSetting.bind(this);
        this.getUser = this.getUser.bind(this);
        this.saveData = this.saveData.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
    }

    componentDidMount() {
        this.getSetting();
        this.getUser();
    }

    getSetting() {
        fetch("/api/settings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    setting: res,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                    loading: false,
                });
            });
    }

    getUser() {
        fetch("/api/my_user/" + user.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    user: res,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                    loading: false,
                });
            });
    }

    saveData(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("logo", this.state.setting.logo);
        formData.append("title", this.state.setting.title);
        formData.append("color1", this.state.setting.color1);
        formData.append("color2", this.state.setting.color2);
        formData.append("phone", this.state.setting.phone);
        formData.append("map_key", this.state.setting.map_key);
        formData.append("email", this.state.user.email);
        formData.append("password", this.state.user.password);
        formData.append("user_id", this.state.user.id);

        axios({
            method: "post",
            url: "/api/settings",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization":
                    "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8",
            },
            data: formData,
        })
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Data berhasil disimpan",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onFileChange(e) {
        let setting = this.state.setting;
        setting[e.target.name] = e.target.files[0];
        this.setState({
            setting,
        });
    }

    onChange(e) {
        let setting = this.state.setting;
        setting[e.target.name] = e.target.value;
        this.setState({
            setting,
        });
    }

    onUserChange(e) {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({
            user,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Settings</h4>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.saveData}
                                    encType="multiPart/form-data"
                                >
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Logo</th>
                                                <td>
                                                    <img
                                                        width={100}
                                                        src={
                                                            "/storage/" +
                                                            this.state.setting
                                                                .logo
                                                        }
                                                        alt="logo"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        id="logo"
                                                        name="logo"
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={
                                                            this.onFileChange
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="logo"
                                                        className="btn btn-primary"
                                                    >
                                                        Edit
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Title</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className="form-control"
                                                        value={
                                                            this.state.setting
                                                                .title
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Map Key</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="map_key"
                                                        name="map_key"
                                                        className="form-control"
                                                        value={
                                                            this.state.setting
                                                                .map_key
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={
                                                            this.state.user
                                                                .email
                                                        }
                                                        onChange={
                                                            this.onUserChange
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Password</th>
                                                <td>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        autoComplete="new-password"
                                                        value={
                                                            this.state.user
                                                                .password
                                                        }
                                                        onChange={
                                                            this.onUserChange
                                                        }
                                                    />
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Phone</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        value={
                                                            this.state.setting
                                                                .phone
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Colors</th>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input
                                                                name="color1"
                                                                type="color"
                                                                value={
                                                                    this.state
                                                                        .setting
                                                                        .color1
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onChange
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input
                                                                name="color2"
                                                                type="color"
                                                                value={
                                                                    this.state
                                                                        .setting
                                                                        .color2
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button
                                        type="submit"
                                        className="btn btn-success float-right"
                                    >
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingTable;
