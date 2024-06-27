import React, { useState } from 'react';
import Layout from "./Pages/Layout";  // Adjust the path if necessary

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid credentials. If you do not have an account, please register.');
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        <span>Don't have an account? </span>
        <a href="/register" className="text-blue-500 hover:underline">Register</a>
      </p>
    </Layout>
  );
}

export default Login;
