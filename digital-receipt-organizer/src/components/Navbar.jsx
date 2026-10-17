import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out successfully");

    navigate("/");
  }

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{" "}
      <Link to="/add-receipt">Add Receipt</Link>{" "}
      <Link to="/my-receipts">My Receipts</Link>{" "}
      <Link to="/profile">Profile</Link>{" "}

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;