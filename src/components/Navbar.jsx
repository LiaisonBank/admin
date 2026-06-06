import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="shadow-sm p-3 d-flex justify-content-between">

      <h5>Admin Dashboard</h5>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  )
}