import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './screen/Landing.js';
import Cities from './screen/Cities.js';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/cities' component={Cities} />
          </Switch>
        </div>
      </BrowserRouter>  
    ); 
  }
}

