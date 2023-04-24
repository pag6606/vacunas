/* eslint-disable @next/next/no-img-element */
// import { faker } from "@faker-js/faker";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useState } from "react";
import Alert from "./Alert.component";

interface FormProps {
  empleado: any;
}

const FormComponent = ({ empleado }: FormProps) => {
  const [vacuna, setvacuna] = useState(false);
  const router = useRouter();
  const nuevoEmpleadoSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    dni: Yup.number()
      .integer("invalid number")
      .positive("invalid number")
      .typeError("invalid number")
      .required("dni is required"),
    name: Yup.string()
      .min(3, "name is too short")
      .trim("esta vacio")
      .required("name is required"),
    lastName: Yup.string()
      .min(3, "lastName is too short")
      .trim("last name is empty")
      .required("lastName is required"),
  });

  const data = {};

  const random = async (e: any) => {
    e.preventDefault();
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/empleados`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Empleado creado");
      router.push("/empleados");
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (valores: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/create`;
    console.log(url);

    const createClient: any = {
      firstName: valores.name,
      lastName: valores.lastName,
      dni: valores.dni,
      email: valores.email,
      role: "Employee",
    };

    try {
      const created = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createClient),
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("Empleado creado");
    router.push("/employees");
  };

  return (
    <section className={`sectionLogin`}>
      {/* <div className='bg-[url(/img/img1.jpg)] imgBx bg-cover bg-bottom'></div> */}
      <div className={`contentBx `}>
        <Formik
          validationSchema={nuevoEmpleadoSchema}
          onSubmit={async (values, { resetForm }) => {
            await submitForm(values);
            resetForm();
          }}
          initialValues={{
            email: empleado?.email ?? "",
            dni: empleado?.dni ?? "",
            name: empleado?.name ?? "",
            lastName: empleado?.lastName ?? "",
          }}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form className='formBx'>
              <div className='flex flex-col gap-4'>
                <h2 className='heading'>New employee</h2>

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
                <div className=''>
                  <label
                    className={`label ${errors.name ? "text-red-500" : null}`}
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.name
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Jose'
                  />
                  {errors.name && touched.name ? (
                    <Alert>{errors.name}</Alert>
                  ) : null}
                </div>
                {/* apellido */}
                <div className=''>
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
                {/* {empleado._id && (
                  <>
                    <div className=''>
                      <label className={`label mr-5 mb-0`} htmlFor='birthday'>
                        Fecha de nacimiento
                      </label>
                      <Field
                        className={`inputForm `}
                        id='birthday'
                        name='birthday'
                        type='date'
                        min='2021-31-01'
                        max='2022-30-06'
                        value={empleado?.birthday}
                        placeholder='escribe tu email'
                      />
                    </div>

                    <div className=''>
                      <label className={`label`} htmlFor='telefono'>
                        telefono
                      </label>
                      <Field
                        className={`inputForm`}
                        id='telefono'
                        name='telefono'
                        type='text'
                        placeholder='1234567890'
                      />
                    </div>
                  </>
                )} */}
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
                  className='btnForm'
                  type='submit'
                  value={"new employee"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormComponent;
