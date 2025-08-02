import React, { useEffect, useState } from "react";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ marginBottom: "20px" }}>
              <strong>Status:</strong> {order.status} | <strong>Total:</strong> ${order.totalPrice}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.menuItem?.name || "Unknown"} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
