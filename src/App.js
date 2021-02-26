import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/pug/home/Home';
import DiscordAuth from './auth/DiscordAuth';
import { UserContextProvider } from './contexts/userContext';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/discord" exact component={DiscordAuth} />
      </UserContextProvider>
    </Router>
  );
}

export default App;
