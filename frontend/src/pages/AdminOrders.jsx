import { useEffect, useState } from "react";
import API from "../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/admin");
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/admin/${orderId}`, { status });
      alert("Order status updated!");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>User:</strong> {order.user.name} | <strong>Status:</strong> {order.status} | <strong>Total:</strong> ${order.totalPrice}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.menuItem.name} x {item.quantity}</li>
                ))}
              </ul>
              <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status}>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
