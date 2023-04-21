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
    cedula: Yup.number()
      .integer("invalid number")
      .positive("invalid number")
      .typeError("invalid number")
      .required("cedula is required"),
    name: Yup.string()
      .min(3, "name is too short")
      .trim("esta vacio")
      .required("name is required"),
    lastname: Yup.string()
      .min(3, "lastname is too short")
      .trim("last name is empty")
      .required("lastname is required"),
    birthday: Yup.date(),
  });

  const data = {};

  //   const data = {
  //     id: faker.datatype.uuid(),
  //     img: faker.image.people(300, 300, true),
  //     name: faker.name.firstName(),
  //     lastname: faker.name.lastName(),
  //     email: faker.internet.email(),
  //     cedula: faker.random.numeric(10),
  //     phone: faker.phone.phoneNumber(),
  //     birthday: faker.date.birthdate(),
  //   };

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
    try {
      if (empleado._id) {
        //   editando
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/empleados/${empleado._id}`;
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            ...valores,
            // img: faker.image.people(300, 300, true),
            vacuna: vacuna ? "Vacunado" : "No vacunado",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Empleado editado");
      } else {
        //   nuevo
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/empleados`;
        await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ...valores,
            // img: faker.image.people(300, 300, true),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Empleado creado");
      }
      router.push("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`sectionLogin`}>
      {/* <div className='bg-[url(/img/img1.jpg)] imgBx bg-cover bg-bottom'></div> */}
      <div className={`contentBx ${empleado._id ? "h-full mt-10" : ""}`}>
        <Formik
          validationSchema={nuevoEmpleadoSchema}
          onSubmit={async (values, { resetForm }) => {
            await submitForm(values);
            resetForm();
          }}
          initialValues={{
            email: empleado?.email ?? "",
            cedula: empleado?.cedula ?? "",
            name: empleado?.name ?? "",
            lastname: empleado?.lastname ?? "",
            birthday: empleado?.birthday ?? "",
          }}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form className='formBx'>
              <div className='flex flex-col gap-4'>
                <h2 className='heading'>
                  {empleado.name ? "Editting employee" : "New employee"}
                </h2>

                <div>
                  <label
                    className={`label ${errors.cedula ? "text-red-500" : null}`}
                    htmlFor='cedula'
                  >
                    Cedula
                  </label>
                  <Field
                    className={`inputForm  ${
                      errors.cedula
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='cedula'
                    name='cedula'
                    type='text'
                    placeholder='1234567890'
                  />
                  {errors.cedula && touched.cedula ? (
                    <Alert>{errors.cedula}</Alert>
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
                      errors.lastname ? "text-red-500" : null
                    }`}
                    htmlFor='lastname'
                  >
                    Lastname
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.lastname
                        ? "border-red-500 border-2 placeholder-white"
                        : null
                    }`}
                    id='lastname'
                    name='lastname'
                    type='text'
                    placeholder='Segobia'
                  />
                  {errors.lastname && touched.lastname ? (
                    <Alert>{errors.lastname}</Alert>
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
                {empleado._id && (
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
                )}
                {/* vacunas */}
                {empleado._id && (
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
                )}
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
                  value={empleado.name ? "update employee" : "new employee"}
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
