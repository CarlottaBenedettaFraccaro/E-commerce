import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import "./App.css";
import Layout from "./routes/Layout/Layout";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
