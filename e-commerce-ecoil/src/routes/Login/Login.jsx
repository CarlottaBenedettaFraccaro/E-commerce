import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../UserContext";
//import "./components/users/Register.css";

function Login({ user, setUser }) {
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await fetch(
      "http://localhost:5173/login" /*aquí va la url que cremos para el fetch (video anxo día 9sept. 1h 11min.)*/,
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const json = await res.json();
    setUser(json);
    if ((res, ok)) {
      setUser(json);
    } else {
      setError(json.error);
    }
  };

  /*if (user) {
    return (
      <Navigate to="/" />
    )
  }*/

  if (user) {
    return (
      <div id="login" className="page">
        <h1>Ya has iniciado sesión</h1>
        <Link to="/">Acceder!</Link>
      </div>
    );
  }

  return (
    <div id="login" className="page">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Usuario:</span>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña:</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Entrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
