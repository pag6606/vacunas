/* eslint-disable @next/next/no-img-element */

import LayoutComponent from "@/components/Layout.component";

const Empleado = ({ entrada }: any) => {
  return (
    <LayoutComponent page={"empleado"}>
      <div className='w-full my-32 md:m-0 md:h-screen flex md:items-center justify-center m-auto'>
        <div className='cardEmpleado'>
          <div className=' h-full overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={entrada.image}
              alt={entrada.name}
            />
          </div>
          <div className='contenido md:mr-6'>
            <h2 className='mt-4 text-center md:text-left  text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                nombre:
              </span>
              {entrada.name}
            </h2>
            <p className='text-center mt-4 md:text-left text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                correo:{" "}
              </span>
              {entrada.origin.name}
            </p>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export async function getStaticPaths() {
  try {
    const url = `https://rickandmortyapi.com/api/character`;
    const respuesta = await fetch(url);
    const entradas = await respuesta.json();
    const paths = entradas.results.map((entrada: any) => ({
      params: { id: `${entrada.id}` },
    }));

    return { paths, fallback: false };
  } catch (error) {}
}

export const getStaticProps = async ({ params: { id } }: any) => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const respuesta = await fetch(url);
  const entrada = await respuesta.json();
  return { props: { entrada } };
};

export default Empleado;
