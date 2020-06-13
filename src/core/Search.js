import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import Card from "./Card";

const Search = ({products}) => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { /*categories, category,*/ search, results, searched } = data;


    const searchData = () => {
        //console.log(search, category);
        if (search) {
          setData({results: products.filter((item) => {
              return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }), searched: true
        })
        }
    };


    const handleChange = event => {
        setData({ ...data,search: event.target.value, searched: true });
        searchData();
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form >
            <span className="input-group-text" 
            style={{backgroundColor:"black", borderRadius:"10px", height:"90px"}}>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        {/* <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                            style={{color:"white"}}
                        >
                            <option value="All"> All</option>
                            {categories.map((c, i) => (
                                <option 
                                style={{color:"black"}}key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select> */}
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Search by name"
                        value={search}
                    />
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
