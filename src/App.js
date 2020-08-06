import React from 'react';
import './App.css';
import Header from "./Component/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Header/>
              <Switch>
                  <Route path="/">
                      <HomeScreen/>
                  </Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
