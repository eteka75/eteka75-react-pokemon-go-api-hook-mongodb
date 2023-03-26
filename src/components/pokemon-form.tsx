import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pockemon";
import formatType from "../helpers/format-type";
import { useHistory } from 'react-router-dom';
import PokemonService from './../services/pokemon-service';

type Props = {
  pokemon: Pokemon;
};
type Fielde = {
    any:Field
};
type Field = {
    value: any,
    error?: string,
   isValide?:boolean,
}
type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types:Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValide: true },
        hp: { value: pokemon.hp, isValide: true },
        cp: { value: pokemon.cp, isValide: true },
        types: { value: pokemon.types, isValide: true },
    });
    const history = useHistory();
  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

    const hasType=(type: string): boolean=>{
        return form.types.value.includes(type);
    }
    const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field={
            [fieldName]: { value: fieldValue },
            value: undefined
        };
        console.log(fieldName,fieldValue,newField,form);
        setForm({ ...form, ...newField });
    }
    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>):void => {
        const checked = e.target.checked;
        let newField: Field;
        if (checked) {
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        } else {
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType != type);
            newField = { value: newTypes };
        }
        setForm({ ...form, ...{ types: newField }});
    }

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const isValideForm = validateForm();
        console.log(form);
        if (isValideForm) {
             pokemon.name = form.name.value;
             pokemon.hp = form.hp.value;
             pokemon.cp = form.cp.value;
             pokemon.types = form.types.value;
             PokemonService.updatePokemon(pokemon).then(() =>
               history.push(`/pokemon/${pokemon.id}`)
             ); 
        }
    }
    const validateForm = () => {
        let newForm: Form = form;
        
      /*Validation de name (nom du Pokémon) */
      if (!/^[a-zA-Zéèà]{3,25}$/.test(form.name.value)) {
        const errorMsg: string =
          "Le nom du pokémon est requis (3-25 caractères)";
        const newField: Field = {
          value: form.name.value,
          error: errorMsg,
          isValide: false,
        };
        newForm = { ...newForm, ...{ name: newField } };
      } else {
        const newField: Field = {
          value: form.name.value,
          error: "",
          isValide: true,
        };
        newForm = { ...newForm, ...{ name: newField } };
        }
        
      /*Validation de hp */
      if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
        const errorMsg: string =
          "Les points de vie du Pokémon sont compris en 0 et 999";
        const newField: Field = {
          value: form.hp.value,
          error: errorMsg,
          isValide: false,
        };
        newForm = { ...newForm, ...{ hp: newField } };
      } else {
        const newField: Field = {
          value: form.hp.value,
          error: "",
          isValide: true,
        };
        newForm = { ...newForm, ...{ hp: newField } };
      }
      /*Validation de cp */
      if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
        const errorMsg: string =
          "Les dégâts du Pokémon sont compris en 0 et 99";
        const newField: Field = {
          value: form.cp.value,
          error: errorMsg,
          isValide: false,
        };
        newForm = { ...newForm, ...{ cp: newField } };
      } else {
        const newField: Field = {
          value: form.hp.value,
          error: "",
          isValide: true,
        };
        newForm = { ...newForm, ...{ cp: newField } };
        }
        setForm(newForm);
        return newForm.name.isValide && newForm.hp.isValide && newForm.cp.isValide;
    }

    const isTypesValide = (type:string):boolean => {
        if (form.types.value.length===1 && hasType(type)) {
            return false;
        }

        if ((form.types.value.length == 3 && !hasType(type))) {
            return false;
        }
        return true;
    }
    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon).then(()=>history.push(`/pokemons`));
    }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "250px", margin: "0 auto" }}
              />
              <span className=" btn btn-floating halfway-fab waves-effects waves-light ">
                <i onClick={deletePokemon} className="material-icons">
                  delete
                </i>
              </span>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name.value}
                    onChange={(e) => HandleInputChange(e)}
                  ></input>
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    type="number"
                    name="hp"
                    value={form.hp.value}
                    onChange={(e) => HandleInputChange(e)}
                    className="form-control"
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    type="number"
                    name="cp"
                    value={form.cp.value}
                    onChange={(e) => HandleInputChange(e)}
                    className="form-control"
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          disabled={!isTypesValide(type)}
                          checked={hasType(type)}
                          name="type"
                          onChange={(e) => selectType(type, e)}
                          id={type}
                          type="checkbox"
                          className="filled-in"
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
