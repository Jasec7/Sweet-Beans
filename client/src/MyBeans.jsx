import React from "react";
import BeanForm from "./BeanForm";
import BeanList from "./BeanList";
import { GiCoffeeBeans } from "react-icons/gi";

function MyBeans(){
    return(
        <div >
            <h1><GiCoffeeBeans className="bounce-icon"/>My Beans</h1>
            <BeanForm/>
            <BeanList/>
        </div>
    )

}

export default MyBeans;