import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAction, siguientePokemonAction, anteriorPokemonAction,pokeDetalleAction } from '../redux/pokeDucks'
import DetallePoke from './DetallePoke'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPokemonesAction())
        }
        fetchData()
    }, [dispatch])

    return (
        <div className="row">
            <div className="col-md 6">
                <h3>Lista Pokemones</h3>

                <br />

                <div className="d-flex justify-content-between align-items-center">

                    {
                        next &&
                        <button className="btn btn-dark" onClick={() => dispatch(siguientePokemonAction())}>Siguiente</button>
                    }

                    {
                        previous &&
                        <button className="btn btn-dark" onClick={() => dispatch(anteriorPokemonAction())}>Anterior</button>

                    }
                </div>

                <ul className="list-group mt-3 ">
                    {
                        pokemones.map(item => (
                            <li key={item.name} className="list-group-item text-capitalize">{item.name}
                            <button className="btn btn-dark btn-sm float-end" onClick={() => dispatch(pokeDetalleAction(item.url))}>Info</button></li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md 6">
                <h3>Detalle pokemon</h3>
                <DetallePoke/>
            </div>
        </div>
    )
}

export default Pokemones
