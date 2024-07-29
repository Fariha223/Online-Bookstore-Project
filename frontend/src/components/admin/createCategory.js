import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import AdminOptions from "./adminOptions";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../category/categoryForm";
import "./createCategory.css";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/category/update-category/${selectedCategory._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelectedCategory(null);
        setUpdatedName("");
        setModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error updating category:", error);
      toast.error("Something went wrong in updating category");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in deleting category");
    }
  };
  
  const handleModalClose = () => {
    console.log('Closing modal');
    setModalOpen(false);
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="create-category-dashboard">
        <div className="order-list">
          <AdminOptions />
        </div>
        <div className="col-md-9">
          <h1 className="orders-heading">Manage Category</h1>
          <div className="category-form-container">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="order-detail-list">
            <table className="category-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td className="category-actions">
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setModalOpen(true);
                          setUpdatedName(c.name);
                          setSelectedCategory(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            footer = {null}
            className="category-modal-content"
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
