import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "./context/UserContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'

function CoffeeForm(){
const { currentUser, setCurrentUser } = useContext(UserContext)
const navigate = useNavigate();

/*
useEffect(() => {
    fetch("http://localhost:5555/stores" )
    .then((r) => r.json())
    .then(stores => {setStores(stores)
    console.log(stores)})
},[])*/

/*
useEffect(() => {
    fetch("http://localhost:5555/beans")
    .then((r) => r.json())
    .then(beans => {setBeans(beans)
    console.log(beans)})
},[])*/

const formSchema = yup.object().shape({
    brand: yup.string().required("Must enter a brand").min(2).max(50),
    presentation: yup.string().required('Required').oneOf(['Ground','Whole Bean']),
    price:yup.number().required('Price is required'),
    store_id:yup
    .number()
    .typeError("Picked a store")
    .required("Picked a store"),
    bean_id: yup
    .number()
    .typeError("Picked a bean")
    .required("Pick a bean"),
  });

const formik = useFormik({
    initialValues: {
      brand: "",
      presentation: "",
      price:"",
      store_id:"",
      bean_id:""
    },
    validationSchema: formSchema,
    onSubmit:(values) =>{
        console.log('Submitting:', values)
        fetch("http://localhost:5555/coffees", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                brand:values.brand,
                presentation:values.presentation,
                price:Number(values.price),
                user_id: currentUser.id,
                store_id:Number(values.store_id),
                bean_id:Number(values.bean_id)
            })
        })
        .then((r) => { console.log("status:", r.status); return r.json();})
        .then(newCoffee =>{
            setCurrentUser(prev => {
                const existingStore = prev.stores.find(s => s.id === newCoffee.store_id

                );
                let updatedStores
                if (existingStore) {
                    updatedStores = prev.stores.map(store =>
                        store.id === newCoffee.store_id
                        ? { ...store, coffees: [...store.coffees, newCoffee] }
                        : store
                    )
                } else {
                    const storeInfo = prev.stores.find(s => s.id === newCoffee.store_id)
                    updatedStores = [
                        ...prev.stores,
                        { ...storeInfo, coffees: [newCoffee] }
                    ]
                }
                const existingBean = prev.beans.find(
                    b => b.id === newCoffee.bean_id)
                    let updatedBeans
                    if (existingBean) {
                        updatedBeans = prev.beans.map(bean =>
                            bean.id === newCoffee.bean_id
                            ? { ...bean, coffees: [...bean.coffees, newCoffee] }
                            : bean
                        )
                    } else {
                        const beanInfo = prev.beans.find(b => b.id === newCoffee.bean_id)
                        updatedBeans = [
                            ...prev.beans,
                            { ...beanInfo, coffees: [newCoffee] }
                        ]
                    }
                    return {
                        ...prev,
                        stores: updatedStores,
                        beans: updatedBeans
                    }
                })
                navigate("/my-coffees")
            })
    }
})

    
    
return(
    <div>
      <h4>New Coffee</h4>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.brand && formik.errors.brand}

        <select
        name="presentation"
        value={formik.values.presentation}
        onChange={formik.handleChange}
        >
        <option value="">Select Presentation</option>
        <option value="Ground">Ground</option>
        <option value="Whole Bean">Whole Bean</option>
        </select>
        {formik.touched.presentation && formik.errors.presentation}

        <input
          type="number"
          name="price"
          placeholder="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.price && formik.errors.price}

        <select
        name="store_id"
        value={formik.values.store_id}
        onChange={formik.handleChange}
        >
          <option value="">Select store</option>
          {currentUser?.stores?.map(s => (
            <option key={s.id} value={s.id}>
              Store {s.name}
            </option>
          ))}
          </select>
          
        <select
        name="bean_id"
        value={formik.values.bean_id}
        onChange={formik.handleChange}
        >
            <option value="">Select Bean</option>
            {currentUser?.beans?.map(bean => (
                <option key={bean.id} value={bean.id}>
                    {bean.roast} - {bean.origin}
                </option>
            ))}
            </select>
        <button type="submit">Add Coffee</button>
      </form>
    </div>
  );
}


export default CoffeeForm;