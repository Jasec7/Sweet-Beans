import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";

function BeanList(){
    const {currentUser} = useContext(UserContext);

    return(
        <div>
            {currentUser?.beans?.map(bean =>(
                <p key={bean.id}>{bean.roast} - {bean.origin}</p>
            )
            )}
        </div>
    )

}

export default BeanList;
