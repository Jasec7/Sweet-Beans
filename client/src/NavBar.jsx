import { NavLink } from "react-router-dom";

function NavBar(){
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
            
        </nav>
    )
};

export default NavBar;