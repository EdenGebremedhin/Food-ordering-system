import React, { useState } from 'react';

export default function AddMenuItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, price: parseFloat(price), description, imageUrl };

    try {
      const res = await fetch('http://localhost:5001/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error('Failed to add item');

      setMessage('Menu item added successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Price:<br />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Description:<br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </label>
        <br /><br />
        <label>
          Image URL:<br />
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </label>
        <br /><br />
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
