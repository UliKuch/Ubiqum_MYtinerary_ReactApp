import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './screen/Landing.js';
import Cities from './screen/Cities.js';
import City from './screen/City.js';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route path='/cities/:city' component={City} />
          </Switch>
        </div>
      </BrowserRouter>  
    ); 
  }
}

