import React, {useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Layout from "../Layout";
import AdminOptions from "./adminOptions";
import { Select } from "antd";
import {formatDistanceToNow} from "date-fns";
import './createProduct.css';

const { Option } = Select;

const AdminOrders = () => {

    const [status ] = useState([
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancel",
    ]);

    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async() => {
        try{
            const { data } = await axios.get("http://localhost:8080/auth/get-all-orders");
            setOrders(data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        if(auth?.token)
            getOrders();
        }, [auth?.token]);


    const handleChange = async(orderId, value) => {
        try{
            const {data} = await axios.put( `http://localhost:8080/auth/order-status/${orderId}`, {
                status: value,
            });
            setChangeStatus((prev) => ({ ...prev, [orderId]: value }));
            getOrders();
            toast.success("Order status updated successfully");
        }catch(error){
            console.log(error);
            toast.error("Failed to update order status");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
      };
    
    return(
        <Layout title={"Dashboard - All Orders"}>
            <div className="order-list">
                <AdminOptions/>    
            </div>
            <div className="column-order">
                <h1 className="orders-heading">All Orders</h1>
                {orders?.map((o, i) => {
                    return(
                        <div className="order-detail-list">
                            <table>
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
                                        <td>
                                            <Select onChange={(value) => handleChange(o._id, value)}
                                                    value={changeStatus[o._id] || o?.status}>
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{formatDate(o?.createdAt)}</td>
                                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                        <td>{o?.products?.length}</td> 
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container">
                                {o?.products?.map((p, index) => (
                                    <div className="product-list" key={p._id}>
                                        <div className="product-photo">
                                            <img
                                            src={`http://localhost:8080/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100px"
                                            height={"100px"}
                                            />
                                        </div>
                                        <div className="product-photo-description">
                                            <p>{p.name}</p>
                                            <p>{p.description.substring(0, 30)}</p>
                                            <p>Price : {p.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
}
export default AdminOrders;