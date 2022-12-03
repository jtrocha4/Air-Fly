import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>

                    <span className='navbar-brand mb-0 h1'><i className='bi bi-airplane-engines'> Fly Air</i></span>

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#firstNavbar'>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className='collapse navbar-collapse' id='firstNavbar'>
                        <ul className='navbar-nav'>
                            <Link to='/avion' className='nav-link'><li className='nav-item'>Avion</li></Link>
                            <Link to='/empleado' className='nav-link'><li className='nav-item'>Empleado</li></Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar