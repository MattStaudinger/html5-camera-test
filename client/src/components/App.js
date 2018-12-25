import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ScanDocument from './pages/ScanDocument';


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
          <Route path="/" exact component={ScanDocument} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
