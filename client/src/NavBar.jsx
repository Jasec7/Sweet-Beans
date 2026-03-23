import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function NavBar(){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        fetch("http://localhost:5555/logout", {
            method:"DELETE",
            credentials:"include"
        }).then(() => {
            setCurrentUser(null);
            navigate("/");
        });
  }

    return(
        <nav>
            <NavLink
            to='/'
            className='nav-link'
            >
                Home
            </NavLink>

            <NavLink
            to='/coffee-form'
            className='nav-link'
            >
                Add Coffee
            </NavLink>

            <NavLink
            to='/my-coffees'
            className='nav-link'
            >
                My Coffees
            </NavLink>

            <NavLink
            to='/my-beans'
            className='nav-link'
            >
                My Beans
            </NavLink>
            
            <NavLink
            to='/my-stores'
            className='nav-link'
            >
                My Stores 
            </NavLink>

            {currentUser && (
                <button onClick={handleLogout}>Logout</button>
            )}
            
        </nav>
    )
};

export default NavBar;