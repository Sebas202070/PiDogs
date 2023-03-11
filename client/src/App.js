import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Detail from './Views/Detail';
import Form from './Views/Form';
import Home from './Views/Home';
import Landing from './Views/Landing';


function App() {
  const location = useLocation()
  return (
    <div>
    {location.pathname !== "/" && <NavBar/>}
    <Route exact path="/" component={Landing}/>
    <Route path="/home" component={Home}/>
    <Route exact path="/detail/:id" component={Detail}/>
    <Route exact path="/create"component={Form}/>
    </div>
  );
}

export default App;
