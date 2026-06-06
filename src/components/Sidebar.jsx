import { Link } from "react-router-dom"

export default function Sidebar() {

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        height: "100vh",
      }}
    >

      <h4>CMS Panel</h4>

      <ul className="list-unstyled mt-4">

        <li className="mb-3">
          <Link
            to="/dashboard"
            className="text-white text-decoration-none"
          >
            Dashboard
          </Link>
        </li>

      </ul>

    </div>
  )
}