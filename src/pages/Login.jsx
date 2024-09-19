import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch("https://medical-clinic.serv00.net/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("تم تسجيل الدخول بنجاح:", data);
        localStorage.setItem("token", data.data.token);
        login(data.data);
       
      } else {
        setError(data.message || "Pleas try again");
      }

      setLoading(false);
    } catch (error) {
      // console.error("خطأ في تسجيل الدخول:", error);
      setError("Some thing wont wrong pleas try later");
    }
  };

  return (
    <div className="">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center lg:text-left w-1/2 gap-4">
            <img
              src="/login photo.jpg"
              className="rounded-lg object-cover hidden sm:block  "
              alt="login"
            />
          </div>
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <h1 className="text-5xl font-bold h-16 bg-gradient-to-tr from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Login 
              </h1>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">User name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your user name"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                      Forget the Password ?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary font-bold" disabled={loading} >{loading ? "Loading..." : "Login"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



// Username: super_admin
// Password: 12345678