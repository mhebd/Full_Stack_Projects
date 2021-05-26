import { BrowserRouter as Router } from 'react-router-dom';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import QuoteState from './context/quote/QuoteState';

import Navigation from './routes/Navigation';
import Routes from './routes/Routes';
import Alert from './components/Alert';
import setHeader from './utils/setHeader';

import './App.css';

if(localStorage.token) {
  setHeader(localStorage.token);
}

function App() {
  return (
    <>
      <AuthState>
        <QuoteState>
          <AlertState>
            <div className="container-fluid">
              <Router>
                <Navigation />
                <Alert />
                <Routes />
              </Router>
            </div>
          </AlertState>
        </QuoteState>
      </AuthState>
    </>
  );
}

export default App;
