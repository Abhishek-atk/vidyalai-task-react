import { useNavigate } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNavigate = () => {
    navigate("/signup");
  };
  useEffect(() => {
    const cookieExist = Cookies.get("token");
    if (cookieExist) {
      navigate("/");
    }
  }, []);

  const userData = {
    email,
    password,
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    Cookies.remove("token");
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:4000/login", { userData })
      .then((res) => {
        console.log(res.data);
        if (res.data.login) {
          Cookies.set("token", res.data.token, {
            expires: 7,
          });
          navigate("/");
          console.log("token added to cookie");
        } else {
          toast.error(res.data.message);
          navigate("/login");
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
              <h3 className="mb-4">Login in</h3>

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
                  Submit
                </button>
              </div>

              <p className="forgot-password text-right mt-3">
                create new account
                <span onClick={handleNavigate} className="p-2 signup">
                  <u>Signup</u>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
