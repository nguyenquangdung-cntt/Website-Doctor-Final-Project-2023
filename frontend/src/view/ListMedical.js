import React from 'react';
import axios from 'axios';
import ListRecord from './component/listRecord';

function findData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("find");
    filter = input.value.toUpperCase();
    table = document.getElementById("lis-ps");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}

class ListMedical extends React.Component{

    refresh = () => {
        window.location.reload();
    }

    constructor (props){
        super(props)
        this.state = {
            list: [],
            address: '',
            day: '',
            diagnosis: '',
            health: 'Nhiễm bệnh',
            hearBeat: '',
            id: "PS-0" + Math.floor(Math.random()*101)+1,
            name: '',
            oxyBlood: '',
            phone: '',
            sex: '',
            symptom: '',
            tempBody: '',
            devices: '',
            currentPage: 1,
            newsPerPage: 8
        }
    }

    componentWillMount(){
        axios.get("http://localhost:9000/listRecord")
        .then(res => {
            this.setState({
               list: res.data
            });
        })
        .catch(function (err){
            console.log(err);
        })
    }

    ListMedical(){
        if(this.state.list instanceof Array){
            return this.state.list.map(function(object, i){
                return <ListRecord obj={object} key={i}/>;
            });   
        }else{
            return <div>Loading...</div>;
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    
        axios.post(`http://localhost:9000/addPatient`, {           
                address: this.state.address,
                day: this.state.day,
                diagnosis: this.state.diagnosis,
                health: this.state.health,
                heartBeat: this.state.heartBeat,
                id: this.state.id,
                name: this.state.name,
                oxyBlood: this.state.oxyBlood,
                phone: this.state.phone,
                sex: this.state.sex,
                symptom: this.state.symptom,
                tempBody: this.state.tempBody,
                devices: this.state.devices,
            }
        )
          .then(res => {
            console.log(res);
            this.refresh();
          })
          .catch(function (err){
            console.log(err);
        })
    }
    chosePage = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        })
    }

    select = (event) => {
        this.setState({
          newsPerPage: event.target.value
        })
    }
      
    render(){
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentTodos = this.state.list.slice(indexOfFirstNews, indexOfLastNews);
        const renderTodos = currentTodos.map((object, i) => {
          return <ListRecord obj={object} key={i}/>;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.list.length / newsPerPage); i++) {
          pageNumbers.push(i);
        }
        return(
            <div>
                <div className='form-inline'>
                    <h1 style={{padding: 20}}>Hồ sơ bệnh nhân</h1>
                    <a href="#" style={{marginLeft: '32%', marginRight: 10}}><button type="button" className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#myModal"><i class="fas fa-user-plus"></i> Thêm hồ sơ</button></a>
                    <button type="button" className='btn btn-success'><i class="fas fa-file-download"></i> Tải về</button>
                    <div class="input-group mb-3" style={{paddingTop: 16, marginLeft: '10px'}}>
                        <input type="text" id='find' class="form-control" placeholder="Tìm kiếm..." style={{borderRight: 0 }} onKeyUp={findData}/>
                        <span id='search' class="input-group-text" style={{backgroundColor: 'white'}}><i type='button' class="fas fa-search"></i></span>
                    </div>
                </div>
                <div className='container'>
                    <table id='lis-ps' class="table table-bordered" style={{backgroundColor: 'white'}}>
                        <thead>
                            <tr style={{textAlign: 'center'}}>
                                <th style={{width: 150}}>ID</th>
                                <th style={{width: 150}}>Thiết bị</th>
                                <th>Tên</th>
                                <th style={{width: 150}}>Giới tính</th>
                                <th style={{width: 200}}>Ngày cách ly</th>
                                <th>Tình trạng sức khỏe</th>
                                <th colSpan='2'>Cài đặt</th>
                            </tr>
                        </thead>
                        {renderTodos}
                    </table>
                    <nav aria-label="Page navigation example" style={{marginLeft: '33%'}}>
                        <ul class="pagination" style={{paddingLeft: 100}}>
                        {
                            pageNumbers.map(number => {
                                if (this.state.currentPage === number) {
                                return (
                                    <li key={number} id={number} style={{paddingLeft: 10, paddingRight: 10}} className='activepage'>
                                    {number}
                                    </li>
                                )
                                }
                                else {
                                return (
                                    <li key={number} id={number} onClick={this.chosePage} >
                                    {number}
                                    </li>
                                )
                                }
                            })
                        }
                        </ul>
                    </nav>
                </div>

                <div class="modal fade" id="myModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title"><i class="fas fa-plus-square"></i> Thêm hồ sơ bệnh nhân</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <h1 style={{textAlign: 'center', fontSize: 100}}><i class="fas fa-user-circle"></i></h1>
                            <form style={{paddingLeft: 50, paddingRight: 50}} onSubmit={this.handleSubmit}>
                                <input type="text" className="form-control" id="id" name='id' value={this.state.id} hidden/>
                                <div className="mb-3" style={{marginTop: 20}}>
                                    <label for="name" className="form-label">Tên bệnh nhân:</label>
                                    <input type="text" className="form-control" id="name" name='name' onChange={(e)=>this.setState({name:e.target.value})}/>
                                </div>
                                <div className='form-inline'>
                                    <label for="sex" className="form-label">Giới tính:</label>
                                    <div class="form-check" style={{marginLeft: 40}}>
                                        <input type="radio" class="form-check-input" id="sex1" name="sex" value="Nam" onChange={(e)=>this.setState({sex:e.target.value})}/>Nam
                                    </div>
                                    <div class="form-check" style={{marginLeft: 30}}>
                                        <input type="radio" class="form-check-input" id="sex2" name="sex" value="Nữ" onChange={(e)=>this.setState({sex:e.target.value})}/>Nữ
                                    </div>
                                </div>
                                <div className="form-inline" style={{marginTop: 20}}>
                                    <label for="phone" className="form-label">Số điện thoại:</label>
                                    <input type="text" className="form-control" id="phone" name='phone' style={{marginLeft: 10, width: 557}} onChange={(e)=>this.setState({phone:e.target.value})}/>
                                </div>
                                <div className="form-inline" style={{marginTop: 20}}>
                                    <label for="address" className="form-label">Địa chỉ:</label>
                                    <input type="text" className="form-control" id="address" name='address' style={{marginLeft: 10, width: 604}} onChange={(e)=>this.setState({address:e.target.value})}/>
                                </div>
                                <div className='form-inline' style={{marginTop: 20}}>
                                    <label for="day" className="form-label">Ngày cách ly:</label>
                                    <input type="date" className='form-control' id='day' name="day" style={{marginLeft: 10, width: 562}} onChange={(e)=>this.setState({day:e.target.value})}/>
                                </div>
                                <div className="form-inline" style={{marginTop: 20}}>
                                    <label for="devices" className="form-label">Thiết bị:</label>
                                    <input type="text" className="form-control" id="devices" name='devices' style={{marginLeft: 10, width: 604}} onChange={(e)=>this.setState({devices:e.target.value})}/>
                                </div>                          
                                <div style={{marginTop: 20}}>
                                    <label for="symptom">Triệu chứng ban đầu:</label>
                                    <textarea class="form-control" rows="5" id="symptom" name="symptom" style={{resize: 'none'}} onChange={(e)=>this.setState({symptom:e.target.value})}></textarea>
                                </div>
                                <input type="text" id='health' name="health" value={this.state.health} hidden/>
                                <input type="text" id='diagnosis' name="diagnosis" value={this.state.diagnosis} hidden/>
                                <input type="text" id='heartBeat' name="heartBeat" value={this.state.hearBeat} hidden/>
                                <input type="text" id='oxyBlood' name="oxyBlood" value={this.state.oxyBlood} hidden/>
                                <input type="text" id='tempBody' name="tempBody" value={this.state.tempBody} hidden/>
                                <button type="submit" className='btn btn-dark' style={{marginTop: 20}}><i class="fas fa-plus-circle"></i> Thêm</button>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListMedical;