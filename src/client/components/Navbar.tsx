import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = (props) =>{
    return(
        <nav className="nav justify-content-center bg-light shadow p-3 mb-5 ">
            <NavLink className= "text-dark font-weight-bold mx-5" to='/'> Home</NavLink> {/* need to figure out bootstrap issue for here*/ }
            <NavLink className="text-dark font-weight-bold mx-5" to='/compose'> Compose</NavLink>
            <NavLink className="text-dark font-weight-bold mx-5" to='/contact'> Contact</NavLink>
        </nav>
 
    )
}

interface NavBarProps {}

export default NavBar;