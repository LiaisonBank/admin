import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from "../assets/images/logo_admin_panel.webp";

export default function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username");
  const [hidden, setHidden] = useState(false);

  const handleToggleSidebar = () => {
    const newState = !hidden;
    setHidden(newState);

    document.body.classList.toggle("sidebar-hidden", newState);
  };

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <header className="header col-lg-12 shadow-sm p-3 d-flex justify-content-between overflow-hidden">
      <div className="col-lg-2"> 
          <img
            src={logo}
            alt="Admin Panel Logo"
            title="Admin Panel"   
            width={150}
          />
        {/* <h5>Liaison Bank</h5> */}
      </div>
      <div className="col-lg-8">
        <button className="sidebar-toggle" title="Toggle Sidebar" onClick={handleToggleSidebar}>
          <i className="bi bi-layout-sidebar-inset"></i>
        </button>
      </div>
      <div className="col-lg-2 text-end px-2">
        <div className="username">
          {username ? <p>Welcome, {username}</p> : <p>Not logged in</p>}
          <button className="btn btn-sm btn-danger" onClick={logout}> Logout </button>
        </div>
      </div>
    </header>
  )
}