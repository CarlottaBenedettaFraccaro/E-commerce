import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import "./App.css";
import Layout from "./routes/Layout/Layout";
import { useState } from "react";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home user={user} />} />
          <Route
            path="login"
            element={<Login user={user} setUser={setUser} />} //esto se pasa para que si quieres loguearte de nuevo salte un sms diciendo: "ya estas registrado"
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
