import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";
import { useParams } from "react-router-dom"

function CoffeeDetails(){
    const { currentUser} = useContext(UserContext)
    const { id } = useParams()

    const coffee = currentUser?.stores?.flatMap(store => store.coffees)?.find(c => c.id === Number(id))

    if (!coffee) return <p>Coffee not found</p>
    return(
        <div className="detail">
            <p>{coffee.brand}</p>
            <p>{coffee.presentation}</p>
            <p>{coffee.price}</p>
        </div>
    )
}

export default CoffeeDetails;