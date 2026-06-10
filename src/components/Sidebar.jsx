import { useState } from "react";
import { Link } from "react-router-dom"
import { UsersThree, GearSix, CrownSimple, Newspaper, Article, Gauge } from "@phosphor-icons/react";
export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };


  return (
    <aside className="sidebar p-1">
      <nav className="sidebar-nav">
        <ul className="nav-menu list-unstyled">
          <li className="nav-item mb-3"><Link to="/dashboard" className="nav-link">
            <span className="nav-icon"> <Gauge size={24} /></span><span className="nav-text">Dashboard</span> </Link> </li>
          <li className="nav-item mb-3"><Link to="/articles" className="nav-link">
            <span className="nav-icon"> <Article size={24} /></span><span className="nav-text"> Articles </span></Link> </li>
          <li className="nav-item mb-3"><Link to="/ceodesk" className="nav-link">
            <span className="nav-icon"> <CrownSimple size={24} /></span><span className="nav-text"> CEO Desk </span>
          </Link> </li>
          <li className={`nav-item mb-3 has-submenu ${openMenu === 0 ? "open" : ""}`}>
          <Link to="" onClick={(e) => {e.preventDefault(); toggleMenu(0);}} className="nav-link">
            <span className="nav-icon"><Newspaper size={24} /></span>
            <span className="nav-text">Press Release</span><span className="nav-arrow"><i className="bi bi-chevron-right"></i></span>
          </Link>
          {openMenu === 0 && (
            <ul className={`nav-submenu list-unstyled ${openMenu === 0 ? "show" : ""}`}>
              <li>
                <Link to="/pressrelease/list" className="nav-link"><span className="nav-dot"></span> List View</Link>
              </li>
              <li>
                <Link to="/pressrelease/add" className="nav-link"><span className="nav-dot"></span> Add / Edit View</Link>
              </li>
            </ul>
          )}
        </li>
          <li className="nav-item mb-3"><Link to="/settings" className="nav-link">
            <span className="nav-icon"> <GearSix size={24} weight="regular" /></span><span className="nav-text">Settings</span> </Link> </li>
          <li className="nav-item mb-3"><Link to="/users" className="nav-link">
            <span className="nav-icon"> <UsersThree size={24} /></span><span className="nav-text">Users</span> </Link>  </li>
        </ul>
      </nav>

      <div className="sidebar-footer">

      </div>
    </aside>
  )
}