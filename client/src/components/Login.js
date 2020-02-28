import React from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="username..."
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="password..."
          />
          <button>Login</button>
        </form>
      </>
    );
  }
}

export default Login;
