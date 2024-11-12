import { useState } from "react";
import { useNavigate } from "react-router-dom"; //.?
import { useUser } from "../../UserContext";

export default function ChangePass() {
  // const [email, setEmail] = useState(''); --> NO HACE FALTA PORQUE LO IMPORTAMOS DESDE EL USERCONTEXT/ nosotros es segun lo que utilicemos, si este o el Navigate, creo.
  const [recoverPassCode, setRecoverPassCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Usamos el contexto de usuario
  const [user] = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await fetch("http://localhost:5173/users/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email, //usamos el email del usuario logueado
        recoverPassCode,
        newPass,
      }),
    });
    const json = await res.json();
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => navigate("/user/login"), 2000);
    } else {
      setError(
        json.error || "error al enviar la solicitud de cambio de contraseña"
      );
    }
  };

  return (
    <>
      <h1>Página de cambio de contraseña</h1>
      <p>
        Inserte {/* su correo electrónico,*/} su código de contraseña y su nueva
        contraseña
      </p>
      <div id="recover" className="page">
        <form onSubmit={handleSubmit}>
          {/* <label>
                        <span>Email: </span>
                        <input
                            name="username"
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>  SE SUPONE QUE CUANDO CAMBIAS TU CONTRASEÑA YA ESTÁS LOGUEADO, ASÍ QUE NO HARÍA FALTA RELLENAR ESTE CAMPO*/}
          <label>
            <span>Código de cambio de contraseña:</span>
            <input
              name="recoverPass"
              type="text"
              value={recoverPassCode}
              onChange={(e) => setRecoverPassCode(e.target.value)}
            />
          </label>
          <label>
            <span>Nueva contraseña:</span>
            <input
              name="newPass"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <button>Validar</button>
            {success && <p>Cambio de contraseña realizada</p>}
            {error && <p>{error}</p>}
          </label>
        </form>
      </div>
    </>
  );
}
