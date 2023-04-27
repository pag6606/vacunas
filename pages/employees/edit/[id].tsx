/* eslint-disable @next/next/no-img-element */

import FormComponent from "@/components/Form.component";
import LayoutComponent from "@/components/Layout.component";

const Empleado = ({ entrada }: any) => {
  return (
    <LayoutComponent page={"employee"}>
      <div className='w-full my-32 md:m-0  flex md:items-center justify-center m-auto'>
        {/* <div className=''>
          <div className='overflow-hidden rounded-full'>
            <img
              className='w-full h-full object-cover'
              src={entrada.image}
              alt={entrada.firstName}
            />
          </div>
          <div className='contenido md:mr-6'>
            <h2 className='mt-4 text-center md:text-left  text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                First Name:
              </span>
              {`${entrada.firstName} ${entrada.lastName}`}
            </h2>
            <p className='text-center mt-4 md:text-left text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                email:{" "}
              </span>
              {entrada.username}
            </p>
          </div>
        </div> */}
        <FormComponent empleado={entrada} />
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
