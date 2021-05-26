import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PersonState from './context/person/PersonState';
import setHeader from './utils/setHeader';

import Navigation from './components/Navigation';
import Routes from './routes/Routes';
import Alert from './components/Alert';

import './App.css';

if(localStorage.token) {
  setHeader(localStorage.token);
}

function App() {
  const [showNav, setShowNav] = useState(false);
  const showNavCtrl = () => {
    if(showNav) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    return showNav;
  }
  return (
    <AuthState>
      <AlertState>
        <PersonState>
          <div className="container-fluid">
            <div className="site-wrapper my-2 p-3">
              <Router>
                <div className={`site-navigation ${showNav ? 'show' : ''}`}>
                  <Navigation show={showNavCtrl} status={showNav} />
                </div>
                <div className="site-main p-3">
                  <Alert />
                  <Routes />
                </div>
              </Router>
            </div>
          </div>
        </PersonState>
      </AlertState>
    </AuthState>
  );
}

export default App;
