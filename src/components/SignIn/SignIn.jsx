import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [value, setValue] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    mobile: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  function onMobileChange(e) {
    setValue((prev) => ({ ...prev, mobile: e.target.value }));
    setError((prev) => ({ ...prev, mobile: "" }));
    setShowError(false);
    setErrorMessage("");
  }

  function onPasswordChange(e) {
    setValue((prev) => ({ ...prev, password: e.target.value }));
    setError((prev) => ({ ...prev, password: "" }));
    setShowError(false);
    setErrorMessage("");
  }

  async function onSubmit() {
    if (!value.mobile || !value.password) {
      setError({
        mobile: "Mobile is required",
        password: "Password is required",
      });
      setShowError(true);
      return;
    }
  }

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3 d-flex flex-column gap-1 w-50 m-auto">
        {showError && errorMessage !== "" && (
          <p className="text-danger pb-2">{errorMessage}</p>
        )}

        <input
          type="text"
          className={`form-control mb-2 ${error.mobile ? "is-invalid" : ""}`}
          placeholder="Mobile"
          value={value.mobile}
          onChange={onMobileChange}
        />
        {showError && error.mobile !== "" && (
          <div className="invalid-feedback">{error.mobile}</div>
        )}

        <input
          type={showNewPassword ? "text" : "password"}
          className={`form-control mb-2 ${error.password ? "is-invalid" : ""}`}
          placeholder="Your password"
          value={value.password}
          onChange={onPasswordChange}
        />
        {showError && error.password !== "" && (
          <div className="invalid-feedback">{error.password}</div>
        )}

        <Link
          to={"/sendmailforgetpassword"}
          className="btn btn-primary mb-2"
          onClick={() => console.log("Forgot Password?")}
        >
          Forgot Password?
        </Link>

        <button
          className="btn btn-primary btn-block"
          style={{
            backgroundColor: "#3498db",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p className="text-center mt-2">
          Not registered yet?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }}>
            Sign Up.
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
