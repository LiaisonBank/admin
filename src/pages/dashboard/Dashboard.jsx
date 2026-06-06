import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"

export default function Dashboard() {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="w-100">

        <Navbar />

        <div className="p-4">
          <h2>Dashboard</h2>

          <div className="row">

            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                Total Users
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                Total Posts
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}