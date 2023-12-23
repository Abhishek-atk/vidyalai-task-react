import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";

function Signup() {
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  const userData = {
    userName,
    email,
    password,
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    Cookies.remove("token");
    e.preventDefault();
    axios
      .post("http://localhost:4000/signup", { userData })
      .then((res) => {
        if (res.data.signup) {
          Cookies.set("token", res.data.token, {
            expires: 7,
          });
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{ display: "inline-block" }}
            wrapperClass="mx-auto"
          />
        </div>
      )}

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Toaster />
            <form className="border p-4 shadow-lg rounded rounded-lg bg-light">
              <h3 className="mb-4">Sign Up</h3>

              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="User Name"
                  onChange={handleUserName}
                  value={userName}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  onChange={handleEmail}
                  value={email}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  onChange={handlePassword}
                  value={password}
                />
              </div>

              <div className="d-grid">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Sign Up
                </button>
              </div>

              <p className="forgot-password text-right mt-3">
                Already registered?
                <span onClick={handleNavigate} className="p-2 login">
                  <u> Login</u>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
