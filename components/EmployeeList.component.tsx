import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

interface EmployeeListComponentProps {
  empleado?: any;
  eliminar?: any;
}

function EmployeeListComponent({
  empleado,
  eliminar,
}: EmployeeListComponentProps) {
  const router = useRouter();

  return (
    <div className='list'>
      <p className='text-xl py-3  font-bold md:p-0'>{empleado?.firstName}</p>
      <p className='text-xl py-3 font-medium'>{empleado?.username}</p>
      <div>
        <div className='flex gap-2'>
          <button
            onClick={() => router.push(`/employees/edit/${empleado?.id}`)}
            className='flex items-center justify-evenly  btnForm bg-sky-600 hover:bg-sky-500'
          >
            <span className='lg:text-2xl'>
              <BiEdit />
            </span>
            edit
          </button>
          <button
            onClick={() => eliminar(empleado?.id)}
            className='flex items-center justify-evenly btnForm bg-red-700 hover:bg-red-600'
          >
            <span className='lg:text-2xl'>
              <BiTrash />
            </span>
            delete
          </button>
        </div>
        <Link href={`/employees/${empleado?.id}`}>
          <button className='mt-2 btnForm'>see more</button>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeListComponent;
