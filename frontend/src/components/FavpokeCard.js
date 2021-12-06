import React from 'react'
import minusLogo from '../Assets/minusLogo.png'

function FavpokeCard(props) {
    const DeleteFavourite=()=>{
            props.removePoke(props.id)
    }
    return (
        <div className="pokeSearchCard">
                <img className="imgPoke" src={props.url} alt="poekmon"></img>
                <div className="pokeSection">
                <p className="PokeName">{props.pokeName}</p>
                <button className="btnRemoveFav" onClick={DeleteFavourite}>
                <img  style={{width:"60px",height:"60px"}} src={minusLogo} alt="+"></img>
                </button>
                </div>
        </div>
    )
}

export default FavpokeCard
