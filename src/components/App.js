import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import AddDocument from './pages/AddDocument';
import api from '../api';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    // api.loadUser();
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={AddDocument} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
