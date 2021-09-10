import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pokeDetalleAction } from '../redux/pokeDucks'

const DetallePoke = () => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        const fetchData = () => {
            dispatch(pokeDetalleAction())
        }
        fetchData()
    }, [dispatch])

    const pokemones = useSelector(store => store.pokemones.unPokemon)

    return pokemones ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemones.foto} className="img-fluid" width='30%'/>
                <div className="card-title text-capitalize"> <span className="fw-bold"> Nombre:</span> {pokemones.nombre}</div>
                <p className="card-text"><span className="fw-bold">Altura:</span> {pokemones.alto/10}mts | <span className="fw-bold">Peso:</span> {pokemones.peso}kgs</p>

            </div>
        </div>
    ) : null
}

export default DetallePoke
