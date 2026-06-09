import { Link } from "react-router-dom";

export default function Users() {
  return (
    <>
    <div className="page-header">
        <h1 className="page-title">Users</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-item">Home</Link>
          <Link to="#" className="breadcrumb-item">Users</Link>
        </nav>
      </div>
      <p>Users Content</p>
    </>
  );
}