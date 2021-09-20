import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cerrarSesionAction } from '../redux/usuarioDucks'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'


const Navbar = (props) => {
    const dispatch = useDispatch()

    const cerrarSesion = () => {
        dispatch(cerrarSesionAction())
        props.history.push('/login')
    }



    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP Pokemon</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                <NavLink className="btn btn-dark mr-2" to="/login">Login</NavLink>
                <button className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>Cerrar sesion</button>
            </div>
        </div>
    )
}

export default withRouter(Navbar) 
