import React, { Component } from 'react';
import Crud from './crud.js';
import DepartamentoForm from './departamentoform.js'

const tableHeaders = [
  {id:0, name:"ID" },
  {id:1, name:"Nome" }
];

const tableItems = [
  {id: "001", name:"Deperatamento1"},
  {id: "002", name:"Deperatamento2"}
];


class Departamentos extends Component {
    constructor(props){
        super(props);

        this.state = {
            showCrud: true
        }

        this.handleBtnNovoClicked = this.handleBtnNovoClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBtnNovoClicked(event){
        this.setState({
            showCrud: false
        })
    }
    handleSubmit(event){
        this.setState({
            showCrud: true
        })
    }
  render() {
    
    var tela;

    if (this.state.showCrud) {
        tela = <Crud onNovoClicked={this.handleBtnNovoClicked} crudHeaderText='Departamentos' tableItems={tableItems} tableHeaders={tableHeaders}/> 
    } else {
        tela = <DepartamentoForm onBtnCancelClicked={this.handleSubmit} onSubmitClicked={this.handleSubmit} tableItems={tableItems} tableHeaders={tableHeaders}/> 
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Departamentos;
