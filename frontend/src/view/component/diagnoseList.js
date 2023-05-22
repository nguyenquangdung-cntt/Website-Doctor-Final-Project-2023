import React, { Component} from 'react';

class diagnoseList extends Component{
    render(){
        return(
            <tbody>
                <tr>
                    <td style={{textAlign:'justify',width: '400px'}}>{this.props.obj.diagnosis}</td>
                    <td style={{textAlign: 'center'}}>{this.props.obj.date}</td>
                    <td style={{textAlign: 'center'}}>{this.props.obj.doctor}</td>
                </tr>
            </tbody>
        )
    }
}

export default diagnoseList;