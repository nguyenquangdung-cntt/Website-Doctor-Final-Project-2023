import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './view/Home';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import Login from './view/Login';
import Regis from './view/Register';
import Admin from './view/admin/Admin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Route exact path='/'>
          <Home/>
      </Route>
      <Route path='/login'>
          <Login/>
      </Route>
      <Route path='/register'>
          <Regis/>
      </Route>
      <Route path='/app'>
          <App/>
      </Route>
      <Route path='/admin'>
          <Admin/>
      </Route>
    </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
