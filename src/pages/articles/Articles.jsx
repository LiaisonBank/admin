import { Link } from "react-router-dom";

export default function Articles() {
  return (
    <>
     <div className="page-header">
        <h1 className="page-title">Articles</h1>
        <nav className="breadcrumb">
          <Link to="/dashboard" className="breadcrumb-item">Home</Link>
          <Link to="#" className="breadcrumb-item">Articles</Link>
        </nav>
      </div>
      <p>Articles Content</p>
    </>
  );
}