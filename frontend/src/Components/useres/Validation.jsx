import React from 'react';
import './Validation.css';
import { Link } from 'react-router-dom'; 

//mirarme la logica porfavor chicos... te has registrado correctamente? o la cagué?
const Validation = () => {
  return (
    <div className="validation-container">
      <h1 className="validation-message">¡Te has registrado correctamente!</h1>
      <p className="validation-subtitle">
        Ahora puedes iniciar sesión con tu cuenta. 
      </p>
      <Link to="/login">
        <button className="validation-button">Iniciar sesión</button>
      </Link>
    </div>
  );
};

export default Validation;
