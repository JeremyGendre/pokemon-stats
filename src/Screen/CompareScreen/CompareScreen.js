import React, {Component} from "react";
import _ from "lodash";
import axios from 'axios';
import {Button, Grid, Icon, Popup, Search, Table} from "semantic-ui-react";
import './CompareScreen.css';
import {FRENCH_POKEMON_NAMES} from "../../config/config";
import {API_BASE_URL} from "../../App";

const source = JSON.parse(FRENCH_POKEMON_NAMES);


export default class CompareScreen extends Component{

    initialState = {
        isLoading: false,
        selectablePokemons: [],
        value: '',
        selectedPokemons: [],
        lineIsBeingAdd : false
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    handleResultSelect = (e, { result }) => {
        this.setState({lineIsBeingAdd:true});
        axios.get(API_BASE_URL+'/pokemon/'+result.id).then((data)=>{
            let selectedPokemons = this.state.selectedPokemons;
            let newResult = result;
            newResult.data = data.data;
            selectedPokemons.push(newResult);
            this.setState({
                value: '',
                selectedPokemons : selectedPokemons,
                lineIsBeingAdd:false
            })
        }).catch((e)=> {
            console.error(e);
            this.setState({
                value: '',
                lineIsBeingAdd:false
            })
        })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState({isLoading: false, selectablePokemons: [], value: '', lineIsBeingAdd : false})

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.name)
            this.setState({
                isLoading: false,
                selectablePokemons: _.filter(source, isMatch),
            })
        }, 300)
    }

    handleDeleteFromList = (index)=>{
        this.state.selectedPokemons.splice(index,1);
        this.setState({selectedPokemons : this.state.selectedPokemons})
    }

    handleResetClick = (e) => {
        this.setState({
            isLoading: false,
            selectablePokemons: [],
            value: '',
            selectedPokemons: [],
            lineIsBeingAdd : false
        });
    }

    render(){
        let lineIsBeingAddElement = null;
        if(this.state.lineIsBeingAdd === true){
            lineIsBeingAddElement = (<Table.Row>
                <Table.Cell/>
                <Table.Cell/>
                <Table.Cell/>
                <Table.Cell>Récupération des données ...</Table.Cell>
                <Table.Cell/>
                <Table.Cell/>
                <Table.Cell/>
            </Table.Row>);
        }
        return (
            <div className="compare-container">
                <h1 className="text-center">Compare les stats !</h1>
                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={5}>
                        <Search
                            loading={this.state.isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true,
                            })}
                            results={this.state.selectablePokemons}
                            value={this.state.value}
                            placeholder="Ajouter un pokemon..."
                            size="large"
                            title="Ajouter un pokemon"
                        />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                        <div className="compare-result-container">
                            <Table definition selectable>
                                <Table.Header>
                                    <Table.Row>
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


                                    {this.state.selectedPokemons.length < 1 ? (
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell/>
                                                <Table.Cell/>
                                                <Table.Cell/>
                                                <Table.Cell/>
                                                <Table.Cell>No Results</Table.Cell>
                                                <Table.Cell/>
                                                <Table.Cell/>
                                                <Table.Cell/>
                                            </Table.Row>
                                            {lineIsBeingAddElement}
                                        </Table.Body>
                                    ) : (
                                        <Table.Body>
                                            {this.state.selectedPokemons.map((pokemon, index)=>{
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
                                                    <Table.Row key={index}>
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
                                                                trigger={<Icon onClick={this.handleDeleteFromList.bind(this,index)} name="delete" className="custom-delete-icon"/>} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}{lineIsBeingAddElement}
                                        </Table.Body>
                                    )}
                            </Table>
                        </div>
                        <div className="reset-button-container">
                            <Button disabled={this.state.selectedPokemons.length < 1} onClick={this.handleResetClick.bind(this)} color="orange">Réinitialiser</Button>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}