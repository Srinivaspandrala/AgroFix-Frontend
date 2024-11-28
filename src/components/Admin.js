import React, { useState, useEffect } from "react";
import "./Admin.css";

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/purchases");
            if (!response.ok) throw new Error("Failed to fetch orders.");
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStatusUpdate = async (id, currentStatus) => {
        const nextStatus =
            currentStatus === "Pending"
                ? "In Progress"
                : currentStatus === "In Progress"
                ? "Delivered"
                : null;

        if (!nextStatus) return; // Stop if the status is already Delivered

        try {
            const response = await fetch(`http://localhost:5000/purchases/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (!response.ok) throw new Error("Failed to update order status.");

            fetchOrders(); // Refresh orders after update
            alert(`Order status updated to ${nextStatus}`);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleButtonClick = (id, status) => {
        handleStatusUpdate(id, status);
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            {error && <p className="error">{error}</p>}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Tracking ID</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.trackingId}</td>
                            <td>₹{order.totalPrice.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    onClick={() => handleButtonClick(order.id, order.status)}
                                    disabled={order.status === "Delivered"}
                                    className={`status-btn ${
                                        order.status === "Delivered" ? "disabled" : ""
                                    }`}
                                >
                                    {order.status === "Delivered" ? "Delivered" : "Update Status"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
