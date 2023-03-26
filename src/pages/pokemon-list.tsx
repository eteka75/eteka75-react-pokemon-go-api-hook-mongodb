import React from "react";
import PokemonCard from "../components/pokemon-card";
import usePokemon from "../hooks/pokemon.hooks";

const PokemonList: React.FC = (pokemon) => {
    const pokemons = usePokemon();
    
    return (
        <div className="container">
            <div className="row">
                <div className="col m12 center">
                        <h1>Pokédex.</h1>
                        Il y a {pokemons.length} Pokémons dans notre application.
                            
                            <p></p>
                    </div>
                    {pokemons.map(p => (
                        <PokemonCard key={p.id} pokemon={p} borderColor="red" />
                            ))
                    }
                </div>
        </div>
    )
}

export default PokemonList;