import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorBox from '../components/ErrorBox';

function HomeScreen() {
    const data= JSON.parse(localStorage.getItem('user'));
    const [favPokemon,setFavPokemon]=useState([]);
    const [user,setUser]=useState();
    const[poke,setPoke]=useState("");
    const[error,setError]=useState("");
    const[pokeVal,setPokeVal]=useState();
    const handleSearch=async()=>{
        try{
            const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
            console.log(response.data)
            const imageUrl = response.data.sprites.front_default;
            setPokeVal(imageUrl)
            setError("")
        }catch(err){
            setError("pokemon not found")
        }

    }
   // const pokemonIndex = url.split('/')[url.split('/').length - 2];
    //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
    //const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);
    return (
        <div>
            <input type="text" value={poke} onChange={e=>setPoke(e.target.value)}></input>
            <button onClick={handleSearch}>Submit</button>
            <img src={pokeVal} alt="poekmon"></img>
            {error!==""?<ErrorBox errorMessage={error}></ErrorBox>:null}
        </div>
    )
};

export default HomeScreen;

