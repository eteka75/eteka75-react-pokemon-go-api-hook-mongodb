import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col center m12">
          <img
            src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
            alt="Page non trouvée"
          />
          <h1>Hey, cette page n'existe pas !</h1>
          <Link to="/" className="waves-effect waves-teal btn-flat">
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
