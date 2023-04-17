import React from "react";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  return (
    <main className='w-full min-h-[100vh] grid md:grid-cols-3 items-center overflow-y-hidden '>
      <Fade direction='up' className='login-card relative mx-auto'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-xl font-bold uppercase'>login</h1>
          <form action='' className='w-full flex flex-col gap-8'>
            <div className='labelBox'>
              <input type='text' className='labelBox-text shadow-md' required />
              <span className='labelBox-span'>email</span>
            </div>
            <div className='labelBox'>
              <input
                type='password'
                className='labelBox-text shadow-md'
                required
                autoComplete='off'
              />
              <span className='labelBox-span'>password</span>
            </div>
            <input type='submit' className='btn-login' />
          </form>
        </div>
      </Fade>
    </main>
  );
};

export default Login;
