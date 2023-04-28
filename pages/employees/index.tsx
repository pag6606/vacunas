import EmployeeListComponent from "@/components/EmployeeList.component";
import NavigationComponent from "@/components/Nav.component";
import NoEmployees from "@/components/Noemployees.component";
import { getEmployees } from "@/helper/helper";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employees() {
  const [role, setrole] = useState("");
  useEffect(() => {
    setrole(localStorage.getItem("ROLE") || "");
  }, [role]);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      const empleados = await getEmployees();
      setEmployees(empleados);
    };
    obtenerEmpleados();
  }, []);

  const eliminar = (employee: any) => {
    const confirmar = confirm(
      `¿Would you like delete the employee: ${employee.firstName} ${employee.lastName}?`
    );
    if (confirmar) {
      try {
        const eliminarEmpleado = async () => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/delete?dni=${employee.dni}&role=${role}`;
          await fetch(url, { method: "PATCH" });
          const nuevosEmpleados = employees.filter(
            (empleado: any) => empleado.id !== employee.id
          );
          setEmployees(nuevosEmpleados);
        };
        eliminarEmpleado();
        toast.success("Employee deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <NavigationComponent role={role} setEmployees={setEmployees} />
      <div className='flex flex-col items-center justify-center min-h-max mx-auto px-6'>
        {employees?.length > 0 ? (
          <>
            <div className='flex w-full items-center justify-evenly my-10'>
              <h1 className='heading'>Employees</h1>
            </div>

            <div className='contentList'>
              <div className='justify-between hidden md:flex'>
                <h2 className='heading text-slate-100 ml-6'>Name</h2>
                <h2 className='heading text-slate-100 '>Email</h2>
                <h2 className='heading text-slate-100  lg:mr-20'>Actions</h2>
              </div>
              {employees.map((empleado: any) => (
                <EmployeeListComponent
                  key={empleado.id}
                  empleado={empleado}
                  eliminar={eliminar}
                />
              ))}
            </div>
          </>
        ) : (
          <NoEmployees />
        )}
      </div>
    </>
  );
}

export default Employees;
