import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import * as actions from "../../store/actions";

function signup() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", cred);
      dispatch(actions.fetchUsers(response.data.id));
      router.push("/stories");
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const onShowPassword = () => {
    let element = document.getElementById("password");
    if (element.type === "password") element.type = "text";
    else element.type = "password";
  };

  const onInputChange = (e, field) => {
    setErrors([]);
    if (field === "email")
      setCred((prev) => ({ ...prev, email: e.target.value }));
    else setCred((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div className="sign-cont">
      <div className="sign-bot-cont">
        <div className="sign-side-cont">
          <div className="sign-content-cont">
            <div className="sign-side-title">Welcome Back!</div>
            <div className="sign-side-text">
              Keep reading new stories and maintain your streaks.
            </div>
            <button
              className="sign-side-btn"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="sign-right-cont">
          <form className="sign-main-form-cont" onSubmit={onSubmit}>
            <div className="sign-right-title">Register your Account</div>
            <div className="sign-form-cont">
              <div className="sign-error">
                {errors.length > 0 && errors[0].message}
              </div>
              <input
                className="sign-input-field input-font"
                value={cred.email}
                onChange={(e) => onInputChange(e, "email")}
                placeholder="Email Address"
              />
              <div className="sign-pass-cont">
                <input
                  className="sign-password-input input-font"
                  type="password"
                  id="password"
                  value={cred.password}
                  onChange={(e) => onInputChange(e, "password")}
                  placeholder="Password"
                />
                <img
                  src="https://img.icons8.com/material-outlined/50/000000/visible--v1.png"
                  onClick={onShowPassword}
                />
              </div>
              <button
                disabled={cred.email === "" || cred.password === ""}
                className={
                  cred.email === "" || cred.password === ""
                    ? "sign-btn"
                    : "sign-btn btn-active"
                }
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="sign-pass-format">
            <div className="sign-valid-text">Valid password format: </div>
            <ul className="sign-valid-list">
              <li>Password must be at least 10 characters long</li>
              <li>Have at least one number</li>
              <li>Have at least one lowercase character</li>
              <li>Have at least one uppercase character</li>
              <li>Have at least one special character</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
