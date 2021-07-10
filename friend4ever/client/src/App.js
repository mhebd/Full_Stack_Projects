import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ProfileState from './context/profile/ProfileState';
import PostState from './context/post/PostState';

import Header from './components/header/Header';
import Routes from './routes/Routes';
import Alert from './components/common/Alert';
import Footer from './components/common/Footer';
import setHeader from './utils/setHeader';

if(localStorage.token) {
  setHeader(localStorage.token);
};

function App() {
  return (
    <AuthState>
      <ProfileState>
        <PostState>
          <AlertState>
            <div className="container-fluid">
              <Router>
                <Header />
                <Alert />
                <Routes />
                <Footer />
              </Router>
            </div>
          </AlertState>
        </PostState>
      </ProfileState>
    </AuthState>
  );
}

export default App;
