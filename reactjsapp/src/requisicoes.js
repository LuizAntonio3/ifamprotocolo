import React, { Component } from 'react';
import Crud from './crud.js';
import RequisicaoForm from './requisicaoform.js'

const tableHeaders = [
  {id:0, name:"ID" },
  {id:1, name:"Usuário"},
  {id:2, name:"Serviço"},
  {id:3, name:"Departamento"},
  {id:4, name:"Data"},
  {id:5, name:"Status"}
];

const tableItems = [
  {id:0, name:"Robson", servico:"serv1", depto: "depto1", data:"15/06/2017 00:10:00", status: "Em espera"},
  {id:1, name:"Adriana", servico:"serv2", depto: "depto2", data:"16/06/2017 00:10:00", status: "Em espera"}
];

class Requisicoes extends Component {
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
        tela = <Crud onNovoClicked={this.handleBtnNovoClicked} crudHeaderText='Requisições' tableItems={tableItems} tableHeaders={tableHeaders}/> 
    } else {
        tela = <RequisicaoForm onBtnCancelClicked={this.handleSubmit} onSubmitClicked={this.handleSubmit} tableItems={tableItems} tableHeaders={tableHeaders}/> 
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Requisicoes;
