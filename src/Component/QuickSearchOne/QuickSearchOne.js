import React, {Component} from "react";
import _ from 'lodash';
import './QuickSearchOne.css';
import {Search} from 'semantic-ui-react';
import {FRENCH_POKEMON_NAMES} from "../../config/frenchPokemonNames.js";

const source = JSON.parse(FRENCH_POKEMON_NAMES);

const initialState = {
    isLoading: false,
    results: [],
    value: ''
};

export default class QuickSearchOne extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.name })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)
            if(this.state.value.length >= 3){
                const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
                const isMatch = (result) => re.test(result.name)
                this.setState({
                    isLoading: false,
                    results: _.filter(source, isMatch),
                })
            }else{
                this.setState({
                    isLoading: false,
                    results: [],
                })
            }
        }, 300)
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
                />
            </div>
        );
    }
}