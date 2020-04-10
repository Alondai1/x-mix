import React from 'react';
import { Router, Switch, Route} from 'react-router';
import history from './history';

import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Stats from './pages/Stats';
import Multi from './pages/Multi';


function App() {
  return (
    <div className="app-container flex justify-center align-center"> 
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/game" component={Game} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/stats" component={Stats} exact/>
          <Route path="/multi" component={Multi} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
