import { useEffect, useState } from "react";
import API from "../api";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const { data } = await API.get("/menu");
      setMenu(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (itemId) => {
    try {
      await API.post("/orders", { items: [{ menuItem: itemId, quantity: 1 }] });
      alert("Order placed successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <h2>Menu</h2>
      {menu.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <ul>
          {menu.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> - ${item.price}  
              <button onClick={() => handleOrder(item._id)} style={{ marginLeft: "10px" }}>
                Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
