import { Field, Form, Formik } from "formik";
import { BiX } from "react-icons/bi";

import * as Yup from "yup";
interface SearchComponentProps {
  showsearch: boolean;
  setEmployees: (employees: any) => void;
  setShowSearch: (showsearch: boolean) => void;
}
function SearchComponent({
  showsearch,
  setEmployees,
  setShowSearch,
}: SearchComponentProps) {
  const submitSearch = async (values: any) => {
    console.log(values);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/filter`;

    const searchFilter: any = {
      isVaccinated: values.hasVaccination,
    };

    try {
      const filtered = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchFilter),
      });
      const { data } = await filtered.json();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`transition-all duration-500 z-40 ease-in-out fixed left-0 backdrop-blur-lg overflow-hidden  ${
        showsearch === true
          ? "min-h-min rounded-lg top-16 w-1/2 md:w-1/3 ml-14  border-2 border-slate-500 shadow-lg"
          : "w-0 h-0 top-32 rounded-full -translate-x-1/2 bg-transparent opacity-0"
      } `}
    >
      <button
        onClick={() => {
          setShowSearch(false);
        }}
        className={`absolute right-3 top-1 nav_small w-10 h-6 ${
          showsearch && "bg-red-700/50 text-slate-200 hover:bg-red-700"
        }`}
      >
        <BiX className='max-w-[30px] font-bold' />
      </button>
      <Formik
        initialValues={{
          hasVaccination: false,
        }}
        onSubmit={async (values) => {
          await submitSearch(values);
        }}
      >
        {({ values }) => (
          <Form className='formBx md:bg-transparent shadow-none'>
            <div className='flex flex-col gap-4'>
              <h2 className='heading'>Search</h2>

              <div className='flex items-center justify-evenly'>
                <label className={`label`} htmlFor='hasVaccination'>
                  Has Vaccination
                </label>
                <Field
                  type='checkbox'
                  id='hasVaccination'
                  name='hasVaccination'
                  defaultValue={values.hasVaccination}
                />
              </div>
              <input className='btnForm' type='submit' value={"search"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchComponent;
