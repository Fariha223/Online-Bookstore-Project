import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";
import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();


  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }, [params.slug]);

  useEffect(() => { 
    if (params?.slug) getProduct();
  }, [params?.slug, getProduct]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-details-image">
          <img
            src={`http://localhost:8080/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "BDT",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="product-details-button"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="similar-products-container">
        <h4 className="similar-products-title">Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="similar-products-grid">
          {relatedProducts?.map((p) => (
            <div className="similar-product-card" key={p._id}>
              <img
                src={`http://localhost:8080/product/product-photo/${p._id}`}
                className="similar-product-image"
                alt={p.name}
              />
              <div className="similar-product-body">
                <div className="similar-product-name-price">
                  <h5 className="similar-product-title">{p.name}</h5>
                  <h5 className="similar-product-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "BDT",
                    })}
                  </h5>
                </div>
                <p className="similar-product-text">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="similar-product-buttons">
                  <button
                    className="similar-product-details-button"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="similar-product-details-button"
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
      </div>
    </Layout>
  );
};


export default ProductDetails;

