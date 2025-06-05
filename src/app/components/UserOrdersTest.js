"use client";
import React, { useState } from "react";

export default function UserOrdersTest() {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [result, setResult] = useState(null);
  const [order, setOrder] = useState({ name: "", price: "", quantity: "" });

  // Fetch all orders
  const fetchOrders = async () => {
    setResult(null);
    try {
      const res = await fetch(`/api/users/${userId}/orders`);
      const data = await res.json();
      setOrders(data.data || []);
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: err.message });
    }
  };

  // Add new order
  const addOrder = async (e) => {
    e.preventDefault();
    setResult(null);
    try {
      const res = await fetch(`/api/users/${userId}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...order, price: Number(order.price), quantity: Number(order.quantity) }),
      });
      const data = await res.json();
      setResult(data);
      setOrder({ name: "", price: "", quantity: "" });
      fetchOrders();
    } catch (err) {
      setResult({ success: false, error: err.message });
    }
  };

  return (
    <div className="auth-form-container" style={{ marginTop: 40 }}>
      <h2>User Orders API Tester</h2>
      <div className="auth-form" style={{ gap: 8 }}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={fetchOrders} style={{ marginBottom: 8 }}>Fetch Orders</button>
      </div>
      <form onSubmit={addOrder} className="auth-form" style={{ marginTop: 20 }}>
        <input
          name="name"
          placeholder="Item Name"
          value={order.name}
          onChange={e => setOrder({ ...order, name: e.target.value })}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={order.price}
          onChange={e => setOrder({ ...order, price: e.target.value })}
          required
        />
        <input
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={order.quantity}
          onChange={e => setOrder({ ...order, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Order</button>
      </form>
      {orders.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h4 style={{ color: '#a1a1aa', marginBottom: 8 }}>Orders:</h4>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {orders.map((o, i) => (
              <li key={i} style={{ background: '#232336', borderRadius: 8, marginBottom: 8, padding: 12 }}>
                <b>{o.name}</b> | Price: {o.price} | Qty: {o.quantity} | Date: {o.order_date ? new Date(o.order_date).toLocaleString() : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {result && (
        <div className="auth-result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
