import React, { useState } from "react";
import "./Tracking.css";

const OrderTracking = () => {
    const [trackingId, setTrackingId] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTrackingChange = (e) => {
        setTrackingId(e.target.value);
    };

    const handleTrackOrder = async () => {
        if (!trackingId) {
            setError("Please enter a tracking ID.");
            return;
        }
        
        setLoading(true);
        setError("");
        setOrderDetails(null);

        try {
            const response = await fetch(`http://localhost:5000/track/${trackingId}`);
            if (!response.ok) throw new Error("Order not found.");
            const data = await response.json();
            setOrderDetails(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="order-tracking">
            <h1>Track Order</h1>
            <input
                type="text"
                placeholder="Enter Order ID"
                value={trackingId}
                onChange={handleTrackingChange}
            />
            <button onClick={handleTrackOrder} className="track-button" disabled={loading}>
                {loading ? "Tracking..." : "Track Order"}
            </button>

            {error && <p className="error">{error}</p>}

            {orderDetails && (
                <div className="order-details">
                    <h1>Order Details</h1>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                    <p><strong>Total Price:</strong> ₹{orderDetails.totalPrice}</p>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
