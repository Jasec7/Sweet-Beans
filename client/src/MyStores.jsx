import React from "react";
import StoreForm from "./StoreForm";
import StoreList from "./StoreList";
import { FaStore } from "react-icons/fa";

function MyStores(){
    return(
        <div>
            <h1><FaStore className="bounce-icon" />My Stores</h1>
            <StoreForm/>
            <StoreList/>
        </div>
    )
}

export default MyStores;