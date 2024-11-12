import './App.css'
import { Route, Routes } from "react-router-dom";
import Register from './Components/useres/Register';

function App() {
 
  return (
    <>
    <div>
      <a href="" target="">
        🚶‍♂️💡
      </a>
      <a href="" target=""></a>
    </div>
    <h1>Ecoil venta de aceite de oilva andaluz</h1>
    <Routes>

  <Route path="/register" element={<Register />} />


</Routes>
    <div className="card">
      <p></p>
    </div>
  </>
  )
}

export default App
