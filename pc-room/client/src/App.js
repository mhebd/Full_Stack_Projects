import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './components/home/Home';
import Chat from './components/chat/Chat';

export default () => (
  <Router>
    <div className="container-fluid bg-dark text-light">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </div>
  </Router>
);
