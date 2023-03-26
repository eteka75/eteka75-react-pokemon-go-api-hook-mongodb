import {useState,useEffect} from "react";
import Pokemon from "../models/pockemon";
import PokemonService from "../services/pokemon-service";

const usePokemon = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    useEffect(() => {
        PokemonService.getPokemons().then(pokemons=>setPokemons(pokemons));
    }, []);
    return pokemons;
}

export default usePokemon;
