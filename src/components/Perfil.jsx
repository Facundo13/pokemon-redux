import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actualizarUsuarioAction, editarFotoAction } from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
    const [activarForm, setActivarForm] = React.useState(false);
    const [activarFormImg, setActivarFormImg] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch()

    const actualizarUser = () => {
        if (!nombreUsuario.trim()) {
            console.log("nombre vacio");
            return
        }
        dispatch(actualizarUsuarioAction(nombreUsuario))
        setActivarForm(false)
    }

    const seleccionarArchivo = imagen => {
        console.log(imagen.target.files[0])
        const imagenCliente = imagen.target.files[0]
        if (imagenCliente === undefined){
            console.log("no se selecciono img");
            return
        }
        if (imagenCliente.type === "image/png" || imagenCliente.type === "imagen/jpg" || imagenCliente.type === "imagen/jpeg"){
            dispatch(editarFotoAction(imagenCliente))
            setError(false)
            setActivarFormImg(false)
        }else{
            setError(true)
        }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="Foto usuario" width="100px" className="img-fluid" />
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button className="btn btn-dark" onClick={() => setActivarForm(true)}>Editar nombre</button>
                    {
                        error &&
                        <div className="alert alert-warning mt-3">
                            Solo se permiten archivos JPG/PNG
                        </div>
                    }
                    <div className="custom-file">
                        <button className={loading ? "btn btn-dark mt-3 disabled" : "btn btn-dark mt-3"} onClick={() => setActivarFormImg(true)}>Modificar imagen</button>
                    </div>
                    {
                        activarFormImg && 
                        <input type="file" className={loading ? "custom-file-input mt-3 d-none" : "custom-file-input mt-3"} onChange={e => seleccionarArchivo(e)}/>
                    }

                </div>
                {
                    loading &&
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                            </div>
                        </div>
                    </div>
                }
                {
                    activarForm && (
                        <form action="">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-5">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />
                                            <div className="input-group-append">
                                                <button className="btn btn-dark" type="submit" onClick={() => actualizarUser()}>Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default Perfil
