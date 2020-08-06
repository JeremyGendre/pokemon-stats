import React, {Component} from "react";
import './QuickSearchOne.css';
import {Search} from 'semantic-ui-react';
import {FRENCH_POKEMON_NAMES} from "../../../config/frenchPokemonNames";

export default class QuickSearchOne extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: ''
        };
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    componentDidMount() {
        try{
            let frenchPokemonNamesDecoded = JSON.parse(FRENCH_POKEMON_NAMES);
            console.log(frenchPokemonNamesDecoded);
            this.setState({results:frenchPokemonNamesDecoded});
        }catch (e) {
            console.log(e);
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
                    results={results}
                    value={value}
                />
            </div>
        );
    }
}