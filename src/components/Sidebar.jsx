import { Link } from "react-router-dom"
import { SquaresFour } from "@phosphor-icons/react";
export default function Sidebar() {

  return (
    <aside className="sidebar p-3">
      <nav className="sidebar-nav">
        <ul className="nav-menu list-unstyled">
          <li className="nav-item mb-3"><Link to="/dashboard" className="nav-link active">   
          <span className="nav-icon"> <SquaresFour size={24} /></span><span className="nav-text">Dashboard</span> 
          <span className="nav-badge nav-badge-soft">Main</span> </Link> </li>
          <li className="nav-item mb-3"><Link to="/articles" className="nav-link">  Articles </Link> </li>
          <li className="nav-item mb-3"><Link to="/ceodesk" className="nav-link">  CEO Desk </Link> </li>
          <li className="nav-item mb-3"><Link to="/pressrelease" className="nav-link">  Press Release  </Link>  </li>
          <li className="nav-item mb-3"><Link to="/settings" className="nav-link">  Settings </Link> </li>
          <li className="nav-item mb-3"><Link to="/users" className="nav-link">  Users  </Link>  </li>
        </ul>
      </nav>

      <div className="sidebar-footer">

      </div>
    </aside>
  )
}