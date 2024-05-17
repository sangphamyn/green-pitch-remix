import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGroupPitchList, getPitchList, getUserList } from "prisma/pitch";
import React from "react";
import { FaPerson } from "react-icons/fa6";
export let loader: LoaderFunction = async ({ request }) => {
  const userList = await getUserList(); // Lấy danh sách tất cả người dùng đã đăng ký
  const groupPitchList = await getGroupPitchList([2]); // Lấy danh sách các sân đã được duyệt
  const pitchList = await getPitchList([2]);
  return { userList, groupPitchList, pitchList };
};
function AdminHome() {
  const data = useLoaderData<typeof loader>();
  const userList = data.userList;
  const groupPitchList = data.groupPitchList;
  const pitchList = data.pitchList;
  return (
    <div className="mx-auto my-5 w-full px-10">
      <div className="flex">
        <div className="w-4/12 px-3 mb-6">
          <div>
            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
              <h5 className="mb-0 capitalize dark:text-white">
                Danh sách chủ sân
              </h5>
            </div>
            <div className="flex-auto p-6 pt-0">
              <ul className="flex flex-col pl-0 mb-0 rounded-none">
                {userList.map((user: any, index: number) => (
                  <li
                    key={index}
                    className="border-black/12.5 rounded-t-inherit relative block border-b border-solid py-2 px-0 text-inherit"
                  >
                    <div className="flex items-center -mx-3">
                      <div className="flex items-center w-auto max-w-full px-3 flex-0">
                        <a
                          href="javascript:;"
                          className="inline-flex items-center justify-center w-12 h-12 text-base text-white transition-all duration-200 ease-in-out leading-inherit rounded-xl"
                        >
                          <img
                            className="w-full h-full object-cover rounded-xl"
                            src={
                              user?.avatar
                                ? user.avatar
                                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            }
                            alt="Image placeholder"
                          />
                        </a>
                      </div>
                      <div className="w-full max-w-full px-3 flex-1-0">
                        <h6 className="mb-0">
                          <div className="font-semibold">{user.name}</div>
                        </h6>
                        <span className="py-1 px-2 text-[10px] rounded inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-emerald-600 bg-emerald-200">
                          Online
                        </span>
                      </div>
                      <div className="w-auto max-w-full px-3 flex-0">
                        <button
                          type="button"
                          className="inline-block font-bold leading-normal text-blue-500 text-center align-middle cursor-pointer select-none border border-solid border-blue-500 rounded-lg bg-transparent transition-all ease-in tracking-tight-rem shadow-none px-4 py-1.5 text-xs hover:opacity-75 active:hover:opacity-75"
                        >
                          Khoá
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
