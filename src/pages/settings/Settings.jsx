import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <>
     <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-item">Home</Link>
          <Link to="#" className="breadcrumb-item">Settings</Link>
        </nav>
      </div>
      <p>Settings Content</p>
    </>
  );
}