import React, {useEffect, useState} from "react";
import _ from "lodash";
import axios from 'axios';
import {Button, Dimmer, Grid, Icon, Loader, Popup, Search, Segment, Table} from "semantic-ui-react";
import './CompareScreen.css';
import {FRENCH_POKEMON_NAMES} from "../../config/config";
import {API_BASE_URL} from "../../App";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    getBestAttackPokemonFromList,
    getBestDefensePokemonFromList,
    getBestHpPokemonFromList,
    getBestSpecialAttackPokemonFromList,
    getBestSpecialDefensePokemonFromList,
    getBestSpeedPokemonFromList, getPokemonName
} from "../../utils/pokemonFunctions";

const MySwal = withReactContent(Swal);

const source = JSON.parse(FRENCH_POKEMON_NAMES);

const initialState = {
    isLoading: false,
    selectablePokemons: [],
    value: '',
    selectedPokemons: [],
    lineIsBeingAdded : false
};

export default function CompareScreen(){
    const [state, setState] = useState(initialState);

    const handleResultSelect = (e, { result }) => {
        if(state.selectedPokemons.length > 20){
            MySwal.fire({
                icon:'warning',
                text:'Vous comparez déjà trop de pokémons'
            });
            return;
        }
        setState(prevState => ({...prevState, value: '', lineIsBeingAdded:true}));
        axios.get(API_BASE_URL+'/pokemon/'+result.id).then((data)=>{
            let selectedPokemons = [...state.selectedPokemons];
            let newResult = result;
            newResult.data = data.data;
            if(_.find(selectedPokemons,newResult) !== undefined){
                setState(prevState => ({...prevState, lineIsBeingAdded:false}));
                return;
            }
            selectedPokemons.push(newResult);
            setState(prevState => ({...prevState, selectedPokemons : selectedPokemons, lineIsBeingAdded:false}))
        }).catch((e)=> {
            console.error(e);
            setState(prevState => ({...prevState, lineIsBeingAdded:false}));
        })
    }

    const handleSearchChange = (e, { value }) => {
        setState(prevState => ({ ...prevState, isLoading: true, value }))

        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(value), 'i')
            const isMatch = (result) => re.test(result.name)
            setState(prevState => ({
                ...prevState,
                isLoading: false,
                selectablePokemons: _.filter(source, isMatch),
            }))
        }, 300)
    }

    const handleDeleteFromList = (index)=>{
        state.selectedPokemons.splice(index, 1);
        setState(prevState => ({ ...prevState, selectedPokemons : state.selectedPokemons}))
    }

    const handleResetClick = () => {
        setState(initialState);
    }

    return (
        <div className="compare-container">
            <h1 className="text-center">Compare les stats !</h1>
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={5}>
                    <Search
                        loading={state.isLoading}
                        onResultSelect={handleResultSelect}
                        onSearchChange={_.debounce(handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={state.selectablePokemons}
                        value={state.value}
                        placeholder="Ajouter un pokemon..."
                        size="large"
                        title="Ajouter un pokemon"
                    />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={11}>
                    <Segment className="custom-segment">
                        <Table definition selectable>
                            <Dimmer className="custom-dimmer" active={state.lineIsBeingAdded === true}>
                                <Loader>Loading</Loader>
                            </Dimmer>
                            <Table.Header>
                                <Table.Row className="text-center">
                                    <Table.HeaderCell className="empty-header-cell"/>
                                    <Table.HeaderCell>HP</Table.HeaderCell>
                                    <Table.HeaderCell>Attack</Table.HeaderCell>
                                    <Table.HeaderCell>Defense</Table.HeaderCell>
                                    <Table.HeaderCell>Atk-spe</Table.HeaderCell>
                                    <Table.HeaderCell>Def-spe</Table.HeaderCell>
                                    <Table.HeaderCell>Speed</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>

                            {state.selectedPokemons.length < 1 ? (
                                <Table.Body>
                                    <Table.Row className="text-center">
                                        <Table.Cell/>
                                        <Table.Cell/>
                                        <Table.Cell/>
                                        <Table.Cell/>
                                        <Table.Cell>No Results</Table.Cell>
                                        <Table.Cell/>
                                        <Table.Cell/>
                                        <Table.Cell/>
                                    </Table.Row>
                                </Table.Body>
                            ) : (
                                <Table.Body>
                                    {state.selectedPokemons.map((pokemon, index)=>{
                                        let pokemonDataStats = pokemon.data ? (pokemon.data.stats ?? []) : [];
                                        let pokemonStats = {
                                            hp:'???',
                                            atk:'???',
                                            def:'???',
                                            atkspe:'???',
                                            defspe:'???',
                                            vit:'???',
                                        };
                                        for(let i = 0; i < pokemonDataStats.length; i++){
                                            switch(pokemonDataStats[i].stat.name){
                                                case 'hp':
                                                    pokemonStats.hp = pokemonDataStats[i].base_stat;
                                                    break;
                                                case 'attack':
                                                    pokemonStats.atk = pokemonDataStats[i].base_stat;
                                                    break;
                                                case 'defense':
                                                    pokemonStats.def = pokemonDataStats[i].base_stat;
                                                    break;
                                                case 'special-attack':
                                                    pokemonStats.atkspe = pokemonDataStats[i].base_stat;
                                                    break;
                                                case 'special-defense':
                                                    pokemonStats.defspe = pokemonDataStats[i].base_stat;
                                                    break;
                                                case 'speed':
                                                    pokemonStats.vit = pokemonDataStats[i].base_stat;
                                                    break;
                                                default:
                                            }
                                        }
                                        return (
                                            <Table.Row className="text-center" key={index}>
                                                <Table.Cell>{pokemon.name}</Table.Cell>
                                                <Table.Cell>{pokemonStats.hp}</Table.Cell>
                                                <Table.Cell>{pokemonStats.atk}</Table.Cell>
                                                <Table.Cell>{pokemonStats.def}</Table.Cell>
                                                <Table.Cell>{pokemonStats.atkspe}</Table.Cell>
                                                <Table.Cell>{pokemonStats.defspe}</Table.Cell>
                                                <Table.Cell>{pokemonStats.vit}</Table.Cell>
                                                <Table.Cell>
                                                    <Popup
                                                        className="custom-tooltip"
                                                        content='Supprimer de la liste'
                                                        position="top center"
                                                        trigger={<Icon onClick={handleDeleteFromList} name="delete" className="custom-delete-icon"/>} />
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                    <Table.Row className="text-center text-bold">
                                        <Table.Cell/>
                                        <Table.Cell >{getPokemonName(getBestHpPokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell>{getPokemonName(getBestAttackPokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell>{getPokemonName(getBestDefensePokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell>{getPokemonName(getBestSpecialAttackPokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell>{getPokemonName(getBestSpecialDefensePokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell>{getPokemonName(getBestSpeedPokemonFromList(state.selectedPokemons))}</Table.Cell>
                                        <Table.Cell/>
                                    </Table.Row>
                                </Table.Body>
                            )}
                        </Table>
                    </Segment>
                    <div className="reset-button-container">
                        <Button disabled={state.selectedPokemons.length < 1} onClick={handleResetClick} color="orange">Réinitialiser</Button>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}