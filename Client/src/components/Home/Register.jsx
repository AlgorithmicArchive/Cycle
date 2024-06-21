import React, { useState } from "react";
import {
  checkEmailExists,
  checkUsernameExists,
  isPasswordValid,
} from "../../utility/Home/Functions.js";
import { InputField } from "./InputField.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailMsg, setEmailMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const [submitMsg, setSubmitMsg] = useState("");
  const [submitMsgColor, setSubmitMsgColor] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = async () => {
    try {
      const register = await axios.post(
        "http://localhost:3000/api/home/register",
        { email: email, username: username, password: password }
      );
      setSubmitMsgColor("green");
      setSubmitMsg(register.data.message);
      setEmail("");
      setPassword("");
      setIsLogin(true);
    } catch (error) {
      setSubmitMsgColor("red");
      setSubmitMsg(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const login = await axios.post("http://localhost:3000/api/home/login", {
        username: username,
        password: password,
      });
      setSubmitMsg(login.data.message);
      navigate("/User/Index");
    } catch (error) {
      setSubmitMsgColor("red");
      setSubmitMsg(error.response.data.message);
    }
  };

  return (
    <div className="card lg:card-side bg-white shadow-xl">
      <img
        src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
        alt="Album"
        className="hidden md:inline-block lg:inline"
      />

      <div className="card-body max-w-xs">
        <h2 className="card-title">Create an account</h2>
        {!isLogin && (
          <>
            <InputField
              iconClass="fa-envelope"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => checkEmailExists(email, isLogin, setEmailMsg)}
              errorMsg={emailMsg}
            />
          </>
        )}
        <InputField
          iconClass="fa-user"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkUsernameExists(username, isLogin, setUsernameMsg)}
          errorMsg={usernameMsg}
        />

        <InputField
          iconClass="fa-lock"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => isPasswordValid(password, isLogin, setPasswordMsg)}
          errorMsg={passwordMsg}
        />

        <div className="card-actions justify-center">
          {!isLogin && (
            <div className="flex flex-col items-center justify-center gap-2">
              <button className="btn btn-primary" onClick={handleRegister}>
                Register
              </button>
              <p>OR</p>
              <p
                className="text-xl cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </p>
            </div>
          )}
          {isLogin && (
            <div className="flex flex-col items-center justify-center gap-2">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <p>OR</p>
              <p
                className="text-xl cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Register
              </p>
            </div>
          )}
        </div>
        <span
          className="text-sm font-bold text-center whitespace-pre-line"
          style={{ color: submitMsgColor }}
        >
          {submitMsg}
        </span>
      </div>
    </div>
  );
};
