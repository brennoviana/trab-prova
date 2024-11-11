// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../Api';
import { Link } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      alert('Login realizado com sucesso!');
      console.log(response.data);
    } catch (error) {
      alert('Erro ao realizar login.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <Link to="/register" className="link">
          Não tem uma conta? Registre-se aqui.
        </Link>
      </form>
    </div>
  );
};

export default Login;
