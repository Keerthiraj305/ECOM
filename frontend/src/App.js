import { useState } from "react";
import Login from "./Pages/User/Login";
import Registration from "./Pages/User/Registration";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from "./Pages/Admin/Dashboard";
import Homepage from "./Pages/User/Homepage";
import Cart from "./Pages/User/Cart";
import Checkout from "./Pages/User/Checkout";
import Orders from "./Pages/User/Orders";
import About from "./Pages/User/About";
function App() {
  return (
    <>
      <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/Register" element={<Registration/>}/>
  <Route path="/home" element={<Homepage />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/about" element={<About />} />
  <Route path="/admin/dashboard" element={<Dashboard />} />
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
