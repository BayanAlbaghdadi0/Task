import React from "react";
import { useAuth } from "../context/AuthContext";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export const Nav = () => {
  const { logout, loading } = useAuth();
  return (
    <div className="navbar bg-base-100 mx-auto px-10">
      <div className="navbar-start">
        <div className="dropdown z-50">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link to={"/CreateAdmin"} className=" inline-block btn-sm my-4  ">
              <button className="btn btn-outline  btn-info btn-sm mx-8">
                CreateAdmin
              </button>
            </Link>
            <Link to={"/CreateClinic"} className=" inline-block btn-sm my-4  ">
              <button className="btn btn-outline  btn-info btn-sm mx-8">
              CreateClinic
              </button>
            </Link>
            <button className="btn btn-outline btn-error  btn-sm ">
              {!loading ? (
                <CiLogout
                  onClick={logout}
                  className="w-6 h-6 text-white cursor-pointer"
                />
              ) : (
                <span className="loading loading-spinner text-error"></span>
              )}
            </button>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Suber-Admin</a>
      </div>
      <div className="navbar-center hidden justify-between lg:flex">
        <ul className="menu menu-horizontal px-1"></ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-8 ">
          <Link to={"/CreateClinic"} className=" inline-block  ">
            <button className="btn btn-outline  btn-info btn-sm ">
            CreateClinic
            </button>
          </Link>
          <Link to={"/CreateAdmin"} className=" inline-block  ">
            <button className="btn btn-outline btn-info btn-sm ">
              CreateAdmin
            </button>
          </Link>
          <button className="btn btn-outline btn-error  btn-sm ">
            {!loading ? (
              <CiLogout
                onClick={logout}
                className="w-6 h-6 text-white cursor-pointer"
              />
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
