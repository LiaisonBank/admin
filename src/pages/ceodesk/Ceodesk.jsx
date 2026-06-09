import { Link } from "react-router-dom";

export default function Ceodesk() {
  return (
    <>
     <div className="page-header">
        <h1 className="page-title">CEO Desk</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-item">Home</Link>
          <Link to="#" className="breadcrumb-item">CEO Desk</Link>
        </nav>
      </div>
      <p>CEO Desk Content</p>
    </>
  );
}