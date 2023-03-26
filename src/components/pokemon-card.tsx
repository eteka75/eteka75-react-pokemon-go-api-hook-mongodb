import React,{useState} from 'react';
import Pokemon from '../models/pockemon';
import "./pokemon-card.css"
import formateType from '../helpers/format-type';
import formatDate from '../helpers/format-date';
import { useHistory } from "react-router-dom";

type Props = {
    pokemon: Pokemon,
    borderColor?:String
}

const PokemonCard: React.FC<Props> = ({ pokemon, borderColor="#009688"}) => {
    const [color, SetColor] = useState<String>('');
    const history = useHistory();

    const goToPokemon=(id: number):void => {
        history.push(`/pokemon/${id}`)
    }
    const showBorder = () => {
        SetColor(borderColor)
    }
    const  hidBorder = ()=> {
        SetColor('#f5f5f5')
    }

    
    return (
        <div className="col s6 m4" key={pokemon.id}>
        <div className="card horizontal" onClick={()=>goToPokemon(pokemon.id)} style={{borderColor:borderColor}} onMouseEnter={showBorder} onMouseLeave={hidBorder} >
            <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} />
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <p>{pokemon.name}</p>
                    <p><small>{formatDate(pokemon.created)}</small></p>
                        {pokemon.types.map(t => (
                         <span className={formateType(t)}>{t}</span>
                        ))}
                </div>
            </div>
        </div>
        </div>
    );  
}
export default PokemonCard;