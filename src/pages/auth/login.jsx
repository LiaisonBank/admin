import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo_adminpanel.png"; // adjust path as needed


export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loginError, setLoginError] = useState("");

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "Admin@123",
  };

  const showLogin = () => {
    resetRegisterForm();
    setIsRegister(false);
  };
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const showRegister = () => {
    resetLoginForm();
    setIsRegister(true);
  };

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const resetLoginForm = () => {
    setLoginForm({
      username: "",
      password: "",
    });
  };

  const resetRegisterForm = () => {
    setRegisterForm({
      username: "",
      email: "",
      password: "",
    });
  };

  const openForgotPassword = (e) => {
    e.preventDefault();
    setRecoveryEmail("");
    setShowForgotPassword(true);
  };

  const closeForgotPassword = () => {
    setRecoveryEmail("");
    setShowForgotPassword(false);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    console.log("Recovery Email:", recoveryEmail);

    // Call API here

    setRecoveryEmail("");
    setShowForgotPassword(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const { username, password } = loginForm;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store login session
      localStorage.setItem("isAuthenticated", "true");

      // Redirect Dashboard
      navigate("/dashboard");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Register API Call
    console.log("Register Submit");
  };


  return (
    <div className="auth-wrapper">
      <div
        className={`login-container ${isRegister ? "active" : ""}`}
        aria-live="polite"
      >
        {/* Login Form */}
        <div className="form-box login">
          <form
            onSubmit={handleLoginSubmit}
            className={showForgotPassword ? "form-zoom-out" : "form-zoom-in"}
          >
            <img
              src={logo}
              alt="Company Logo"
              className="auth-logo"
            />
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    username: e.target.value,
                  })
                }
                required
              />
              <i className="bx bxs-user" />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    password: e.target.value,
                  })
                }
                required
              />
              <i className="bx bxs-lock-alt" />
            </div>
            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}

            <div className="forgot-link">
               <button
                  type="button"
                  className="forgot-btn"
                  onClick={openForgotPassword}
                >
                  Forgot Password?
                </button>
            </div>

            <button
              type="submit"
              className="btn"
            >
              Login
            </button>
          </form>
        </div>

        <div
            className={`form-box forgot-password ${
              showForgotPassword ? "active" : ""
            }`}
          >
            <form
              onSubmit={handleForgotPasswordSubmit}
              className={showForgotPassword ? "form-zoom-in" : "form-zoom-out"}
            >
            <img
              src={logo}
              alt="Company Logo"
              className="auth-logo"
            />
            <h1>Forget Password</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Recovery Email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="forgot-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeForgotPassword}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <img
              src={logo}
              alt="Company Logo"
              className="auth-logo"
            />
            <h1>Registration</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    username: e.target.value,
                  })
                }
                required
              />
              <i className="bx bxs-user" />
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                  })
                }
                required
              />
              <i className="bx bxs-envelope" />
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    password: e.target.value,
                  })
                }
                required
              />
              <i className="bx bxs-lock-alt" />
            </div>

            <button
              type="submit"
              className="btn"
            >
              Register
            </button>
          </form>
        </div>

        {/* Toggle Section */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>

            <button
              type="button"
              className="btn register-btn"
              onClick={showRegister}
            >
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>

            <button
              type="button"
              className="btn login-btn"
              onClick={showLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}