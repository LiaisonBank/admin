import { useNavigate } from "react-router-dom"
import logo from "../assets/images/logo_admin_panel.webp";

export default function Navbar() {
  const navigate = useNavigate()
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
        <button className="sidebar-toggle" title="Toggle Sidebar">
          <i className="bi bi-layout-sidebar-inset"></i>
        </button>
      </div>
      <div className="col-lg-2 text-end"><button className="btn btn-danger" onClick={logout}> Logout </button></div>
    </header>
  )
}