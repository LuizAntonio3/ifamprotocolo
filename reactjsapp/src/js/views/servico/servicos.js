import React, { Component } from 'react';
import Crud from './crud.js';
import ServicoForm from './servicoform.js'

const tableHeaders = [
  {id:0, name:"ID" },
  {id:1, name:"Nome"},
];

const tableItems = [
  {id:0, name:"Historico"},
  {id:1, name:"Laboratório"},
  {id:2, name:"Transferência"},
  {id:3, name:"Abono"}
];

class Servicos extends Component {
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
        tela = <ServicoForm onBtnCancelClicked={this.handleSubmit} onSubmitClicked={this.handleSubmit} tableItems={tableItems} tableHeaders={tableHeaders}/> 
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Servicos;
