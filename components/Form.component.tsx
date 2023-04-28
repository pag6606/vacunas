import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useState } from "react";
import Alert from "./Alert.component";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  empleado?: any;
}

const FormComponent = ({ empleado }: FormProps) => {
  console.log(empleado);
  const [vacuna, setvacuna] = useState(false);
  const router = useRouter();
  const nuevoEmpleadoSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    dni: Yup.number()
      .integer("invalid number")
      .positive("invalid number")
      .typeError("invalid number")
      .required("dni is required"),
    firstName: Yup.string()
      .min(3, "name is too short")
      .trim("esta vacio")
      .required("name is required"),
    lastName: Yup.string()
      .min(3, "lastName is too short")
      .trim("last name is empty")
      .required("lastName is required"),
  });

  const submitForm = async (valores: any) => {
    if (empleado.dni) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/update?dni=${empleado.dni}&role=Administrator`;
      const updateEmployee: any = {
        firstName: valores.firstName,
        lastName: valores.lastName,
        dni: valores.dni,
        email: valores.email,
        mobilePhone: valores.mobilePhone,
        birthDate: valores.birthDate,
        vaccinationStatus: valores.vaccinationStatus,
      };
      console.log(valores);
      try {
        await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...valores }),
        });
        toast.success("Employee updated successfully");
        router.push(`/employees/${empleado.dni}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/create`;
      const createEmployee: any = {
        firstName: valores.firstName,
        lastName: valores.lastName,
        dni: valores.dni,
        email: valores.email,
        role: "Employee",
      };

      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createEmployee),
        });
        toast.success("Employee created successfully");
        router.push("/employees");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={`sectionLogin`}>
      <div className={`contentBx `}>
        <Formik
          validationSchema={nuevoEmpleadoSchema}
          onSubmit={async (values, { resetForm }) => {
            await submitForm(values);
            resetForm();
          }}
          initialValues={{
            email: empleado?.username ?? "",
            dni: empleado?.dni ?? "",
            firstName: empleado?.firstName ?? "",
            lastName: empleado?.lastName ?? "",
            mobilePhone: empleado?.mobilePhone ?? "",
            birthDate: empleado?.birthDate ?? "1997-10-20",
            homeAddress: empleado?.homeAddress ?? "",
            vaccinationStatus: empleado?.vaccinationStatus ?? false,
          }}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form className='formBx'>
              <div
                className={`gap-4 ${
                  empleado.id
                    ? "grid grid-cols-1 md:grid-cols-2"
                    : "flex flex-col"
                }`}
              >
                <h2 className={`heading ${empleado.id ? "md:col-span-2" : ""}`}>
                  {empleado.id ? "Edit Employee" : "New employee"}
                </h2>

                <div>
                  <label
                    className={`label ${errors.dni ? "text-red-500" : null}`}
                    htmlFor='dni'
                  >
                    Identification
                  </label>
                  <Field
                    className={`inputForm  ${
                      errors.dni
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='dni'
                    name='dni'
                    type='text'
                    placeholder='1234567890'
                  />
                  {errors.dni && touched.dni ? (
                    <Alert>{errors.dni}</Alert>
                  ) : null}
                </div>
                {/* nombre */}
                <div>
                  <label
                    className={`label ${
                      errors.firstName ? "text-red-500" : null
                    }`}
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.firstName
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='firstName'
                    name='firstName'
                    type='text'
                    placeholder='Jose'
                  />
                  {errors.firstName && touched.firstName ? (
                    <Alert>{errors.firstName}</Alert>
                  ) : null}
                </div>
                {/* apellido */}
                <div>
                  <label
                    className={`label ${
                      errors.lastName ? "text-red-500" : null
                    }`}
                    htmlFor='lastName'
                  >
                    lastname
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.lastName
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Segobia'
                  />
                  {errors.lastName && touched.lastName ? (
                    <Alert>{errors.lastName}</Alert>
                  ) : null}
                </div>
                {/* correo */}
                <div className=''>
                  <label
                    className={`label ${errors.email ? "text-red-500" : null}`}
                    htmlFor='email'
                  >
                    email
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.email
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='email'
                    name='email'
                    type='email'
                    placeholder='write your email'
                  />
                  {errors.email && touched.email ? (
                    <Alert>{errors.email}</Alert>
                  ) : null}
                </div>
                {/* datos extr */}
                {empleado.id && (
                  <>
                    <div>
                      <label className={`label mr-5 mb-0`} htmlFor='birthDate'>
                        Birthdate
                      </label>
                      <Field
                        className={`inputForm `}
                        id='birthDate'
                        name='birthDate'
                        type='date'
                        min='2021-31-01'
                        max='2022-30-06'
                        value={empleado?.birthDate}
                        placeholder='escribe tu email'
                      />
                    </div>

                    <div>
                      <label className={`label`} htmlFor='mobilePhone'>
                        Phone
                      </label>
                      <Field
                        className={`inputForm`}
                        id='mobilePhone'
                        name='mobilePhone'
                        type='text'
                        placeholder='1234567890'
                      />
                    </div>

                    <div>
                      <label className={`label`} htmlFor='homeAddress'>
                        Address
                      </label>
                      <Field
                        className={`inputForm`}
                        id='homeAddress'
                        name='homeAddress'
                        type='text'
                        placeholder='Garcia Moreno,Quito, Ecuador'
                      />
                    </div>

                    <div className='flex items-center justify-center mx-auto gap-5 border-2 rounded-xl w-full border-sky-800 mt-7'>
                      <label className={`label`} htmlFor='vaccinationStatus'>
                        Has Vaccination
                      </label>
                      <Field
                        type='checkbox'
                        id='vaccinationStatus'
                        name='vaccinationStatus'
                      />
                    </div>
                  </>
                )}
                {/* vacunas */}
                {/* {empleado._id && (
                  <div className=' flex items-center justify-center'>
                    <label className={`label mr-5 mb-0`} htmlFor='vacunado'>
                      Vacunado?
                    </label>
                    <Field
                      onClick={() => setvacuna(!vacuna)}
                      className={`inputForm w-auto btnForm ${
                        vacuna ? "Vacunado" : "bg-red-500 hover:bg-red-500"
                      }`}
                      id='vacunado'
                      name='vacunado'
                      type='button'
                      value={`${vacuna ? "Vacunado" : "No vacunado"}`}
                      placeholder='escribe tu email'
                    />
                  </div>
                )} */}
                {/* birthday */}
                {vacuna && (
                  <div className=''>
                    <label className={`label mr-5 mb-0`} htmlFor='fechaVac'>
                      Fecha de vacunacion
                    </label>
                    <Field
                      className={`inputForm `}
                      id='fechaVac'
                      name='fechaVac'
                      type='date'
                      min='2021-31-01'
                      max='2022-30-06'
                      value={empleado?.birthdate}
                      placeholder='escribe tu email'
                    />
                  </div>
                )}
                <input
                  className={`btnForm ${empleado.id ? "md:col-span-2" : ""}`}
                  type='submit'
                  value={empleado.id ? "Edit Employee" : "New employee"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

FormComponent.defaultProps = {
  empleado: {},
};

export default FormComponent;
