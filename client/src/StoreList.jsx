import React, {useContext} from "react";
import { UserContext } from "./context/UserContext";

function StoreList(){
    const {currentUser} = useContext(UserContext);

    return(
        <div>
            {currentUser?.stores?.map(store =>(
                <div key={store.id}>
                    <p>{store.name}</p>
                    <p>{store.address}</p>
                    <p>{store.phone_number}</p>
                </div>
                )
            )}
        </div>
    )
}

export default StoreList;