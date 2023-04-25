/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const NoEmployees = () => {
  return (
    <div className='md:h-screen flex items-center flex-col justify-center'>
      <h1 className='heading'>There are not employees yet</h1>
      <img
        className='my-5 shadow-lg rounded-lg'
        src='https://media.giphy.com/media/I1nwVpCaB4k36/giphy.gif'
        alt='no tasks yet'
      />
      <div className='mt-5'>
        <Link href={"/employees/new"} className='btnForm shadow-md'>
          Register a new employee
        </Link>
      </div>
    </div>
  );
};

export default NoEmployees;
