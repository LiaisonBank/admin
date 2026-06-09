import { Link } from "react-router-dom";

export default function Pressrelease() {
  return (
    <>
     <div className="page-header">
        <h1 className="page-title">Press Release</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-item">Home</Link>
          <Link to="#" className="breadcrumb-item">Press Release</Link>
        </nav>
      </div>
      <p>Press Release Content</p>
    </>
  );
}