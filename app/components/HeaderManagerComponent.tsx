import { Link, useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_.$";

function HeaderManagerComponent() {
  const data: { user: { [key: string]: string } } =
    useLoaderData<typeof loader>();
  let user = data.user;
  let groupPitch = data.groupPitchs;
  let isLogin = Object.keys(user).length > 0;
  let paramsId = data.paramsId;
  let name = "";
  groupPitch.map((item) => {
    if (item.id == paramsId) {
      name = item.name;
    }
  });
  return (
    <div className="navbar bg-orange-400">
      <div className="flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            {name}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {groupPitch.map((item) => {
              return (
                <li>
                  <a>{item.name}</a>
                </li>
              );
            })}
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
        {isLogin ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle flex w-auto pl-2 pr-4"
            >
              <div className="w-10 rounded-full">
                <img
                  className="rounded-full"
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
              <div className="text-start">
                <div className="mb-1">{user?.name}</div>
                <div className="font-normal">{user?.phone}</div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52"
            >
              <li>
                <a className="justify-between">Thông tin cá nhân</a>
              </li>
              <li>
                <Link to="/logout">Đăng xuất</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn ">
            Đăng ký/Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderManagerComponent;
