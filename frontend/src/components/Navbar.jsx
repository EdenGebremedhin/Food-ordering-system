import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 10px", color: "#fff" }}>Home</Link>
      <Link to="/menu" style={{ margin: "0 10px", color: "#fff" }}>Menu</Link>
      {token ? (
        <>
          <Link to="/orders" style={{ margin: "0 10px", color: "#fff" }}>My Orders</Link>
          {localStorage.getItem("role") === "admin" && (
            <Link to="/admin-orders" style={{ margin: "0 10px", color: "#fff" }}>Admin Orders</Link>
          )}
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ margin: "0 10px", color: "#fff" }}>Login</Link>
          <Link to="/register" style={{ margin: "0 10px", color: "#fff" }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
