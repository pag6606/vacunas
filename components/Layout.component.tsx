import Head from "next/head";
import React from "react";
import NavigationComponent from "./Nav.component";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const LayoutComponent: React.FC<any> = (props) => {
  const [role, setrole] = useState("");
  useEffect(() => {
    setrole(localStorage.getItem("ROLE") || "");
  }, [role]);

  return (
    <>
      <Head>
        <title>English Bootcamp</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavigationComponent
        role={role}
        setEmployees={() => {
          return;
        }}
        openNav={props.openNav}
      />
      <ToastContainer />
      <div className='flex flex-col items-center justify-center min-h-max mx-auto px-6'>
        {props.children}
      </div>
    </>
  );
};

export default LayoutComponent;
