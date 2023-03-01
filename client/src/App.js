import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Views/Home';


function App() {
  const location = useLocation()
  return (
    <div>
    {location.pathname !== "/" && <NavBar/>}
    <Route path="/home" component={Home}/>
    </div>
  );
}

export default App;
