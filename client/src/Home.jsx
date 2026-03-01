import { useContext } from "react"
import { UserContext } from "./context/UserContext"
import { useFormik } from 'formik';
import * as yup from 'yup'

function Home() {
const { currentUser, setCurrentUser } = useContext(UserContext)


const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").min(2).max(50),
    password: yup.string().required("A password is required").min(8),
  });

const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://localhost:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          setCurrentUser(data)
        })
    },
  })
    

  return (
    <div>
      <h1>Welcome to Sweet Beans ☕</h1>

      {currentUser ? (
        <p>Hello, {currentUser.name}</p>
      ) : (
        <div>
        <p>Please sign up</p>
        <form onSubmit={formik.handleSubmit}>
          <input 
            type='text' 
            name='name' 
            placeholder='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name}
             <input 
            type='password' 
            name='password' 
            placeholder='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password}
            <button type='submit'>Create user</button>
            </form>
        </div>
      )}
    </div>
  )
}

export default Home