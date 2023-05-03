/* eslint-disable @next/next/no-img-element */

import LayoutComponent from "@/components/Layout.component";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";
import { TbVaccine, TbVaccineOff } from "react-icons/tb";

const Empleado = ({ entrada }: any) => {
  const router = useRouter();

  console.log(entrada);

  return (
    <LayoutComponent page={"employee"} openNav={true} dni={entrada.dni}>
      <div className='w-full my-32 md:m-0 md:h-screen flex md:items-center justify-center m-auto relative'>
        <button
          onClick={() => router.push(`/employees/edit/${entrada?.dni}`)}
          className='absolute flex items-center justify-evenly bg-sky-600 hover:bg-sky-500 md:right-0 -top-20 p-4 rounded-xl hover:shadow-lg transition duration-500 ease-in-out md:top-20 gap-2'
        >
          <span className='lg:text-2xl'>
            <BiEdit size={20} />
          </span>
          edit
        </button>
        <div className='border border-sky-700 flex flex-col md:flex-row rounded-lg shadow-lg'>
          <div className='p-3 grid grid-cols-2 md:grid-cols-1 items-center md:items-start justify-center'>
            <img
              className=' object-cover rounded-full h-32 w-32 mx-auto'
              src={entrada.image}
              alt={entrada.firstName}
            />
            {entrada.vaccinationStatus === true ? (
              <div className='mx-auto text-green-500 bg-slate-100 rounded-lg p-2 shadow-md'>
                <TbVaccine size={40} />
              </div>
            ) : (
              <div className='mx-auto text-red-800 bg-slate-100 rounded-lg p-2 shadow-md'>
                <TbVaccineOff size={40} />
              </div>
            )}
          </div>
          {/* <div className='contenido md:mr-6'> */}
          <div className='md:mr-6 p-5'>
            <p className='mt-4 md:text-left  text-xl'>
              <span className='heading border-none  text-sky-800'>Id:</span>
              {entrada.dni}
            </p>
            <p className='mt-4 md:text-left  text-xl'>
              <span className='heading border-none  text-sky-800'>Name:</span>
              {`${entrada.firstName} ${entrada.lastName}`}
            </p>
            <p className='mt-4 md:text-left text-xl'>
              <span className='heading border-none  text-sky-800'>Email: </span>
              {entrada.username}
            </p>
            <p className='mt-4 md:text-left text-xl'>
              <span className='heading border-none  text-sky-800'>
                Birthday:{" "}
              </span>
              {entrada.birthDate}
            </p>
            <p className='mt-4 md:text-left text-xl'>
              <span className='heading border-none  text-sky-800'>Phone: </span>
              {entrada.mobilePhone}
            </p>
            <p className='mt-4 md:text-left text-xl'>
              <span className='heading border-none  text-sky-800'>
                Address:{" "}
              </span>
              {entrada.homeAddress}
            </p>
            {entrada.vaccinationStatus === true ? (
              <>
                <span className='heading border-none text-sky-800'>
                  Doses:{" "}
                </span>
                <div className='border rounded-md px-4'>
                  {entrada.vaccines.map((vacuna: any) => (
                    <div key={vacuna.id} className='mt-4 md:text-left text-xl'>
                      <span className='heading border-none  text-sky-800'>
                        {vacuna.name}: {vacuna.doseNumber}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
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
