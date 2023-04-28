/* eslint-disable @next/next/no-img-element */

import LayoutComponent from "@/components/Layout.component";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";

const Empleado = ({ entrada }: any) => {
  const router = useRouter();
  console.log(entrada);
  return (
    <LayoutComponent page={"employee"} openNav={true} dni={entrada.dni}>
      <div className='w-full my-32 md:m-0 md:h-screen flex md:items-center justify-center m-auto relative'>
        <button
          onClick={() => router.push(`/employees/edit/${entrada?.dni}`)}
          className='absolute flex items-center justify-evenly bg-sky-600 hover:bg-sky-500'
        >
          <span className='lg:text-2xl'>
            <BiEdit />
          </span>
          edit
        </button>
        <div className='border-2 border-slate-700 flex gap-5'>
          <div className='border-2'>
            <img
              className=' object-cover rounded-full h-32 w-32'
              src={entrada.image}
              alt={entrada.firstName}
            />
          </div>
          <div className='contenido md:mr-6'>
            <h2 className='mt-4 text-center md:text-left  text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                Name:
              </span>
              {`${entrada.firstName} ${entrada.lastName}`}
            </h2>
            <p className='text-center mt-4 md:text-left text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                Email:{" "}
              </span>
              {entrada.username}
            </p>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export async function getStaticPaths() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`;
    const respuesta = await fetch(url);
    const entradas = await respuesta.json();

    const paths = entradas.data.map((entrada: any) => ({
      params: {
        id: entrada.dni.toString(),
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export const getStaticProps = async ({ params }: any) => {
  const { id } = params;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/myInformation?dni=${id}`;
  const respuesta = await fetch(url);
  const employeeData = await respuesta.json();
  const employeeInfo = { ...employeeData.data };
  const urlRick = `https://rickandmortyapi.com/api/character/${employeeInfo.id}`;
  const respuestaRick = await fetch(urlRick);
  const datRick = await respuestaRick.json();
  const entrada = {
    ...employeeInfo,
    image: datRick.image,
  };

  return { props: { entrada } };
};

export default Empleado;
