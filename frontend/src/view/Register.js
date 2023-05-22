import React from 'react';
import axios from 'axios';
import logo from '..//img/logo.png';


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

class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            id: "TKD" + Math.floor(Math.random()*101)+1,
            name: '',
            username: '',
            password: '',
            role: 'doctor',
        }
    }

    handleRegis = event => {
        event.preventDefault();

        axios.post(`http://localhost:9000/reg`,{
            id: this.state.id,
            name:this.state.name,
            username:this.state.username,
            password:this.state.password,
            role:this.state.role
        })
        .then(res => {
            var close = document.getElementById("close");
            var br = document.getElementById("btn-reg");
            var modal2 = document.getElementById("ssModal");
            var modal = document.getElementById("myModal");
            var off = document.getElementById("off");
            var bg = document.getElementById("bg-reg");
            br.onclick = function(){
                window.location.href = '/login';
            }
            close.onclick = function(){
                modal.style.display = 'none';
                bg.classList.remove("bg-log");
            }
            off.onclick = function(){
                modal.style.display = 'none';
                bg.classList.remove("bg-log");
            }
            if (res.data === "Failed") {
                modal.style.display = 'initial';
                bg.classList.add("bg-log");
            }else{
                modal2.style.display = 'initial';
                bg.classList.add("bg-log");
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
                <div id='bg-reg' className='body'>
                    <div style={{paddingTop: 100}}>
                        <form id='form-reg' className='form' onSubmit={this.handleRegis}>
                            <h2 style={{textAlign: 'center', paddingTop: 40}}><i class="fas fa-user-edit"></i> ĐĂNG KÝ TÀI KHOẢN</h2>
                            <input type="text" name="role" id='role' value={this.state.role} hidden/>
                            <div className='form-inline' style={{marginTop: 30, paddingLeft: 70}}>
                              <label for="name" className="form-label"> <strong>Tên người dùng:</strong></label>
                              <input type="text" style={{marginLeft: 10, width: '400px'}} className="form-control" name="name" id="name" placeholder="VD: Nguyễn Văn A" onChange={(e)=>this.setState({name:e.target.value})} required/>
                            </div>
                            <div className='form-inline' style={{marginTop: 20, paddingLeft: 70}}>
                              <label for="username" className="form-label"><strong>Tên tài khoản:</strong></label>
                              <input type="text" style={{marginLeft: 25, width: '400px'}} className="form-control" name="username" id="username" onChange={(e)=>this.setState({username:e.target.value})} required/>
                            </div>
                            <div className='form-inline' style={{marginTop: 20, paddingLeft: 70}}>
                                <label for=""> <strong>Mật khẩu:</strong> </label>
                                <div className="input-group" style={{paddingLeft: 50, paddingRight: 50}}>
                                    <input type="password" className="form-control" id='pw' name='password' style={{borderRight: 0, width: '360px'}} onChange={(e)=>this.setState({password:e.target.value})} required/>
                                    <span class="input-group-text" style={{backgroundColor: "white"}}><i type='button' id='icon' class="fas fa-eye-slash" onClick={togglePass}></i></span>
                                </div>
                            </div>
                            <div style={{marginTop: 20, paddingLeft: 70}}>
                                <button type="submit" className='btn btn-info' style={{color: 'white', width: '520px', backgroundColor: '#1E90FF'}}><i class="fas fa-pencil-alt"></i> Đăng ký</button>
                            </div>
                            <div style={{marginTop: 20, paddingLeft: 70, paddingBottom: 50}}>
                                <a href="/login"><i class="fas fa-chevron-left" style={{marginLeft: '28%'}}></i> Trở lại trang đăng nhập</a>
                            </div>
                        </form>                      
                    </div>
                </div>

                <div className="modal" id="ssModal" style={{marginTop: 90}}>
                    <div className="modal-dialog        ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thông báo</h5>
                            </div>
                            <div className="modal-body">
                                <div class='w3-container'>
                                    <h1 style={{textAlign: 'center', color: '#32CD32'}}><i class="fas fa-check-circle"></i></h1>
                                    <h2 style={{textAlign: 'center', color: '#32CD32'}}>Bạn đã đăng ký thành công</h2>
                                    <div class='w3-panel w3-pale-green w3-leftbar w3-border-green'>
                                        <h5 style={{paddingTop: 20}}><strong>Thông báo</strong></h5>
                                        <p> <strong>Mời bạn trở lại trang đăng nhập</strong> </p>
                                    </div>
                                    <button type="button" id='btn-reg' className='btn btn-success' style={{width: '100%'}}>Chấp nhận</button>  
                                </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id="myModal" style={{marginTop: 90}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Thông báo</h4>
                                <button type="button" id='close' class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <h1 style={{textAlign: 'center', color: 'red'}}><i class="fas fa-times-circle"></i></h1>
                                <h2 style={{color: 'red', textAlign: 'center'}}>Đăng ký thất bại !!!</h2>
                                <div class="w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red">
                                    <h5 style={{ marginTop: 10 }}><i class="fas fa-exclamation-triangle" style={{color: 'red',}}></i><strong style={{color: 'red', marginLeft: '5px'}}> Cảnh báo</strong></h5>
                                    <p style={{color: 'red', paddingLeft: 27}}><strong>Tên tài khoản</strong> của bạn <strong>đã tồn tại</strong></p>
                                    <p style={{color: 'red', paddingLeft: 27}}><strong>Vui lòng chọn tên tài khoản khác</strong></p>
                                </div>                              
                            </div>
                            <div class="modal-footer">
                                <button type="button" id='off' class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Register;