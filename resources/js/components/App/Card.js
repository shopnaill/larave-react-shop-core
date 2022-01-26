import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
            icon: this.props.icon,
            link: this.props.link,
            counter: this.props.counter,
            color: this.props.color,
        };
    }
    render() {
        return (
            <div className="col-md-4 col-6 col-xl-3">
                <div className="card bg-c-light order-card">
                    <Link className="card-block" to={this.state.link}>
                        <h6 className="m-b-20">{this.state.title}</h6>
                        <h2 className="text-right">
                            <i style={{ color: this.state.color }}
                                className={
                                    this.state.icon + " " + this.state.color
                                }
                            ></i>
                            <span>{this.state.counter}</span>
                        </h2>
                        <p className="m-b-0">
                            {" "}
                            {this.state.description}{" "}
                            <span className="f-right"></span>
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Card;
