import axios from 'axios'

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous:null,
    results:[]   
}

let i = 0;


// Types
const GET_POKEMONES_EXITO = 'GET_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const PREVIOUS_POKEMONES_EXITO = 'PREVIOUS_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

// reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case GET_POKEMONES_EXITO: 
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case PREVIOUS_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state
    }
}

// actions
export const obtenerPokemonesAction = () => async(dispatch) =>{

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)       
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (e) {
        console.log(e)
    }
}


export const siguientePokemonAction = () => async(dispatch, getState) =>{

    i++;
    const next = getState().pokemones.next;

    if(localStorage.getItem(`offset=${i}`)){
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(`offset=${i}`))
        })
        return
    }

    try {
        const res = await axios.get(next);

        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(`offset=${i}`, JSON.stringify(res.data))

    } catch (e) {
        console.log(e)
    }
}

export const anteriorPokemonAction = () => async(dispatch, getState) =>{
 
    i--;
    const previous = getState().pokemones.previous;

    if(localStorage.getItem(`offset=${i}`)){
        dispatch({
            type: PREVIOUS_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(`offset=${i}`))
        })
        return
    }

    try {
        const res = await axios.get(previous);

        dispatch({
            type: PREVIOUS_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(`offset=${i}`, JSON.stringify(res.data))

    } catch (e) {
        console.log(e)
    }
}

export const pokeDetalleAction = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch, getState) =>{

    if(localStorage.getItem(url)){

        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })

        return
    }

    try {
        const res = await axios.get(url)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                peso: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default
            }
        })

        localStorage.setItem(url,JSON.stringify({
            nombre: res.data.name,
            peso: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))
        
    } catch (e) {
        console.log(e)
    }
}