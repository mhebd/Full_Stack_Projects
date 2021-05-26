import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import ErrorState from './context/error/ErrorState';
import setHeader from './utils/setHeader.js';

import PrivetRoute from './components/routing/PrivetRoute.jsx';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/authComps/Register';
import Login from './components/authComps/Login';
import Error from './components/error/Error.jsx';

if(localStorage.TOKEN) {
  setHeader(localStorage.TOKEN);
};

function App() {
  return (
    <AuthState>
      <ContactState>
        <ErrorState>
          <Router>
            <NavBar />
            <div className="container pt-4">
              <Error />
              <Switch>
                <PrivetRoute exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivetRoute exact path="" component={Home} />
              </Switch>
            </div>
          </Router>
        </ErrorState>
      </ContactState>
    </AuthState>
  );
}

export default App;