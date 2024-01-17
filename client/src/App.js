import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const registerMethod = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/register", {
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
    }).then((response) => {
      if (response.data.message) {
        setRegisterMessage(response.data.message);
      } else {
        setRegisterMessage("ACCOUNT CREATED SUCCESSFULLY");
      }
    })
  }

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: usernameValue,
      password: passwordValue,
    }).then((response) => {
      if (response.data.message) {
        setLoginMessage(response.data.message);
      } else {
        setLoginMessage(response.data.email);
      }
    })
  }

  return (
    <div className="container">
      <div className="loginForm">
        <form>
          <h4>Login Here</h4>
          <label htmlFor="username">Username*</label>
          <input className="textInput" type="text" name="username" onChange={(e) => { setUsernameValue(e.target.value) }} placeholder="Enter your Username" required />
          <label htmlFor="password">Password*</label>
          <input className="textInput" type="password" name="password" onChange={(e) => { setPasswordValue(e.target.value) }} placeholder="Enter your Password" required />
          <input className="button" type="submit" onClick={login} value="Login" />
          <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginMessage}</h1>
        </form>
      </div>
      <div className="loginForm">
        <form>
          <h4>Register Here</h4>
          <label htmlFor="email">Email Address*</label>
          <input className="textInput" type="text" name="email" onChange={(e) => { setEmailValue(e.target.value) }} placeholder="Enter your Email Address" required />
          <label htmlFor="username">Username*</label>
          <input className="textInput" type="username" name="username" onChange={(e) => { setUsernameValue(e.target.value) }} placeholder="Enter your Username" required />
          <label htmlFor="password">Password*</label>
          <input className="textInput" type="password" name="password" onChange={(e) => { setPasswordValue(e.target.value) }} placeholder="Enter your Password" required />
          <input className="button" type="submit" onClick={registerMethod} value="Create an account" />
          <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerMessage}</h1>
        </form>
      </div>
    </div>
  );
}

export default App;