import React, { Suspense } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
