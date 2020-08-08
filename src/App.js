import React from 'react';
import './App.css';
import Header from "./Component/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import CompareScreen from "./Screen/CompareScreen/CompareScreen";
import {Container} from 'semantic-ui-react';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Header/>
              <Container>
                  <Switch>
                      <Route exact path="/"><HomeScreen/></Route>
                      <Route exact path="/pokemon-stats"><HomeScreen/></Route>
                      <Route exact path="/pokemon-stats/"><HomeScreen/></Route>
                      <Route exact path="/compare"><CompareScreen/></Route>
                  </Switch>
              </Container>
          </BrowserRouter>
      </div>
  );
}

export default App;
