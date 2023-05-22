import React, { Component} from 'react';



class Record extends Component{

    render(){
        return(
            <div className='col-sm-3' style={{marginTop: 20, marginBottom: 10}}>
                <div class="card" style={{width: '18rem'}}>
                    <h1 style={{textAlign: 'center', fontSize: 150}}><i class="far fa-user-circle"></i></h1>
                    <div class="card-body">
                        <h5 class="card-title" style={{textAlign: 'center'}}>{this.props.obj.name}</h5>
                        <button type="button" class="btn btn-primary" style={{marginLeft: '22%'}}><a href="#" style={{color: 'white', textDecoration: 'none'}}>Thu thập dữ liệu</a></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Record;