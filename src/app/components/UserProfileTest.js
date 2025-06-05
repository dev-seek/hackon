"use client";
import React, { useState } from "react";

export default function UserProfileTest() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [result, setResult] = useState(null);

  // Fetch user profile
  const fetchUser = async () => {
    setResult(null);
    setUser(null);
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data.data);
      setForm({ name: data.data.name, email: data.data.email, password: "" });
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: err.message });
    }
  };

  // Update user profile
  const updateUser = async (e) => {
    e.preventDefault();
    setResult(null);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
      setUser(data.data);
      setEdit(false);
    } catch (err) {
      setResult({ success: false, error: err.message });
    }
  };

  // Delete user
  const deleteUser = async () => {
    setResult(null);
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      const data = await res.json();
      setResult(data);
      setUser(null);
    } catch (err) {
      setResult({ success: false, error: err.message });
    }
  };

  return (
    <div className="auth-form-container" style={{ marginTop: 40 }}>
      <h2>User Profile API Tester</h2>
      <div className="auth-form" style={{ gap: 8 }}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={fetchUser} style={{ marginBottom: 8 }}>Fetch User</button>
      </div>
      {user && !edit && (
        <div style={{ marginTop: 20 }}>
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setEdit(true)} style={{ marginRight: 10 }}>Edit</button>
            <button onClick={deleteUser} style={{ background: '#ef4444', color: '#fff' }}>Delete</button>
          </div>
        </div>
      )}
      {edit && (
        <form onSubmit={updateUser} className="auth-form" style={{ marginTop: 20 }}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            name="password"
            placeholder="New Password (leave blank to keep)"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEdit(false)} style={{ background: '#18181b', color: '#fff', marginTop: 8 }}>Cancel</button>
        </form>
      )}
      {result && (
        <div className="auth-result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
