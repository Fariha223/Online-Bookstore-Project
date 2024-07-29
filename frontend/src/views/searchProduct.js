import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/searchContext";
import "./ProductDetails.css";

const Search = () => {
  const [values] = useSearch();
  return (
    <Layout title="Search results">
      <div className="search-container">
        <div className="search-text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="search-product-grid">
            {values?.results.map((p) => (
              <div className="search-card" key={p._id}>
                <img
                  src={`http://localhost:8080/product/product-photo/${p._id}`}
                  className="search-card-img"
                  alt={p.name}
                />
                <div className="search-card-body">
                  <h5 className="search-card-title">{p.name}</h5>
                  <p className="search-card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="search-card-text">BDT {p.price}</p>
                  <button className="btn search-product-primary">More Details</button>
                  <button className="btn search-product-secondary">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;


