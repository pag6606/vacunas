/* eslint-disable @next/next/no-img-element */

import FormComponent from "@/components/Form.component";
import LayoutComponent from "@/components/Layout.component";

const Empleado = ({ entrada }: any) => {
  return (
    <LayoutComponent page={"employee"} dni={entrada.dni}>
      <div className='w-full my-32 md:m-0  flex md:items-center justify-center m-auto'>
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
