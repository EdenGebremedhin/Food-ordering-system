import React, { useEffect, useState } from "react";
import "../styles/Admin.css";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/menu");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, price: parseFloat(price), description, imageUrl };

    try {
      const url = editId
        ? `http://localhost:5001/api/menu/${editId}`
        : "http://localhost:5001/api/menu";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to save item");

      setMessage(editId ? "✅ Item updated!" : "✅ Item added!");
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setEditId(null);
      fetchItems();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/menu/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete item");

      setMessage("✅ Item deleted!");
      fetchItems();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editId ? "Edit Menu Item" : "Add New Menu Item"}
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-lg shadow">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded p-2"
        />
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border rounded p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="border rounded p-2 md:col-span-2"
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border rounded p-2 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition md:col-span-2"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {message && <p className="text-center mb-4 text-green-600">{message}</p>}

      <h3 className="text-xl font-semibold mb-2">Menu Items</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
                  )}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
