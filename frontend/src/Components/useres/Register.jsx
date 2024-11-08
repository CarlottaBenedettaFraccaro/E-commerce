import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  // Estado para manejar el email y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para enviar los datos al backend: será correcta? Dios sabrá
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">REGÍSTRATE</h1>
      <p className="register-subtitle">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí.</a>
      </p>
      
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
