import Alert from "@/components/Alert.component";
import LoaderComponent from "@/components/Loader.component";
import { Formik, Form, Field } from "formik";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Fade } from "react-awesome-reveal";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const submitForm = async (values: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login?username=${values.email}&password=${values.password}`;
      console.log(url);
      const res = await fetch(url);
      const user = await res.json();

      if (user.data.roles[0].name === "Administrator") {
        console.log("es admin");
        localStorage.setItem("ROLE", user.data.roles[0].name);
        router.push("/employees");
      } else {
        localStorage.setItem("ROLE", user.data.roles[0].name);
        router.push(`/employees/${user.data.id}`);
      }
      // csolorzano6029@gmail.com&password=1312706029
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='w-full min-h-[100vh] grid md:grid-cols-3 items-center overflow-hidden relative'>
      <LoaderComponent />
      <Fade direction='up' className='login-card absolute mx-auto'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-xl font-bold uppercase'>login</h1>
          <Formik
            validationSchema={loginSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { resetForm }) => {
              await submitForm(values);
              resetForm();
            }}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form className='w-full flex flex-col gap-8'>
                <div className='labelBox'>
                  <Field
                    type='email'
                    className='labelBox-text shadow-md placeholder-sky-200'
                    // className={`inputForm ${
                    //   errors.cedula
                    //     ? "border-red-400 border-2 placeholder-red-300"
                    //     : null
                    // }`}

                    id='email'
                    name='email'
                  />
                  <span className='labelBox-span'>email</span>
                  {errors.email && touched.email ? (
                    <Alert>{errors.email}</Alert>
                  ) : null}
                </div>
                <div className='labelBox'>
                  <Field
                    type='password'
                    className={`labelBox-text shadow-md ${
                      errors.password
                        ? "border-red-400 border-2 placeholder-red-300"
                        : null
                    }}`}
                    id='password'
                    name='password'
                    autoComplete='off'
                  />
                  <span className='labelBox-span'>password</span>
                  {errors.password && touched.password ? (
                    <Alert>{errors.password}</Alert>
                  ) : null}
                </div>
                <input type='submit' className='btn-login' />
              </Form>
            )}
          </Formik>
        </div>
      </Fade>
    </main>
  );
};

export default Login;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const url =
//     "https://51cd-200-24-153-246.sa.ngrok.io/vaccinationinventory/api/v1/employees";
//   const res = await fetch(url);
//   const autorization = await res.json();

//   return {
//     props: { autorization: autorization.data },
//   };
// };
