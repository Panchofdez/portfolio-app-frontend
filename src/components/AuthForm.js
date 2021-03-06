import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUser, fbLogin } from "../store/actions/auth";
import { toast } from "react-toastify";
import FacebookLogin from "react-facebook-login";
import Background from "../images/lightbulb-background.jpg";
class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  notify = () => {
    toast(
      `Welcome ${this.state.name}! When you are ready, head over to MyPortfolio to create your portfolio`,
      { autoClose: 10000 }
    );
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await this.props.authenticateUser(this.props.type, this.state);
      if (this.props.match.url === "/signup") {
        this.notify();
      }
      this.props.history.push("/portfolios");
    } catch (err) {
      return;
    }
  };
  responseFacebook = async (response) => {
    try {
      await this.props.fbLogin(response.accessToken, response.userID);
      if (this.props.match.url === "/signup") {
        this.notify();
      }
      this.props.history.push("/portfolios");
    } catch (err) {
      return;
    }
  };
  render() {
    const { email, password, name } = this.state;
    const { type, buttonText } = this.props;
    return (
      <div
        className="row justify-content-center w-100 m-0 auth-container"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center ",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="col-lg-4 col-sm-6 col-10 my-5 py-5 px-4 elevated"
          style={{ backgroundColor: "white" }}
        >
          <form onSubmit={this.handleSubmit}>
            {this.props.type === "signup" && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  autoComplete="off"
                  value={name}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  className="form-control elevated"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                autoComplete="off"
                value={email}
                onChange={this.handleChange}
                type="text"
                name="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                autoComplete="off"
                value={password}
                onChange={this.handleChange}
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn button form-btns btn-block mt-4 mb-3"
            >
              {buttonText}
            </button>

            <div className="d-flex justify-content-center">
              <p style={{ fontWeight: "bold", color: "#161716" }}>Or</p>
            </div>
            <FacebookLogin
              appId="1547475692098707"
              autoLoad={false}
              callback={this.responseFacebook}
              cssClass="fb-button form-btns"
              icon="fa-facebook"
            />
          </form>
          {type === "signup" && (
            <Link
              to="/signin"
              className="nav-link pt-3 l-0 text-center"
              style={{ fontWeight: "bold", color: "#75a99b" }}
            >
              Already have an account? Sign in instead
            </Link>
          )}
          {type === "signin" && (
            <Link
              to="/signup"
              className="nav-link pt-3 pl-0 text-center "
              style={{ fontWeight: "bold", color: "#75a99b" }}
            >
              Don't have an account? Sign up!
            </Link>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
    currentUser: state.currentUser.user,
  };
}

export default connect(mapStateToProps, { authenticateUser, fbLogin })(
  AuthForm
);
