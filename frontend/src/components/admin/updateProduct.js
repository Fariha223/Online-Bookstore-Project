import React, { useState, useEffect, useCallback } from "react";
import Layout from "../Layout";
import AdminOptions from "../admin/adminOptions";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./createProduct.css";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }, [params.slug]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`http://localhost:8080/product/delete-product/${id}`);
      console.log(data); 
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="product-list-container">
        <div className="row">
          <AdminOptions />
        </div>
        <div className="product-list-main-content">
          <h1>Update Product</h1>
          <div className="product-list-form-container">
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="product-list-form-select"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="product-list-form-group">
              <label className="product-list-file-label">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="product-list-form-group">
              {photo ? (
                <div className="product-list-image-preview">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="product-list-image"
                  />
                </div>
              ) : (
                <div className="product-list-image-preview">
                  <img
                    src={`http://localhost:8080/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="product-list-image"
                  />
                </div>
              )}
            </div>
            <div className="product-list-form-group">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="product-list-form-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="product-list-form-group">
              <textarea
                type="text"
                value={description}
                placeholder="Write a description"
                className="product-list-form-input"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="product-list-form-group">
              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="product-list-form-input"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="product-list-form-group">
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="product-list-form-input"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="product-list-form-group">
              <button
                className="product-list-btn product-list-btn-update"
                onClick={handleUpdate}
              >
                UPDATE
              </button>
            </div>
            <div className="product-list-form-group">
              <button
                className="product-list-btn product-list-btn-delete"
                onClick={handleDelete}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;


