import React, { useState, useEffect } from "react";
import UserOptions from "./UserOptions";
import Layout from "../Layout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import "./Orders.css"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/auth/get-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="dashboard-container">
        <div className="dashboard-row">
          <div className="dashboard-col">
            <UserOptions/>
          </div>
          <div className="dashboard-col">
            <h1 className="orders-heading">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="order-item" key={o._id}>
                <div className="order-details">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="order-products">
                    {o?.products?.map((p, index) => (
                      <div className="order-product" key={p._id}>
                        <img
                          src={`http://localhost:8080/product/product-photo/${p._id}`}
                          className="product-image"
                          alt={p.name}
                        />
                        <div className="product-details">
                          <p className="product-name">{p.name}</p>
                          <p className="product-description">
                            {p.description.substring(0, 30)}
                          </p>
                          <p className="product-price">Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
