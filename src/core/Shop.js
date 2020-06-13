import React, { Component } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getAllProducts } from "./apiCore";

export class Shop extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            search: ""
        }
    }

    componentDidMount() {
        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ products: data })
            }
        });
    }

    handleChange = event => {
        this.setState({
            search: event.target.value
        })
    };

    renderProducts = (products) => (
        <>
            <form className="mb-4">
                <span className="input-group-text"
                    style={{ backgroundColor: "black", borderRadius: "10px", height: "90px" }}>
                    <div className="input-group input-group-lg">
                        <input
                            type="search"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Search by name"
                            value={this.state.search}
                        />
                    </div>
                </span>
            </form>
            <h2 className="card-header mb-4"
                style={{ backgroundColor: "#DC143c", color: "white" }}>
                Products</h2>
            <div className="row">
                {products.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </>
    )

    render() {
        const {products, search} = this.state;
        let searchProducts = products.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        })
        return (
            <Layout
            className="container">
                {this.renderProducts(searchProducts)}
            </Layout>
        )  
    }
}

export default Shop;
