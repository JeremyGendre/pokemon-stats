import React, {useCallback, useEffect, useState} from "react";
import _ from 'lodash';
import axios from 'axios';
import {API_BASE_URL} from '../../App';
import './QuickSearchOne.css';
import {Search} from 'semantic-ui-react';
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

export default function QuickSearchOne(){
    const [state, setState] = useState(initialState);

    const handleResultSelect = (e, { result }) => {
        setState(prevState => ({ ...prevState, value: result.name, pokemonId: result.id }))
    }

    const handleSearchChange = (e, { value }) => {
        setState(prevState => ({ ...prevState, isLoading: true, value, pokemonId : null }))

        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(value), 'i')
            const isMatch = (result) => re.test(result.name)
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                results: _.filter(source, isMatch),
            }))
        }, 300)
    }

    const researchPokemon = useCallback(() => {
        setState(prevState => ({ ...prevState, isSearchButtonLoading: true}));
        if(state.pokemonId !== null){
            axios.get(API_BASE_URL+'/pokemon/'+state.pokemonId).then((data)=>{
                let description = '';
                let frenchName = '';
                for(let i = 0; i < source.length; i++){
                    if(source[i].id === state.pokemonId){
                        description = source[i].description;
                        frenchName = source[i].name;
                        break;
                    }
                }
                setState(prevState => ({
                    ...prevState,
                    isSearchButtonLoading: false,
                    pokemon:data.data,
                    frenchName: (frenchName !== '') ? frenchName : state.value,
                    description: description,
                }));
            }).catch((e)=>{
                console.error(e);
                MySwal.fire({icon:'error',text:'Une erreur est survenue lors de la récupération des données.'});
                setState(prevState => ({ ...prevState, isSearchButtonLoading: false}));
            });
        }
    },[state.pokemonId, state.value])

    useEffect(() => {
        if(!state.value){
            setState(initialState);
        }
    },[state.value])
    
    useEffect(() => {
        if(state.pokemonId){
            researchPokemon();
        }
    },[researchPokemon, state.pokemonId])

    return (
        <div className="quick-search-container">
            <Search
                loading={state.isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={state.results}
                value={state.value}
                placeholder="Rechercher un pokemon..."
                size="big"
                title="Recherche de pokemon"
                className="quick-search-input"
            />
            {state.pokemon !== null && (
                <RenderOnePokemon
                    pokemon={state.pokemon}
                    frenchName={state.frenchName}
                    description={state.description}/>
            )}
        </div>
    );
}