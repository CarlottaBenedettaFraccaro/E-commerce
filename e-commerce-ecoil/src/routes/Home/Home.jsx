import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function Home() {
  const [user] = useUser();
  const [showPopup, setShowPopup] = useState(false); //para despegar el popup de registro en caso de que el usuario sea no logged (evidentemente si no está registrado le enviará a registro, en el modal correspondiente OJO MIRAR)

  // NOTAS AL FINAL

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
    }
  }, [user]);

  const handleRegisterClick = () => {
    setShowPopup(false);
  };
  const handleTitleClick = () => {
    if (user) {
      <Navigate to="/user/${user.usuario_id}" />;
    } else {
      <Navigate to="/login" />;
    }
  };
  return (
    <div id="home" className="page">
      <h1 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
        Mi Usuario
      </h1>

      {showPopup && (
        <div className="popup">
          <p>Por favor regístrese</p>
          <button onClick={handleRegisterClick}>aquí</button>
        </div>
      )}
    </div>
  );
}

export default Home;

// Notas: se me hha acabadoyendo la olla, pero creo que se entiende lo que he hecho. si user entonces te manda al perfil de user, si !user se inicia una cadena de acciones que llevan a un popup que te manda a login, la esperanza es que después el botón lleve a regitro si no está dado de alta... o lo que sea, jeje
