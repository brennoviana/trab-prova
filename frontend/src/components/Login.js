import React, { useState } from 'react';
import { loginUser } from '../Api';
import { Link, useNavigate} from 'react-router-dom';
import './Form.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      alert('Login realizado com sucesso!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao realizar login.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
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
        <button type="submit">Login</button>
        <Link to="/register" className="link">
          Não tem uma conta? Registre-se aqui.
        </Link>
      </form>
    </div>
  );
};

export default Login;
