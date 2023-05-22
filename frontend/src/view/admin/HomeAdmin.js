import React from 'react';
import axios from 'axios';

class HomeAdmin extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            count: [],
        }
    }

    componentWillMount(){
        axios.get("http://localhost:9000/countAcc")
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
            <div>
                <div style={{display: 'inline-flex'}}>
                    <div className='box-1'>
                        <h4 style={{textAlign: 'center', paddingTop: 10}}>Tổng số tài khoản</h4>
                        <p style={{fontSize: 50, textAlign: 'center'}}> <strong>{this.state.count.count}</strong> </p>
                    </div>
                    <div className='box-2'>
                        <h4 style={{textAlign: 'center', paddingTop: 10}}>Số tài khoản bác sĩ</h4>
                        <p style={{fontSize: 50, textAlign: 'center'}}> <strong>{this.state.count.doctor}</strong> </p>
                    </div>
                    <div className='box-3'>
                        <h4 style={{textAlign: 'center', paddingTop: 10}}>Số tài khoản bệnh nhân</h4>
                        <p style={{fontSize: 50, textAlign: 'center'}}> <strong>{this.state.count.benhnhan}</strong> </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAdmin;