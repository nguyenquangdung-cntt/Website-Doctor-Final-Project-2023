import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Dashboard from './view/Dashboard';
import Medical from './view/ListMedical';
import Patient from './view/MedicalRecords';
import Data from './view/Data';
import Diagnose from './view/Diagnose';
import $ from 'jquery'; 
import logo from './img/logo.png';

$(function () {
  setNavigation();
});
function setNavigation() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  $(".nav a").each(function () {
      var href = $(this).attr('href');
      if (path.substring(0, href.length) === href) {
          $(this).closest('a').addClass('active');
      }
  });
}
$(document).ready(function(){
  $(".fa-user-circle").click(function(){
      $("#menu-acc").toggle();
  });
});

class App extends Component {
  
  hanleLogout(){
    localStorage.removeItem("DOCTOR");
  }

  render(){
    return(
      <Router>
        <div>
          <div className='header'>
            <nav class="navbar navbar-expand-lg navbar-light">
              <a class="navbar-brand" href="/app/home" style={{marginLeft: 10}}>
                <div className='form-inline'>
                  <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="" />
                  <h4 id='title-main' style={{paddingTop: 10, color: "#1E90FF", marginLeft: 5}}>HEALTHCARE</h4>
                </div>
              </a>
              <div id='logout' style={{border: '0px solid black', textAlign: 'center', marginLeft: '1200px'}}>
                <a className="nav-link" id='logout' href="/login" style={{padding: 10}} onClick={this.hanleLogout}><i class="fas fa-sign-out-alt" style={{marginRight: 10}}></i> Đăng xuất</a>
              </div>
            </nav>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div id='sidebar' className='col-sm-2'>
                <ul id='menu-main' className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="/app/home"><i class="fas fa-th-large" style={{marginRight: 10}}></i> Dashboard</a>
                  </li>
                  {/*<li className="nav-item">
                    <a className="nav-link" href="/app/data" style={{marginTop: '20px'}}><i class="fas fa-hospital-user" style={{marginRight: 10}}></i> Thu thập dữ liệu</a>
                  </li>*/}
                  <li className="nav-item">
                    <a className="nav-link" href="/app/medical" style={{marginTop: '20px'}}><i class="fas fa-notes-medical" style={{marginRight: 10}}></i> Hồ sơ khám bệnh</a>
                  </li>
                </ul>
              </div>
              <div id='main' className='col-sm-10'>
              <Switch>
                <Route exact path='/app/home'>
                  <Dashboard/>
                </Route>
                <Route exact path='/app/data'>
                  <Data/>
                </Route>
                <Route exact path='/app/medical'>
                  <Medical/>
                </Route>
                <Route exact path='/app/diagnose/:id'>
                  <Diagnose/>
                </Route>
                <Route exact path='/app/:id'>
                  <Patient/>
                </Route>
              </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
