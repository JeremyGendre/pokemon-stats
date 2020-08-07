import React, {Component} from "react";
import CompareResult from "../../Component/CompareResult/CompareResult";
import _ from "lodash";
import {Grid, Search} from "semantic-ui-react";
import './CompareScreen.css';
import {FRENCH_POKEMON_NAMES} from "../../config/config";

const source = JSON.parse(FRENCH_POKEMON_NAMES);

const initialState = {
    isLoading: false,
    results: [],
    value: '',
    pokemon: null
};

export default class CompareScreen extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.name })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

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

    render(){
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
                            results={this.state.results}
                            value={this.state.value}
                            placeholder="Rechercher un pokemon..."
                            size="large"
                            title="Recherche de pokemon"
                        />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={11}>
                        <CompareResult/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}