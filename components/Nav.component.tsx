import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  BiHome,
  BiMenu,
  BiPlusCircle,
  BiUserCircle,
  BiX,
  BiSearch,
} from "react-icons/bi";
import SearchComponent from "./Search.component";

const NavigationComponent = () => {
  const [sideBar, setsideBar] = useState(false);

  const { asPath } = useRouter();

  const [showsearch, setshowsearch] = useState(false);

  return (
    <>
      <div className='w-full flex justify-end p-5 md:hidden'>
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

      <nav
        className={`navbar ${!sideBar && "-translate-x-16"} md:translate-x-0`}
      >
        <Link
          href={"/employees/new"}
          className={`btnNavs group nuevo ${
            asPath === "/employees/new" ? "bg-sky-600 text-slate-200" : ""
          }`}
        >
          <BiPlusCircle size={40} />
          <span className='text-nav group-hover:scale-100 '>New Employee</span>
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
      </nav>

      <SearchComponent showsearch={showsearch} />
    </>
  );
};

export default NavigationComponent;
