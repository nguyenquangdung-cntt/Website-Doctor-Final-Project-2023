import React, { Component } from 'react';
import oxy from '../img/blood-oxygen.png';
import axios from 'axios';
import { parse, stringify } from 'qs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { withRouter } from "react-router";

const api = axios.create({
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
})

var d = new Date();

var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var hour = d.getHours();
var minute = d.getMinutes();
var s = d.getSeconds();

var list = JSON.parse(localStorage.getItem('DOCTOR'));

function formatTime(a){
    if (a < 10) {
        return a = '0' + String(a);
    }
    return a;
}

class MedicalRecords extends React.Component{

    refresh = () => {
        window.location.reload();
    }

   constructor (props){
        super(props)
        this.state = {
            patients: [],
            list: [],
            diagnosis: '',
            health:'Nhiễm bệnh',
            date: formatTime(day) + '/' + formatTime(month) + '/' + year + ' ' + formatTime(hour) + ':' + formatTime(minute) + ':' + s,
            id:this.props.match.params.id,
            doctor: list.name
        }
        const firebaseConfig = {
            apiKey: "AIzaSyBuVyr4uj_0t-zKZXvnyA0-mgnF8GmFq7A",
            authDomain: "covid19-93267.firebaseapp.com",
            databaseURL: "https://covid19-93267-default-rtdb.firebaseio.com",
            projectId: "covid19-93267",
            storageBucket: "covid19-93267.appspot.com",
            messagingSenderId: "709726013376",
            appId: "1:709726013376:web:04749c92c3e36191ccea25",
            measurementId: "G-R75LZ5H9JJ"
        }
        firebase.initializeApp(firebaseConfig);
    }

    componentWillMount(){
        const id = this.props.match.params.id;
        api.get(`http://localhost:9000/${id}`)
        .then(res => {
            console.log(res.data)
            this.setState({
               patients: res.data
            });
        })
        .catch(function (err){
            console.log(err);
        })
    }

    componentDidMount(){
        const readUserData = () => {
            const ref = firebase.database().ref('SM001/')
            ref.on('value', (snapshot) => {
                const data = snapshot.val();
                this.setState({
                    list: data
                })
            })
        }
        readUserData();
    }

    handleAddDiagnose = e =>{
        e.preventDefault();

        api.post(`http://localhost:9000/addDia`,{
                id: this.state.id,
                diagnosis: this.state.diagnosis,
                date:this.state.date,
                health: this.state.health,
                doctor: this.state.doctor
            }
        ).then(res => {
            this.refresh();
        }).catch(function (err){
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div id='ifo-ps' className='container-fluid'>
                                <div className='row'>
                                    <div id='ava' className='col-sm-6'>
                                        <h1 style={{textAlign: 'center', fontSize: 150}}><i class="far fa-user-circle"></i></h1>
                                        <strong style={{textAlign: 'center', fontSize: 20}}><p>{this.state.patients.name}</p></strong>
                                        <button type="button" className='btn btn-danger' style={{marginLeft: 57}} data-bs-toggle="modal" data-bs-target="#mymodal">Triệu chứng ban đầu</button>
                                    </div>
                                    <div class="modal" id="mymodal">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Triệu chứng ban đầu</h4>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body">
                                                <textarea class="form-control" rows="5" id="symptom" name="symptom" style={{resize: 'none'}}value={this.state.patients.symptom} disabled></textarea>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                                            </div>

                                            </div>
                                        </div>
                                        </div>
                                    <div id='ifor' className='col-sm-6'>
                                        <label for="gen" class="form-label" style={{marginTop: 10}}><strong><i class="fas fa-venus-mars"></i> Giới tính:</strong></label>
                                        <input type="text" class="form-control" id="gen"  name="gen" value={this.state.patients.sex} disabled/>
                                        <label for="phone" class="form-label" style={{marginTop: 10}}><strong><i class="fas fa-phone"></i> Số điện thoại:</strong></label>
                                        <input type="phone" class="form-control" id="phone"  name="phone" value={this.state.patients.phone} disabled/>
                                        <label for="date" class="form-label" style={{marginTop: 10}}><strong><i class="fas fa-calendar-day"></i> Ngày cách ly:</strong></label>
                                        <input type="text" class="form-control" id="date"  name="date" value={this.state.patients.day} disabled/>
                                        <label for="addr" class="form-label" style={{marginTop: 10}}><strong><i class="fas fa-map-marked-alt"></i> Địa chỉ:</strong></label>
                                        <p>{this.state.patients.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div id='dnt-dt'>
                                <form onSubmit={this.handleAddDiagnose}>
                                    <div class="container">
                                        <label for="health" class="form-label" style={{marginTop: 10}}><strong><i class="fas fa-medkit"></i> Tình trạng sức khỏe:</strong></label>
                                        <select class="form-select" id="health" name="health" onChange={(e)=>this.setState({health:e.target.value})}>
                                            <option value={this.state.patients.health}>{this.state.patients.health}</option>
                                            <option>---Bạn chọn---</option>
                                            <option value='Khỏi bệnh'>Khỏi bệnh</option>
                                            <option value='Nhiễm bệnh'>Nhiễm bệnh</option>
                                        </select>
                                        <div class="form-group" style={{marginTop: 5}}>
                                          <label for="date"><strong><i class="fas fa-calendar-week"></i> Ngày:</strong> </label>
                                          <input type="text" class="form-control" name="date" id="date" value={formatTime(day) + '/' + formatTime(month) + '/' + year + ' ' + formatTime(hour) + ':' + formatTime(minute) + ':' + s} disabled/>
                                        </div>
                                        <label for="diagnosis"><h5>Chuẩn đoán:</h5></label>
                                        <textarea class="form-control" rows="3" id="diagnosis" name="diagnosis" style={{resize: 'none', backgroundColor: '#F8F8FF'}} onChange={(e)=>this.setState({diagnosis:e.target.value})}></textarea>
                                        <button className='btn btn-secondary' style={{marginTop: 20}}><a href={"/app/diagnose/"+this.state.patients.id} style={{textDecoration: 'none', color: 'white'}}><i class="fas fa-history"></i> Lịch sử chuẩn đoán</a></button>
                                        <button className='btn btn-primary' style={{marginTop: 20, float: 'right'}}><i class="fas fa-save"></i> Lưu</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginTop: 20}}>
                        <div className='col-sm-4'>
                            <div id='hearth'>
                                <h3 style={{color: 'white', textAlign: 'center', paddingTop: 10}}><i class="fas fa-heartbeat"></i> Nhịp tim</h3>
                                <p style={{textAlign: 'center', color: 'white', fontSize: 40, marginTop: 50}}>{this.state.list.heartBeat} BPM</p>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div id='oxy'>
                                <h3 style={{color: 'white', textAlign: 'center', paddingTop: 10}}><img src={oxy} width={50}/> Nồng độ oxy trong máu</h3>
                                <p style={{textAlign: 'center', color: 'white', fontSize: 40, marginTop: 30}}>{this.state.list.oxyBlood} %</p>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div id='temp'>
                                <h3 style={{color: 'white', textAlign: 'center', paddingTop: 10}}><i class="fas fa-temperature-high"></i> Nhiệt độ cơ thể</h3>
                                <p style={{textAlign: 'center', color: 'white', fontSize: 40, marginTop: 50}}>{parseFloat(this.state.list.tempBody).toFixed(1)} *C</p>                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MedicalRecords);