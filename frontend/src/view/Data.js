import React from 'react';
import axios from 'axios';
import Record from './component/Record';


class Data extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            record: []
        }
    }

    componentWillMount(){
        axios.get("http://localhost:9000/listRecord")
        .then(res => {
            this.setState({
               record: res.data
            });
        })
        .catch(function (err){
            console.log(err);
        })
    }

    recordList(){
        if(this.state.record instanceof Array){
            return this.state.record.map(function(object, i){
                return <Record obj={object} key={i}/>;
            });   
        }else{
            return <div>Loading...</div>;
        }
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row' style={{marginTop: 20}}>
                    {this.recordList()}
                </div>
            </div>
        );
    }
}

export default Data;