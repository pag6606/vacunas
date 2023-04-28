import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  BiMenu,
  BiPlusCircle,
  BiUserCircle,
  BiX,
  BiSearch,
  BiLogOut,
} from "react-icons/bi";
import SearchComponent from "./Search.component";

interface NavigationProps {
  role: string;
  setEmployees: (employees: any) => void;
  openNav?: boolean;
}

const NavigationComponent = ({
  role,
  setEmployees,
  openNav,
}: NavigationProps) => {
  const [sideBar, setsideBar] = useState(false);

  const { asPath } = useRouter();
  const router = useRouter();

  const [showsearch, setshowsearch] = useState(false);

  function logOut() {
    localStorage.removeItem("ROLE");
    router.push("/");
  }

  return (
    <>
      <div className='w-full flex justify-end p-5 absolute'>
        <nav
          className={`nav_small ${sideBar ? "bg-sky-600 text-slate-200" : ""}`}
          onClick={() => {
            setsideBar(!sideBar);
            setshowsearch(false);
          }}
        >
          <button className='btnNav'>{!sideBar ? <BiMenu /> : <BiX />}</button>
        </nav>
      </div>

      {role === "Administrator" ? (
        <>
          <nav className={`navbar ${!sideBar && "-translate-x-16"} `}>
            <Link
              href={"/employees/new"}
              className={`btnNavs group nuevo ${
                asPath === "/employees/new" ? "bg-sky-600 text-slate-200" : ""
              }`}
            >
              <BiPlusCircle size={40} />
              <span className='text-nav group-hover:scale-100 '>
                New Employee
              </span>
            </Link>
            <Link
              href={"/employees"}
              className={`btnNavs group empleados ${
                asPath === "/employees" ? "bg-sky-600 text-slate-200" : ""
              }`}
            >
              <BiUserCircle size={40} />
              <span className='text-nav group-hover:scale-100'>employees</span>
            </Link>

            {asPath === "/employees" && (
              <button
                onClick={() => setshowsearch(!showsearch)}
                className={`btnNavs rounded-full shadow-lg group empleados ${
                  showsearch
                    ? "bg-sky-600 text-slate-200"
                    : "bg-slate-300 text-sky-600"
                }`}
              >
                <BiSearch size={40} />
                <span className='text-nav group-hover:scale-100'>search</span>
              </button>
            )}
            <button
              onClick={() => logOut()}
              className={`btnNavs group empleados bg-red-600/40 text-slate-200 hover:bg-red-600/90 hover:text-slate-300`}
            >
              <BiLogOut size={40} />
              <span className='text-nav group-hover:scale-100'>log out</span>
            </button>
          </nav>
          <SearchComponent
            showsearch={showsearch}
            setEmployees={setEmployees}
            setShowSearch={setshowsearch}
          />
        </>
      ) : (
        <nav className={`navbar ${!sideBar && "-translate-x-16"}`}>
          <button
            onClick={() => logOut()}
            className={`btnNavs group empleados bg-red-600/40 text-slate-200 hover:bg-red-600/90 hover:text-slate-300`}
          >
            <BiLogOut size={40} />
            <span className='text-nav group-hover:scale-100'>log out</span>
          </button>
        </nav>
      )}
    </>
  );
};

export default NavigationComponent;
