import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { useCart } from "../context/cartContext";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { AiOutlineReload } from "react-icons/ai";
import SearchInput from "../components/category/searchInput";
import "./home&book-page.css";

const BookPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/category/get-category");
      if (data?.success) {
        setCategories(data?.category || []);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/product/product-count");
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [getAllCategory, getTotal]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...(prevProducts || []), ...(data?.products || [])]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length, getAllProducts]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/product/product-filters", {
        checked,
      });
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  }, [checked]);

  return (
    <Layout title={"All Books"}>
      <div className="book-container">
        <div className="book-filters">
          <h4 className="text-center">Filter By Book-Category</h4>
          <div className="book-filter-group">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="book-reset-button">
            <button
              className="book-btn-reset"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
        </div>
        <div className="book-search">
        <SearchInput />
      </div>
        <div className="book-products">
          <h1 className="text-center">All Products</h1>
          <div className="book-product-grid">
            {products?.map((p) => (
              <div className="book-card" key={p._id}>
                <img
                  src={`http://localhost:8080/product/product-photo/${p._id}`}
                  className="book-card-img-top"
                  alt={p.name}
                />
                <div className="book-card-body">
                  <div className="book-card-name-price">
                    <h5 className="book-card-title">{p.name}</h5>
                    <h5 className="book-card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "BDT",
                      })}
                    </h5>
                  </div>
                  <p className="book-card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="book-card-buttons">
                    <button
                      className="book-btn-details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="book-btn-add"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="book-load-more-section m-2 p-3">
            {products.length < total && (
              <button
                className="book-btn-load-more"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load More.. <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookPage;


