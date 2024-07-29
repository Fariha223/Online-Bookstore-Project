import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../useCategory";
import Layout from "../components/Layout";
import "./Category.css"; 


const Category = () => {
  
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "100px" }}>
        <div className="category-container">
          {categories.map((c) => (
            <div key={c._id} className="category-card">
              <div className="card">
                <Link to={`/category/${c.slug}`} className="category-link">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;


