import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";
import { useFormik } from 'formik';
import * as yup from 'yup'

function StoreForm(){
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Required").min(2).max(50),
        address: yup.string().required('Required').min(2).max(200),
        phone_number: yup.string().required('Phone number is required')
        .matches(/^[\d\-\+\(\)\s]{7,20}$/,"Phone number must be valid")
      });

    const formik = useFormik({
        initialValues: {
            name: "",
            address:"",
            phone_number:""
        },
        validationSchema: formSchema,
        onSubmit : (values) =>{
            fetch("http://localhost:5555/stores", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name:values.name,
                    address:values.address,
                    phone_number:values.phone_number
                })
            })
            .then((r) => r.json())
            .then(newStore => {
                setCurrentUser(prev => ({
                    ...prev,
                    stores:[...(prev.stores || []), newStore]
                }))
                formik.resetForm()
            })
        }
    })

    return(
        <div>
          <h4>New Store</h4>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name}
            
            <input
              type="text"
              name="address"
              placeholder="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address}

            <input
              type="text"
              name="phone_number"
              placeholder="phone number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number}

            <button type="submit">Add Store</button>
            </form>
        </div>
    )

}

export default StoreForm;