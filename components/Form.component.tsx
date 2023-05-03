import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useState, useEffect } from "react";
import Alert from "./Alert.component";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  empleado?: any;
}

const FormComponent = ({ empleado }: FormProps) => {
  console.log(empleado);
  const [vaccines, setVaccines] = useState<any>([]);
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

  const initialValuesForm = {
    email: empleado?.username ?? "",
    dni: empleado?.dni ?? "",
    firstName: empleado?.firstName ?? "",
    lastName: empleado?.lastName ?? "",
    mobilePhone: empleado?.mobilePhone ?? "",
    birthDate: empleado?.birthDate ?? "1997-10-20",
    homeAddress: empleado?.homeAddress ?? "",
    vaccinationStatus: empleado?.vaccinationStatus ?? false,
    vaccineId: "",
    doseNumber: empleado?.doseNumber ?? 1,
    vaccinationDate: "",
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/vaccines`)
      .then((response) => response.json())
      .then((data) => setVaccines(data))
      .catch((error) => console.error(error));
  }, []);

  const submitForm = async (valores: any) => {
    if (empleado.dni) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/update?dni=${empleado.dni}&role=Administrator`;
      const vaccineUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employeeVaccinations/create`;

      try {
        const createVaccine = {
          vaccineId: +valores.vaccineId,
          employeeId: empleado.id,
          doseNumber: valores.doseNumber,
          vaccinationDate: valores.vaccinationDate,
        };

        await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...valores }),
        });

        if (empleado.vaccines.length === 0) {
          await fetch(vaccineUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...createVaccine }),
          });
        } else {
          const vaccineUrlUpdate = `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/v1/employeeVaccinations/update?employeeVaccinationId=${+valores.vaccineId}`;

          await fetch(vaccineUrlUpdate, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...createVaccine }),
          });
        }
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
          initialValues={initialValuesForm}
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
                        min='1940-01-01'
                        max='2005-12-01'
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
                        defaultChecked={vacuna}
                      />
                    </div>

                    <div>
                      <label className={`label`} htmlFor='homeAddress'>
                        Vaccine
                      </label>

                      <Field
                        className={`inputForm`}
                        name='vaccineId'
                        as='select'
                      >
                        <option value=''>Select an option</option>
                        {vaccines?.data?.map((option: any) => (
                          <option key={option.vaccineType} value={option.id}>
                            {option.vaccineType}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div>
                      <label className={`label`} htmlFor='homeAddress'>
                        Doses applied
                      </label>

                      <Field
                        className={`inputForm`}
                        name='doseNumber'
                        type='number'
                        defaultValue={empleado?.doseNumber}
                        min='1'
                        max='4'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label
                        className={`label mr-5 mb-0`}
                        htmlFor='vaccinationDate'
                      >
                        Date of application
                      </label>
                      <Field
                        className={`inputForm `}
                        id='vaccinationDate'
                        name='vaccinationDate'
                        type='date'
                        value={empleado?.vaccinationDate}
                      />
                    </div>
                  </>
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
