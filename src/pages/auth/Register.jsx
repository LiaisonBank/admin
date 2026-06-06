import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(formData)

    navigate("/")
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="logo">CMS</div>

        <h2 className="title">Register</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="form-control"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
          />

          <button className="btn-auth">
            Register
          </button>

        </form>

        <div className="bottom-text">
          Already have an account?
          {" "}
          <Link to="/">
            Login
          </Link>
        </div>

      </div>
    </div>
  )
}