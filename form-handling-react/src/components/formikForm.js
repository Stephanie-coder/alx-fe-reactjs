import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormikForm() {
  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // ✅ Initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // ✅ Submit handler
  const handleSubmit = (values) => {
    console.log("Form data:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col gap-4 max-w-sm mx-auto">
          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 rounded"
          />
          <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />

          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded"
          />
          <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;

