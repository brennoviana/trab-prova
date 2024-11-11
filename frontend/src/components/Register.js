// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../Api';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, name, password });
      alert('Usuário registrado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Registrar</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        <Link to="/login" className="link">
          Já tem uma conta? Faça login aqui.
        </Link>
      </form>
    </div>
  );
};

export default Register;
