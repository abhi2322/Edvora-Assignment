import React from 'react'
import plusLogo from '../Assets/plusLogo.png'

function FavpokeCard(props) {
    const DeleteFavourite=()=>{

    }
    return (
        <div className="pokeSearchCard">
                <img className="imgPoke" src={props.url} alt="poekmon"></img>
                <div className="pokeSection">
                <p className="PokeName">{props.pokeName}</p>
                <button className="btnAddFav" onClick={DeleteFavourite}>
                <img  style={{width:"36px",height:"36px"}} src={plusLogo} alt="+"></img>
                </button>
                </div>
        </div>
    )
}

export default FavpokeCard
