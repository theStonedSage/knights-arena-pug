import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Home from './components/pug/home/Home';
import { UserContextProvider } from './contexts/userContext';
import DiscordAuthRoute from './auth/DiscordAuthRoute';
import RiotAuthRoute from './auth/RiotAuthRoute';
import Loading from './components/pug/loading/ScreenLoading';

function App() {
  return (
    <UserContextProvider>
    <Router>
      
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/test" exact component={Loading} />
          <DiscordAuthRoute path="/discord" exact component={Home} />
          <RiotAuthRoute path="/cb/rso" exact component={Home}  />
        </Switch>
      
    </Router>
    </UserContextProvider>
  );
}

export default App;
