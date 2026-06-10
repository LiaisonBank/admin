import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <>
      <div className="m-0 p-0 container-fluid dashboard-layout">
        <Navbar />
        <Sidebar />
        <main className="main">
          <div className="main-content">
            <Outlet />
          </div>
          <Footer />
        </main>
        {/*  Back to Top  */}
        <Link to="#" className="back-to-top">
          {/* <i className="bi bi-arrow-up"></i> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
          </svg>
        </Link>
      </div>
    </>
  );
}