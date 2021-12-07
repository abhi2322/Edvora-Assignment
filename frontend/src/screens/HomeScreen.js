import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorBox from '../components/ErrorBox';
import plusLogo from '../Assets/plusLogo.png';
import FavpokeCard from '../components/FavpokeCard';
import NavBar from '../components/NavBar';
import{useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function HomeScreen() {
    const [favPokemon,setFavPokemon]=useState([]);
    const [user,setUser]=useState();
    const[poke,setPoke]=useState("");
    const[error,setError]=useState("");
    const[pokeVal,setPokeVal]=useState({pokeName:"",url:"",id:""});
    const params=useParams()
    const userName =params.id;
    const navigate = useNavigate();
    //fetching pokemon
    const handleSearch=async()=>{
        try{
            const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
            const imageUrl = response.data.sprites.front_default;
            setPokeVal({...pokeVal,pokeName:response.data.name.toUpperCase(),url:imageUrl,id:response.data.id})
            setError("")
        }catch(err){
            setError("pokemon not found")
        }
    }

   const handleCheck=(val)=>{
        return  favPokemon.some(item => val === item.id);
       }

    //Adding pokemon to favourite list
    const addToFavourite=async()=>{
        if(handleCheck(pokeVal.id)){
            setError('Already in Favourite List')
            return;
        }
        try{
            const payload={data:pokeVal,email:user.email,token:user.token}
            const response=await axios.post('/api/update',payload)
            if(response.status===200){
             setFavPokemon(favPokemon => [...favPokemon, pokeVal]);
            }
        }catch(err){
            setError("Please login again")
        }
    }

    //removing pokemon from favourite List
    const removeFromFavourite=async(id)=>{
        console.log(id)
        try{
            const data=favPokemon.find((pokemon,index)=>{
                if(pokemon.id===id){
                    return true;
                }
                return false;
            })
            const payload={data:data,email:user.email,token:user.token}
            const response=await axios.post('/api/removeFavpokemon',payload)
            if(response.status===200){
             setFavPokemon(favPokemon.filter((poke)=>{
                 return poke.id!==id;
             }));
            }
        }catch(err){
            setError("Please login again")
        }
    }
     useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
          axios.post('/api/fetchFavPokemon',{email:foundUser.email,token:foundUser.token})
          .then((response)=>{
            setFavPokemon(favPokemon => [...favPokemon, ...response.data]);
          })
          .catch((err)=>console.log(err))
        }
        else{
            navigate('/')
        }
        
      },[navigate]);
    return (
        <div>
            <NavBar userName={userName}></NavBar>
            <div className="wrapper">
                <div className="label">FIND YOUR FAVOURITE POKEMON</div>
                <div className="searchBar">
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value={poke} onChange={(e)=>{setPoke(e.target.value.toLowerCase()); setError("")}} />
                    <button id="searchQuerySubmit" name="searchQuerySubmit" onClick={handleSearch}>
                        
                        <svg style={{width:"24px",height:"24px"}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {error!==""?<ErrorBox errorMessage={error}></ErrorBox>:null}
            {pokeVal.pokeName!==""?
            <div className="pokeSearchCard">
                <img className="imgPoke" src={pokeVal.url} alt="poekmon"></img>
                <div className="pokeSection">
                <p className="PokeName">{pokeVal.pokeName}</p>
                <button className="btnAddFav" onClick={addToFavourite}>
                <img  style={{width:"36px",height:"36px"}} src={plusLogo} alt="+"></img>
                </button>
                </div>
            </div>:null}

            <h2 className="subHeading">Favourite Pokemon</h2>
            <div className="FavColumn">
                {favPokemon.length!==0?favPokemon.map((pokemon)=>{
                    return(
                        <FavpokeCard
                            pokeName={pokemon.pokeName}
                            url={pokemon.url}
                            key={pokemon.id}
                            id={pokemon.id}
                            removePoke={(id)=>{removeFromFavourite(id)}}
                        />
                    )
                }):null}
            </div>
        </div>
    )
};

export default HomeScreen;

