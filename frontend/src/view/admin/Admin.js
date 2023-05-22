import React from 'react';
import '../../App.css';
import logo from '../../img/logo.png';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import $ from 'jquery'; 
import Acc from './Account';
import Home from './HomeAdmin';
import axios from 'axios';

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

class Admin extends React.Component{

    render(){
        return(
            <Router>
                <div className='container-fluid' style={{margin: 0, padding: 0, boxSizing: 'border-box'}}>
                    <div className='head-admin'>
                        <img src={logo} alt="logo" style={{padding: 7}}/>
                        <h3 style={{paddingTop: 7, color: "#1E90FF"}}>HEALTHCARE</h3>
                        <p style={{fontSize: 20, paddingTop: 8, marginLeft: '74%'}}><strong>Quản trị viên</strong></p>
                        <i class="fas fa-user-circle" style={{fontSize: 30, paddingTop: 10, marginLeft: '10px'}}></i>
                    </div>
                    <div id='content-admin'>
                        <div className="row">
                            <div id='side-admin' className='col-sm-2'  style={{margin: 0, padding: 0, boxSizing: 'border-box'}}>
                                <ul id='menu-main' className="nav flex-column"> 
                                    <li className="nav-item">
                                        <a className="nav-link" href="/admin/home"><i class="fas fa-home"></i> Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/admin/account" style={{marginTop: '20px'}}><i class="fas fa-users-cog"></i> Quản lý tài khoản</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login" style={{marginTop: '20px'}}><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                                    </li>
                                </ul>
                            </div>
                            <div id='dash-admin' className='col-sm-10' style={{backgroundColor: '#00BFFF'}}>
                                <Switch>
                                    <Route exact path='/admin/home'>
                                        <Home/>
                                    </Route>
                                    <Route exact path='/admin/account'>
                                        <Acc/>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Admin;