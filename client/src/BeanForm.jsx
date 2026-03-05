import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";
import { useFormik } from 'formik';
import * as yup from 'yup'

function BeanForm(){
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const formSchema = yup.object().shape({
        roast: yup.string().required("Required").oneOf(['light','medium','dark']),
        origin: yup.string().required('Required').min(2).max(100),
      });

    const formik = useFormik({
        initialValues: {
            roast: "",
            origin:""
        },
        validationSchema: formSchema,
        onSubmit : (values) =>{
            fetch("http://localhost:5555/beans", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    roast:values.roast,
                    origin:values.origin
                })
            })
            .then((r) => r.json())
            .then(newBean => {
                setCurrentUser(prev => ({
                    ...prev,
                    beans:[...(prev.beans || []), newBean]
                }))
                formik.resetForm()
            })
        }
    })

    return(
        <div>
          <h4>New Bean</h4>
          <form onSubmit={formik.handleSubmit}>
            <select
            name="roast"
            value={formik.values.roast}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            >
            <option value="">Select Roast</option>
            <option value="light">light</option>
            <option value="medium">medium</option>
            <option value="dark">dark</option>
            </select>
            {formik.touched.roast && formik.errors.roast}
            
            <input
              type="text"
              name="origin"
              placeholder="origin"
              value={formik.values.origin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.origin && formik.errors.origin}
            <button type="submit">Add Bean</button>
            </form>
        </div>
    )

}

export default BeanForm;