/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { BiTrash, BiEdit } from "react-icons/bi";

interface EmployeeListComponentProps {
  empleado?: any;
  eliminar?: any;
}

const EmployeeCardComponent = ({
  empleado,
  eliminar,
}: EmployeeListComponentProps) => {
  const router = useRouter();

  const { name, email, image, lastname, id } = empleado;

  return (
    <div className='card'>
      <div className='cardImg'>
        <img className='w-full h-full object-cover' src={image} alt={name} />
      </div>
      {/* content */}
      <div className='w-full h-full absolute overflow-hidden'>
        <div className='details'>
          <h3 className='capitalize text-xl text-center'>
            {lastname ? name + " " + lastname : name}
          </h3>
          <p className='text-center opacity-50'>{email}</p>
          <div className='flex gap-2'>
            <button
              onClick={() => router.push(`/editar/${id}`)}
              className='flex items-center justify-evenly mt-4 btnForm bg-sky-600 hover:bg-sky-500'
            >
              <span className='lg:text-2xl'>
                <BiEdit />
              </span>
              edit
            </button>
            <button
              onClick={() => eliminar(id)}
              className='flex items-center justify-evenly  mt-4 btnForm bg-red-700 hover:bg-red-600'
            >
              <span className='lg:text-2xl'>
                <BiTrash />
              </span>
              delete
            </button>
          </div>
          <Link href={`/employees/${id}`}>
            <button className='mt-2 btnForm'>watch more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCardComponent;
