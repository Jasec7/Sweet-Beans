import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";

function BeanList(){
    const {currentUser} = useContext(UserContext);

    return(
        <div className="card">
            {currentUser?.beans?.map(bean =>(
                <p key={bean.id}><b>{bean.roast} - {bean.origin}</b></p>
            )
            )}
        </div>
    )

}

export default BeanList;
