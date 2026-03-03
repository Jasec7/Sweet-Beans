import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";

function MyCoffees(){
    const { currentUser, setCurrentUser } = useContext(UserContext)
    return(
        <div className="coffee-card">
            {currentUser?.stores?.map((store) =>(
                <div key={store.id}>
                    <h3>{store.name}</h3>
                {store.coffees.length === 0 ? (
                    <p>No coffees in this store</p>
                ) : (
                    store.coffees.map(coffee => (
                    <div key={coffee.id}>
                        <p>{coffee.brand}</p>
                        <Link to={`/my-coffees/${coffee.id}`}>View Coffee</Link>
                    </div>
                    ))
                )}
                </div>
            ))}
        </div>
    )
}

export default MyCoffees;