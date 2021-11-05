import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import SinglePost from './components/posts/SinglePost';
import  Search  from './components/posts/Search';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';
import Admin from './components/Admin';

function Routing(){
  return(
    <div>
      <Router> 
  <React.StrictMode>
  <Header/>
    <Switch>
  <Route exact path="/" component={App} /> 
  <Route path="/admin" component={Admin} />
  <Route path="/admin/create" component={Create} />
  <Route path="/admin/edit/:id" component={Edit} />
  <Route path="/admin/delete/:id" component={Delete} />
  <Route  path="/register" component={Register} /> 
  <Route  path="/login" component={Login} /> 
  <Route  path="/logout" component={Logout} /> 
  <Route path="/post/:slug" component={SinglePost} />
  <Route path="/search" component={Search} />
    </Switch>
    <Footer/> 
    </React.StrictMode>
  </Router> 
    </div>
  );
}
ReactDOM.render(<Routing/>,document.getElementById('root'))
reportWebVitals();


