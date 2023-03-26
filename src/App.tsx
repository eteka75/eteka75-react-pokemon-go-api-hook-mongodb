import React from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import NotFound from "./pages/not-found";
import PokemonEdit from './pages/pokemon-edit';
    const App: React.FC = () => {
    
        return (
            <div>
                {/*Système de navigation*/}
                <BrowserRouter>
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>
                </nav>
                {/*Le système de gestion des Routes de l'application */}
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemons" component={PokemonList} />
                    <Route  path="/pokemon/edit/:id" component={PokemonEdit} />
                    <Route  path="/pokemon/:id" component={PokemonsDetail} />
                    <Route   component={NotFound} />
                </Switch>
                </BrowserRouter>
        </div>
    );
    }
  
export default App;