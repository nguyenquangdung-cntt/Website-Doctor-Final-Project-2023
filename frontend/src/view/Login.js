import React from 'react';
import axios from 'axios';
import logo from '..//img/logo.png';
import * as $ from "jquery";

window.onload = function(){ 
    document.getElementById("form").classList.add("eform");
}
function togglePass(){
    var pas = document.getElementById("pw");
    var icon = document.getElementById("icon");
    if (pas.type == "password") {
        pas.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
		pas.type = "password";
        icon.classList.remove("fa-eye");
		icon.classList.add("fa-eye-slash");        
    }
}

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin = event =>{
        event.preventDefault();

        axios.post(`http://localhost:9000/login`,{
            username:this.state.username,
            password:this.state.password
        })
        .then(res => {
            var close = document.getElementById("close");
            var close2 = document.getElementById("close-2");
            var off = document.getElementById("off");
            var bl = document.getElementById("btn-log");
            var bl2 = document.getElementById("btn-log2");
            close.onclick = function(){
                modal.style.display = 'none';
                bg.classList.remove("bg-log");
            }
            close2.onclick = function(){
                modal2.style.display = 'none';
                bg.classList.remove("bg-log");
            }
            off.onclick = function(){
                modal.style.display = 'none';
                bg.classList.remove("bg-log");
            }
            bl.onclick = function(){
                window.location.href = '/app/home';
            }
            bl2.onclick = function(){
                window.location.href = '/admin/home';
            }
            if (JSON.stringify(res.data) === '{}') {
                var bg = document.getElementById("bg-log");
                var modal = document.getElementById("myModal");
                modal.style.display = 'initial';
                bg.classList.add("bg-log");
            }else{
                if (res.data === 'admin') {
                    var bg = document.getElementById("bg-log");
                    var modal3 = document.getElementById("ssModal2");
                    modal3.style.display = 'initial';
                    bg.classList.add("bg-log"); 
                }else{
                    var bg = document.getElementById("bg-log");
                    var modal2 = document.getElementById("ssModal");
                    modal2.style.display = 'initial';
                    bg.classList.add("bg-log"); 
                    localStorage.setItem('DOCTOR',JSON.stringify(res.data));
                }
            }
        })
        .catch(function (err){
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <div className='logo'>
                    <div className='form-inline' style={{marginLeft: '43%', paddingTop: 3}}>
                        <img src={logo} alt="logo" width={35}/>
                        <h4 id='title-main' style={{paddingTop: 10, color: "#1E90FF", marginLeft: 5}}>HEALTHCARE</h4>
                    </div>
                </div>
                <div id='bg-log' className='bodies'>
                    <div style={{paddingTop: 90}}>
                        <form id='form' className='form' onSubmit={this.handleLogin}>
                            <h3 style={{textAlign: "center", paddingTop: 30}}>Đăng nhập</h3>
                            <div className="mb-3 mt-3" style={{paddingLeft: 50, paddingRight: 50}}>
                                <input type="text" class="form-control" id="usn" placeholder="Tên tài khoản" name="username" onChange={(e)=>this.setState({username:e.target.value})} required/>
                            </div>
                            <div className="input-group" style={{paddingLeft: 50, paddingRight: 50}}>
                                <input type="password" className="form-control" id='pw' name='password' placeholder="Mật khẩu" style={{borderRight: 0}} onChange={(e)=>this.setState({password:e.target.value})} required/>
                                <span class="input-group-text" style={{backgroundColor: "white"}}><i type='button' id='icon' class="fas fa-eye-slash" onClick={togglePass}></i></span>
                            </div>
                            <button type="submit" className='btn btn-primary' id='login' style={{ marginTop: 25, width: 450, marginLeft: 50 }}>Đăng nhập</button>
                            <br></br>
                            <div style={{marginTop: 10, marginLeft: '39%'}}>
                                <a href="/register">Tạo tài khoản mới</a>
                            </div>
                        </form>                        
                    </div>
                </div>
                <div class="modal" id="myModal" style={{marginTop: 150}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Thông báo</h4>
                                <button type="button" id='close' class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red">
                                    <h5 style={{ marginTop: 10 }}><i class="fas fa-exclamation-triangle" style={{color: 'red',}}></i><strong style={{color: 'red', marginLeft: '5px'}}> Cảnh báo</strong></h5>
                                    <p style={{color: 'red', marginLeft: '2rem'}}><strong>Đăng nhập thất bại !!!</strong></p>
                                </div>                              
                            </div>
                            <div class="modal-footer">
                                <button type="button" id='off' class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal" id="ssModal" style={{marginTop: 150}}>
                    <div className="modal-dialog        ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thông báo</h5>
                                <button type="button" id='close-2' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div class='w3-container'>
                                    <div class='form-inline' style={{marginTop: '20px', marginBottom: '20px'}}>
                                        <i style={{fontSize: 50, paddingRight: '10px', color: '#28a745'}} class="fas fa-check-circle"></i>
                                        <h3 style={{textAlign: 'center'}}>Bạn đăng nhập thành công</h3>
                                    </div>
                                    <button type="button" id='btn-log' className='btn btn-success' style={{width: '100%'}}>Chấp nhận</button>  
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="ssModal2" style={{marginTop: 150}}>
                    <div className="modal-dialog        ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thông báo</h5>
                                <button type="button" id='close-2' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div class='w3-container'>
                                <div class='form-inline' style={{marginTop: '20px', marginBottom: '20px'}}>
                                        <i style={{fontSize: 50, paddingRight: '30px', color: '#1E90FF'}} class="fas fa-check-circle"></i>
                                        <h3 style={{textAlign: 'center'}}>Xin chào quản trị viên</h3>
                                    </div>
                                    <button type="button" id='btn-log2' className='btn btn-primary' style={{width: '100%'}}>Chấp nhận</button>  
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;