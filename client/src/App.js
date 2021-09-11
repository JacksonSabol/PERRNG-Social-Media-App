import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history/history';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
