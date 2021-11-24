import React from 'react'
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


function Navbar() {
    let token = localStorage.getItem("notesToken");
    if(token){
        var decoded = jwt_decode(token);
    }
    
    let navigate = useNavigate();
    let location = useLocation();

    const logout = ()=>{
        localStorage.removeItem("notesToken");
        navigate("/login");
    }

    return (
        <div className="navbar bg-white shadow py-3">
            <div className="container">
                <div className="navbar__content d-flex justify-content-between w-100">
                    <div>

                        <NavLink to="/" >
                            Notes
                        </NavLink>
                    </div>
                    <div className="navbar__right">
                        {
                            location.pathname === "/" ? <div>
                                <a href="ssd">hi {decoded ? decoded.first_name : ""}</a>
                                <NavLink to="/login" onClick={logout} className={({ isActive }) => (isActive ? 'activelink' : 'inactivelink')}>
                                    logout
                                </NavLink>
                            </div> :
                                <div>
                                    <NavLink to="/register" className={({ isActive }) => (isActive ? 'activelink' : 'inactivelink')}>
                                        Register
                                    </NavLink>
                                    <NavLink to="/login" className={({ isActive }) => (isActive ? 'activelink' : 'inactivelink')}>
                                        Login
                                    </NavLink>
                                </div>
                        }
                        {/* <div>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? 'activelink' : 'inactivelink')}>
                                Register
                            </NavLink>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'activelink' : 'inactivelink')}>
                                Login
                            </NavLink>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
