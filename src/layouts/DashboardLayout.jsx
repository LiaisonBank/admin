import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <>
      <div className="m-0 p-0 container-fluid dashboard-layout">
        <div className="row">
            <Navbar />
            <Sidebar />
            <main className="main container">
              <div className="main-content">
                <Outlet />
              </div>
            </main>
            <Footer />
              {/*  Back to Top  */}
            <Link href="#" className="back-to-top">
              <i className="bi bi-arrow-up"></i>
            </Link>
        </div>
      </div>
    </>
  );
}