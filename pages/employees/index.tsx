import EmployeeCardComponent from "@/components/EmployeeCard.component";
import EmployeeListComponent from "@/components/EmployeeList.component";
import LayoutComponent from "@/components/Layout.component";
import NoEmployees from "@/components/Noemployees.component";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { BiGridAlt, BiListUl } from "react-icons/bi";

interface EmployeesProps {
  empleados: [];
}

function Employees(empleados: EmployeesProps) {
  const [peticion, setpeticion] = useState([]);
  const [grid, setgrid] = useState(false);

  const [employees, setemployees] = useState(empleados.empleados);

  useEffect(() => {
    try {
      setpeticion(employees);
    } catch (error) {
      console.log(error);
    }
  }, [employees]);

  const eliminar = (id: any) => {
    const confirmar = confirm("¿deseas eliminar este empleado?");
    if (confirmar) {
      try {
        const eliminarEmpleado = async () => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/empleados/${id}`;
          await fetch(url, { method: "DELETE" });
          const nuevosEmpleados = peticion.filter(
            (empleado: any) => empleado.id !== id
          );
          setpeticion(nuevosEmpleados);
        };
        eliminarEmpleado();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LayoutComponent>
      {peticion.length > 0 ? (
        <>
          <div className='flex w-full items-center justify-evenly my-10'>
            <h1 className='heading'>Employees</h1>
            <button
              className='text-3xl btnForm w-auto shadow-lg'
              onClick={() => setgrid(!grid)}
            >
              {!grid ? <BiListUl /> : <BiGridAlt />}
            </button>
          </div>

          {!grid ? (
            <div className='contentGrid'>
              {peticion.map((empleado: any) => (
                <EmployeeCardComponent
                  key={empleado.id}
                  empleado={empleado}
                  eliminar={eliminar}
                />
              ))}
            </div>
          ) : (
            <div className='contentList'>
              <div className='justify-between hidden md:flex'>
                <h2 className='heading text-slate-100 ml-6'>Name</h2>
                <h2 className='heading text-slate-100 '>Email</h2>
                <h2 className='heading text-slate-100  lg:mr-20'>Actions</h2>
              </div>
              {peticion.map((empleado: any) => (
                <EmployeeListComponent
                  key={empleado.id}
                  empleado={empleado}
                  eliminar={eliminar}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <NoEmployees />
      )}
    </LayoutComponent>
  );
}

export default Employees;

export const getServerSideProps: GetServerSideProps = async () => {
  const url = "https://rickandmortyapi.com/api/character";
  const res = await fetch(url);
  const autorization = await res.json();

  return {
    props: { empleados: autorization.results },
  };
};
