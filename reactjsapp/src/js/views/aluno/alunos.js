import React, { Component } from 'react';
import Crud from './crud.js';
import UsuarioForm from './usuarioform.js';
import _usuario from './js/models/usuario.js'

const tableHeaders = [
  {id:0, name:"Matrícula" },
  {id:1, name:"Nome" },
  {id:2, name:"Email" },
  {id:3, name:"Telefone" }
];

const tableItems = [
  {matricula: "001", name:"Robson", email: "robson.rojas@gmail.com", telefone: "981125791",},
  {matricula: "002", name:"Adriana", email: "adriana.david.silva19@gmail.com", telefone: "981125791",}
];

class Usuarios extends Component {
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
        tela = <Crud onNovoClicked={this.handleBtnNovoClicked} crudHeaderText='Usuários' tableItems={tableItems} tableHeaders={tableHeaders}/> 
    } else {
        tela = <UsuarioForm onBtnCancelClicked={this.handleSubmit} onSubmitClicked={this.handleSubmit} tableItems={tableItems} tableHeaders={tableHeaders}/> 
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Usuarios;
