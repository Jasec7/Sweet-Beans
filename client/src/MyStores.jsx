import React from "react";
import StoreForm from "./StoreForm";
import StoreList from "./StoreList";

function MyStores(){
    return(
        <div>
            <h1>My Stores</h1>
            <StoreForm/>
            <StoreList/>
        </div>
    )
}

export default MyStores;