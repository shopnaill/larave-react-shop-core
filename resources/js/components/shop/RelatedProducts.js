import React from "react";
import { Link } from "react-router-dom";

class RelatedProducts extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
        
    }
    componentDidMount()
    {
        this.getProducts();
    }
    getProducts()
    {
        fetch("/api/product/related/" + this.props.product_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Authorization": "qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8"
            }
        })
            .then((res) => res.json())
            .then((products) => this.setState({ products, loading: false }))
            .catch((error) => {
                alert(error);
                this.setState({
                    loading: false,
                });
            });
    }
    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="title">Related Products</h2>
                         <hr />
                    </div>
                </div>
                <div className="row">
                    {this.state.products.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                            <Link  to={`/product/${product.id}`} >
                            <div className="product-item">
                                <div className="pi-pic">
                                    <img className="img-fluid" src={product.cover} alt="" />
                                     
                                </div>
                                <div className="pi-text">
                                    <h6>{product.name}</h6>
                                    <p>{product.price} EGP</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

export default RelatedProducts;