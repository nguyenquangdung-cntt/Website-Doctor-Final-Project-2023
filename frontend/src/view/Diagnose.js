import React, { Component } from 'react';
import axios from 'axios';
import { parse, stringify } from 'qs';
import { withRouter } from "react-router";
import DiagnoseList from './component/diagnoseList';

const api = axios.create({
    paramsSerializer: {
      encode: parse,
      serialize: stringify,
    },
  })

class Diagnose extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            listDiagnose: [],
            currentPage: 1,
            newsPerPage: 5,
        }
    }

    componentWillMount(){
        const id = this.props.match.params.id;
        api.get(`http://localhost:9000/diagnose/${id}`)
        .then(res => {
            this.setState({
                listDiagnose: res.data
            })
        })
        .catch(function (err){
            console.log(err);
        })
    }

    listDiagnose(){
        if(this.state.listDiagnose instanceof Array){
            return this.state.listDiagnose.map(function(object, i){
                return <DiagnoseList obj={object} key={i}/>;
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
        const currentTodos = this.state.listDiagnose.slice(indexOfFirstNews, indexOfLastNews);
        const renderTodos = currentTodos.map((object, i) => {
          return <DiagnoseList obj={object} key={i}/>;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.listDiagnose.length / newsPerPage); i++) {
          pageNumbers.push(i);
        }
        return(
            <div>
                <div style={{border: '0px solid black', margin: 40, minHeight: '600px', backgroundColor: 'white'}}>
                    <h3 style={{textAlign: 'center', paddingTop: 20, paddingBottom: 20}}><i class="fas fa-history"></i> Lịch sử chuẩn đoán</h3>
                    <div style={{paddingLeft: 20, paddingRight: 20}}>
                        <table class="table table-bordered table-hover">
                            <thead style={{textAlign: 'center'}}>
                                <tr>
                                    <th scope="col">Nội dung</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Bác sĩ</th>
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

export default  withRouter(Diagnose);