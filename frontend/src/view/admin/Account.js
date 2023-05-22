import React from 'react';
import axios from 'axios';

function kiemTraID(){
    const id = document.getElementById("id").value;
    if(id == ""){
        document.getElementById("id").style.border = "2px solid red";
        return false;
    }
    document.getElementById("id").style.border = "2px solid #00FF00";
    return true;
}

class Account extends React.Component{

    refresh = () => {
        window.location.reload();
    }

    constructor (props){
        super(props)
        this.state = {
            account: [],
            id: '',
            currentPage: 1,
            newsPerPage: 5,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
        axios.get("http://localhost:9000/listAcc")
        .then(res => {
            this.setState({
               account: res.data
            });
        })
        .catch(function (err){
            console.log(err);
        })
    }

    handleDelete = e => {
        e.preventDefault();
        
        axios.delete(`http://localhost:9000/deleteAcc/${this.state.id}`)
          .then(res => {
            console.log(res);
            this.refresh();
        })
        .catch(function (err){
            console.log(err);
        })
    }

    listAccount(){
        if(this.state.account instanceof Array){
            return this.state.account.map(function(object, i){
                return (
                    <tbody style={{textAlign: 'center'}}>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{object.name}</td>
                            <td>{object.username}</td>
                            <td>{object.role}</td>
                            <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target={"#myModal"+object.id}>Xóa</button></td>
                        </tr>
                        <div class="modal fade" id={"myModal"+object.id}>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3><i class="fas fa-question-circle"></i> Thông báo</h3>
                                        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <form onSubmit={this.handleDelete}>
                                            <h2 style={{textAlign: 'center', color: 'red', fontSize: '70px'}}><i class="fas fa-exclamation-circle"></i></h2>
                                            <h4 style={{textAlign: 'center',}}>Bạn có chắc muốn xóa tài khoản này không?</h4>
                                            <p style={{textAlign: 'center'}}>Vui lòng nhập lại <strong className='text-danger' style={{fontSize: 18}}>{object.id}</strong> vào <strong>ô bên dưới</strong> để xóa tài khoản này</p>
                                            <div className='form-inline' style={{paddingLeft: 27}}>
                                                <label for="id">Mã hồ sơ: </label>
                                                <input type="text" className='form-control' id='id' name="id" style={{marginLeft: 20}} onChange={(e)=>this.setState({id:e.target.value})} onBlur={kiemTraID} required/>
                                            </div>
                                            <div class="form-inline" style={{marginLeft: '135px', marginTop: '20px'}}>
                                                <button type='submit' class="btn btn-success" style={{marginRight: '20px'}}><i class="far fa-check-circle"></i> Đồng ý</button>	
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Hủy</button>			        	
                                            </div>                                    
                                        </form>
                                    </div>
                                    <div class="modal-footer"></div>
                                </div>
                            </div>
                        </div>  
                    </tbody>      
                );
            });   
        }else{
            return <div>Loading...</div>;
        }        
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
        const currentTodos = this.state.account.slice(indexOfFirstNews, indexOfLastNews);
        const renderTodos = currentTodos.map((object, i) => {
            return (
                <tbody style={{textAlign: 'center'}}>
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{object.name}</td>
                        <td>{object.username}</td>
                        <td>{object.role}</td>
                        <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target={"#myModal"+object.id}>Xóa</button></td>
                    </tr>
                    <div class="modal fade" id={"myModal"+object.id}>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3><i class="fas fa-question-circle"></i> Thông báo</h3>
                                    <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={this.handleDelete}>
                                        <h2 style={{textAlign: 'center', color: 'red', fontSize: '70px'}}><i class="fas fa-exclamation-circle"></i></h2>
                                        <h4 style={{textAlign: 'center',}}>Bạn có chắc muốn xóa tài khoản này không?</h4>
                                        <p style={{textAlign: 'center'}}>Vui lòng nhập lại <strong className='text-danger' style={{fontSize: 18}}>{object.id}</strong> vào <strong>ô bên dưới</strong> để xóa tài khoản này</p>
                                        <div className='form-inline' style={{paddingLeft: 27}}>
                                            <label for="id">Mã hồ sơ: </label>
                                            <input type="text" className='form-control' id='id' name="id" style={{marginLeft: 20}} onChange={(e)=>this.setState({id:e.target.value})} onBlur={kiemTraID} required/>
                                        </div>
                                        <div class="form-inline" style={{marginLeft: '135px', marginTop: '20px'}}>
                                            <button type='submit' class="btn btn-success" style={{marginRight: '20px'}}><i class="far fa-check-circle"></i> Đồng ý</button>	
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="fas fa-times-circle"></i> Hủy</button>			        	
                                        </div>                                    
                                    </form>
                                </div>
                                <div class="modal-footer"></div>
                            </div>
                        </div>
                    </div>                     
                </tbody>
            );
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.account.length / newsPerPage); i++) {
          pageNumbers.push(i);
        }
        return(
            <div>
                <div className='box-table'>
                    <h2 style={{textAlign: 'center', paddingTop: 10}}><i class="fas fa-list"></i> Danh sách tài khoản</h2>
                    <div style={{marginTop: 30, marginLeft: 70, marginRight: 70}}>
                        <table class="table table-bordered table-hover">
                            <thead style={{textAlign: 'center'}}>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope='col'>Tên người dùng</th>
                                    <th scope="col">Tên tài khoản</th>
                                    <th scope="col">Vai trò</th>
                                    <th scope="col">Cài đặt</th>
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
                                        <li key={number} id={number} style={{paddingLeft: 10, paddingRight: 10}} className='activepage2'>
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
                </div>
            </div>
        )
    }
}

export default Account;