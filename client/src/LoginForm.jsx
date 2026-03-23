import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom"

function LoginForm(){
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
          name: "",
          password: "",
        },
        onSubmit:(values) => {
            fetch("http://localhost:5555/login", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify(values),
            })
            .then((r) => r.json())
            .then((user) =>{
                setCurrentUser(user);
                navigate("/my-coffees")
            })
        }
})

    return(
        <div>
            <h4>Login</h4>
            <form onSubmit={formik.handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                />
                <input
                type="password"
                name="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                />
                <button type="submit">Login</button>
                </form>
        </div>
    )

}
export default LoginForm;