import React, {Component} from "react";
import './RenderOnePokemon.css';

export default class RenderOnePokemon extends Component{

    constructor(props) {
        super(props);
        let pokemonObject = this.props.pokemon;
        this.state = {
            pokemon : (pokemonObject !== undefined) ? pokemonObject : null
        };
    }

    render(){
        const { pokemon } = this.state;
        return (
            <div className="render-one-pokemon-container">
                {pokemon !== null ? (
                    <div>
                        {pokemon.name}
                    </div>
                ) : (
                    <div>
                        rien de rien ...
                    </div>
                )}
            </div>
        );
    }
}