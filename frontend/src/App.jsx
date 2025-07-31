import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import AdminMenu from "./pages/AdminMenu"; // ✅ New page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-menu" element={<AdminMenu />} /> {/* ✅ New Admin UI */}
      </Routes>
    </Router>
  );
}

export default App;
