import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

function Routing(){
  return(
    <div>
      <Router> 
  <React.StrictMode>
  <Header/>
    <Switch>
  <Route exact path="/" component={App} /> 
  <Route  path="/register" component={Register} /> 
  <Route  path="/login" component={Login} /> 
  <Route  path="/logout" component={Logout} /> 
    </Switch>
    <Footer/> 
    </React.StrictMode>
  </Router> 
    </div>
  );
}
ReactDOM.render(<Routing/>,document.getElementById('root'))
reportWebVitals();


