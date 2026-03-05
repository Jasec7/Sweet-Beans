import React, {useContext, useState} from "react";
import { UserContext } from "./context/UserContext";
import { useParams } from "react-router-dom"
import { useFormik } from "formik";

function CoffeeDetails(){
    const { currentUser, setCurrentUser} = useContext(UserContext)
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    const coffee = currentUser?.stores?.flatMap(store => store.coffees)?.find(c => c.id === Number(id))

    if (!coffee) return <p>Coffee not found</p>

    const formik = useFormik({
        initialValues:{
            brand:coffee.brand,
            presentation:coffee.presentation,
            price:coffee.price
        },
        onSubmit:(values) =>{
            fetch(`http://localhost:5555/coffees/${coffee.id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)
            })
            .then(r => r.json())
            .then((updatedCoffee) => {
                setCurrentUser(prev => ({
                    ...prev,
                    stores: prev.stores.map(store => ({
                        ...store,
                        coffees: store.coffees.map(coffee =>
                            coffee.id === updatedCoffee.id ? updatedCoffee : coffee
                        )
                    }))
                }))
                setIsEdit(false)
            });
        }
    });
    

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this coffee?")) return;
        fetch(` http://localhost:5555/coffees/${id}`,{
            method:"DELETE"
        }).then((r) => {
            if(r.ok){
                setCurrentUser(prev =>({
                    ...prev,
                    stores:prev.stores.map(store =>({
                        ...store,
                        coffees:store.coffees.filter(co => co.id !== id)
                    }))
                }))
                navigate("/my-coffees")
            }
        })
    }
    return(
       <div className="detail">
         {isEdit ? (
        <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="brand"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <select
          name="presentation"
          value={formik.values.presentation}
          onChange={formik.handleChange}
        >
          <option value="">Select Presentation</option>
          <option value="Ground">Ground</option>
          <option value="Whole Bean">Whole Bean</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEdit(false)}>Cancel</button>
      </form>
    ) : (
      <>
        <p>{coffee.brand}</p>
        <p>{coffee.presentation}</p>
        <p>{coffee.price}</p>

        <button onClick={() => setIsEdit(true)}>Edit</button>
        <button onClick={() => handleDelete(coffee.id)}>Delete</button>
      </>
    )}
  </div>
    )
    
}

export default CoffeeDetails;