import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cerrarSesionAction } from '../redux/usuarioDucks'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'


const Navbar = (props) => {
    const dispatch = useDispatch()

    const cerrarSesion = () => {
        dispatch(cerrarSesionAction())
        props.history.push('/login')
    }

    const activo = useSelector(store => store.usuario.activo)



    return (
        <div className="navbar navbar-dark bg-dark container">
            <Link className="navbar-brand ml-5" to="/">APP Pokemon</Link>
            <div className="d-flex">
                {
                    activo ? (
                        <>
                        <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                        <NavLink className="btn btn-dark mr-2" to="/perfil" exact>Perfil</NavLink>
                        <button className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>Cerrar sesion</button>
                        </>
                    ) : (
                        <NavLink className="btn btn-dark mr-2" to="/login">Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar) 
