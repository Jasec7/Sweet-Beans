import React from "react";
import BeanForm from "./BeanForm";
import BeanList from "./BeanList";

function MyBeans(){
    return(
        <div>
            <h1>My Beans</h1>
            <BeanForm/>
            <BeanList/>
        </div>
    )

}

export default MyBeans;