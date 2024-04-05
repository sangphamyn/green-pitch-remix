import { Link } from "@remix-run/react";
import React from "react";

function HeaderManagerComponent() {
  const handleLogout = () => {};
  return (
    <div className="navbar bg-orange-400">
      <div className="flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Sân CNTT
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Sân Thanh Niên</a>
            </li>
            <li>
              <a>Sân Công Nghiệp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <Link to="/login" className="btn ">
          Đăng ký/Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default HeaderManagerComponent;
