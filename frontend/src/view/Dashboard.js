import React from 'react';
import doctor from '../img/doctor.jpg';
import img1 from '../img/slide1.jpg';
import img2 from '../img/slide2.jpg';
import img3 from '../img/slide3.jpg';
import axios from 'axios';

var d = new Date();

var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();

var list = JSON.parse(localStorage.getItem('DOCTOR'));
class Dashboard extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            count: [],
        }
    }


    componentWillMount(){
        axios.get("http://localhost:9000/count")
        .then(res => {
            this.setState({
               count: res.data
            });
        })
        .catch(function (err){
            console.log(err);
        })
    }


    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div id='title-us' className='container-fluid'>
                            <div className='row'>
                                <div className='col-sm-7'>
                                    <p style={{fontSize: 40, paddingLeft: 20, paddingTop: 40}}>Xin chào bác sĩ</p>
                                    <h2 style={{paddingLeft: 20}}><strong>{list.name}</strong></h2>
                                </div>
                                <div className='col-sm-5'>
                                    <img src={doctor} width={220} style={{borderRadius: 150, paddingTop: 10}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div id='clock'>
                            <h2 style={{textAlign: "center", paddingTop: 15}}> 
                                <form className='form-inline' style={{marginLeft: '25%'}}>
                                  <p>Ngày</p>  <p id='day' style={{marginRight: 5, marginLeft: 5}}>{day}</p> <p>tháng</p> <p id='month' style={{marginLeft: 5, marginRight: 5}}>{month}</p> <p>năm</p> <p id='year' style={{marginLeft: 5}}>{year}</p>
                                </form> 
                            </h2>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div id='count-ps'>
                                    <h4 style={{textAlign: "center", paddingTop: 10}}>Bệnh nhân hiện tại</h4>
                                    <h1 style={{textAlign: 'center', marginTop: '30px'}}>{this.state.count.current}</h1>
                                </div>
                            </div>
                            <div className='col'>
                                <div id='sum-ps'>
                                    <h4 style={{textAlign: "center", paddingTop: 10}}>Tổng số bệnh nhân</h4>
                                    <h1 style={{textAlign: 'center', marginTop: '30px'}}>{this.state.count.count}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div id='chart'>

                            </div>                             
                        </div>
                        <div className='col-sm-6'>
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style={{marginTop: '20px'}}>
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                    <img src={img3} class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                    <img src={img1} class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                    <img src={img2} class="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>            
          </div>
        );
    }
}

export default Dashboard;