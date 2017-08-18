import React, { Component } from 'react';
import Crud from './crud.js';

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
    handleBtnNovoClick(event){
        // trocar para form
    }
  render() {

    return (
          <div>
              <Crud crudHeaderText='Usuários' tableItems={tableItems} tableHeaders={tableHeaders}/>
          </div>
    );
  }
}

export default Usuarios;
