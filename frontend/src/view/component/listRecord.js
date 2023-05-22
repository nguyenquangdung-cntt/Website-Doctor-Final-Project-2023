import React, { Component} from 'react';
import '../../w3.css';
import axios from 'axios';
import { withRouter } from "react-router";

function kiemTraID(){
    const id = document.getElementById("id").value;
    if(id == ""){
        document.getElementById("id").style.border = "2px solid red";
        return false;
    }
    document.getElementById("id").style.border = "2px solid #00FF00";
    return true;
}

class ListRecord extends Component {

    refresh = () => {
        window.location.reload();
    }

    constructor (props){
        super(props)
        this.state = {
            id:'',
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = e => {
        e.preventDefault();
        
        axios.delete(`http://localhost:9000/delete/${this.state.id}`)
          .then(res => {
            console.log(res);
            this.refresh();
        })
        .catch(function (err){
            console.log(err);
        })
    }

    render() {
        return(
            <tbody>
                <tr style={{textAlign: 'center'}}>
                    <td style={{paddingTop: 15}}>{this.props.obj.id}</td>
                    <td style={{paddingTop: 15}}>{this.props.obj.devices}</td>
                    <td style={{paddingTop: 15}}>{this.props.obj.name}</td>
                    <td style={{paddingTop: 15}}>{this.props.obj.sex}</td>
                    <td style={{paddingTop: 15}}>{this.props.obj.day}</td>
                    <td style={{paddingTop: 15}}>{this.props.obj.health}</td>
                    <td><a href={this.props.obj.id}><button type="button" className='btn btn-primary'><i class="fas fa-eye"></i> Xem</button></a></td>
                    <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target={"#myModal"+this.props.obj.id}><i class="fas fa-trash-alt"></i> Xóa</button></td>
                </tr>
                <div class="modal fade" id={"myModal"+this.props.obj.id}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3><i class="fas fa-question-circle"></i> Thông báo</h3>
                                <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleDelete}>
                                    <h2 style={{textAlign: 'center', color: 'red', fontSize: '70px'}}><i class="fas fa-exclamation-circle"></i></h2>
                                    <h4 style={{textAlign: 'center',}}>Bạn có chắc muốn xóa hồ sơ này không?</h4>
                                    <p style={{textAlign: 'center'}}>Vui lòng nhập lại <strong className='text-danger' style={{fontSize: 18}}>{this.props.obj.id}</strong> vào <strong>ô bên dưới</strong> để xóa hồ sơ này</p>
                                    <div className='form-inline' style={{paddingLeft: 27}}>
                                        <label for="id">Mã hồ sơ: </label>
                                        <input type="text" className='form-control' id='id' name="id" style={{marginLeft: 20}} onChange={(e)=>this.setState({id:e.target.value})} onBlur={kiemTraID} required/>
                                    </div>
                                    <div class="w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red">
                                        <h5 style={{ marginTop: 10 }}><i class="fas fa-exclamation-triangle" style={{color: 'red',}}></i><strong style={{color: 'red', marginLeft: '5px'}}> Cảnh báo</strong></h5>
                                        <p style={{color: 'red', marginLeft: '2rem'}}>Hồ sơ sau khi xóa sẽ <strong>không thể khôi phục</strong>.</p>
                                    </div>
                                    <div class="form-inline" style={{marginLeft: '135px'}}>
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
        )
    }
}

export default withRouter(ListRecord);