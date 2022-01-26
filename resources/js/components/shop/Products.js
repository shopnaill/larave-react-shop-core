import React from "react";
import Product from "./Product";
import Loader from "../Loader";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productCategory: [],
            categories: [],
            loading: true,
            error: null
        };

        this.getProducts = this.getProducts.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }
     
    componentDidMount() {
        this.getProducts();
        this.getCategories();
    }

     onCategoryChange(event) {
        
            let  category = event.target.value;
            let products = this.state.products;
            if (category != 0) {

            this.setState({
                loading: true,
                error: null
            });
                 products = products.filter(p => p.category_id == category);

                 if (products.length == 0) {
                    products = this.state.productCategory;
                    products = products.filter(p => p.category_id == category);

                    this.setState({
                        products: products,
                        loading: false
                    });
                   
                 }else
                    {
                        this.setState({
                            products: products,
                            loading: false
                        });
                    }
            }else
            {
                products = this.state.productCategory;
                this.setState({
                    products: products,
                    loading: false
                });
            }
       

      
    }

    getCategories() {
        this.setState({
            loading: true,
            error: null
        });
        fetch("/api/categories" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-Authorization': 'qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8'
            },
            body: JSON.stringify({
                "page": 1,
                "limit": 10
            })
        })
        .then(res => res.json())
        .then(categories => this.setState({categories, loading: false}))
        .catch(error => {
            this.setState({
                error,
                loading: false
            });
        });
      }

    searchProducts(event) {
        this.setState({
            loading: true,
            error: null
        });
        let searchText = event.target.value;
        let products = this.state.products;
       
        if (searchText.length > 0) {
            products = products.filter(product => {
                return product.name.toLowerCase().includes(searchText.toLowerCase());
            });
        this.setState({
            products: products ,
            loading: false
        });
        } else {
            this.getProducts();
        }
           

    }
     
     getProducts()  {
         this.setState({
            loading: true,
            error: null
        });
        fetch("/api/products" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-Authorization': 'qSguaRblSGsCAYI69eOhzXSXWF6UJYHy199dgqSnBYmt3WK12cMHoFBPA4KVJFL8'
            }
        })
        .then(res => res.json())
        .then(products => this.setState({products, loading: false , productCategory: products}))
        .catch(error => {
            this.setState({
                error,
                loading: false
            });
        });


     }


    render() {
        console.log(this.state.products);
    console.log(this.state.categories);

        let products = <Loader />;
        if (!this.state.loading) {
            
            products = this.state.products.map(product => {
                return <Product key={product.id} product={product} />
            });
        }

        return (
            <div className="products">
            <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                           { user.role == 1 ? <div className="col-lg-3 col-xl-2">
                                <a href="/shop/new" className="btn btn-warning mb-3 mb-lg-0"><i className="bx bxs-plus-square"></i> منتج جديد</a>
                            </div> : null}
                            <div className="col-lg-9 col-xl-10">
                                <form className="float-lg-end">
                                    <div className="row row-cols-lg-2 row-cols-xl-auto g-2">
                                        <div className="col">
                                            <div className="position-relative mt-3">
                                                <input onKeyUp={this.searchProducts} type="text" className="form-control ps-5" placeholder="Search Product..."/> <span className="position-absolute top-50 product-show translate-middle-y"><i className="bx bx-search"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="position-relative mt-3">
                                                <select onChange={this.onCategoryChange} className="form-control ps-5">
                                                    <option value="0">All Categories</option>
                                                    {this.state.categories.map(category => {
                                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="row  product-grid">
                {products}
            </div>
            </div>
        );
    }
}

export default Products;