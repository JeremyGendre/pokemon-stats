import React, {Component} from "react";
import _ from 'lodash';
import axios from 'axios';
import {API_BASE_URL} from '../../App';
import './QuickSearchOne.css';
import {Button, Search, SegmentGroup} from 'semantic-ui-react';
import {FRENCH_POKEMON_NAMES} from "../../config/config.js";
import RenderOnePokemon from "../RenderOnePokemon/RenderOnePokemon";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const source = JSON.parse(FRENCH_POKEMON_NAMES);

const initialState = {
    isLoading: false,
    isSearchButtonLoading: false,
    results: [],
    value: '',
    frenchName: '',
    description: '',
    pokemonId: null,
    pokemon: null
};

export default class QuickSearchOne extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.name, pokemonId: result.id })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value, pokemonId : null })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.name)
            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    researchPokemon = (e) => {
        this.setState({isSearchButtonLoading: true});
        if(this.state.pokemonId !== null){
            axios.get(API_BASE_URL+'/pokemon/'+this.state.pokemonId).then((data)=>{
                let description = '';
                let frenchName = '';
                for(let i = 0; i < source.length; i++){
                    if(source[i].id === this.state.pokemonId){
                        description = source[i].description;
                        frenchName = source[i].name;
                        break;
                    }
                }
                this.setState({
                    isSearchButtonLoading: false,
                    pokemon:data.data,
                    frenchName: (frenchName !== '') ? frenchName : this.state.value,
                    description: description,
                });
            }).catch((e)=>{
                console.error(e);
                MySwal.fire({icon:'error',text:'Une erreur est survenue lors de la récupération des données.'});
                this.setState({isSearchButtonLoading: false});
            });
        }
    }

    render(){
        return (
            <div className="quick-search-container">
                <Search
                    loading={this.state.isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    results={this.state.results}
                    value={this.state.value}
                    placeholder="Rechercher un pokemon..."
                    size="big"
                    title="Recherche de pokemon"
                    className="quick-search-input"
                />
                <SegmentGroup className="no-border no-shadow">
                    <Button
                        onClick={this.researchPokemon}
                        loading={this.state.isSearchButtonLoading}
                        inverted
                        disabled={this.state.pokemonId === null}>Rechercher</Button>
                </SegmentGroup>
                {this.state.pokemon !== null ? (
                    <RenderOnePokemon
                        pokemon={this.state.pokemon}
                        frenchName={this.state.frenchName}
                        description={this.state.description}/>
                ) : (
                    <></>
                )}
            </div>
        );
    }
}