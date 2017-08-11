import React, { Component } from 'react';
import './requisicoes.css';

const tableHeaders = [
  {id:0, name:"Matricula" },
  {id:1, name:"Nome" },
  {id:2, name:"Email" },
  {id:3, name:"Telefone" }
];

const tableItems = [
  {matricula: "001", name:"Robson", email: "robson.rojas@gmail.com", telefone: "981125791",},
  {matricula: "002", name:"Adriana", email: "adriana.david.silva19@gmail.com", telefone: "981125791",}
];

class Usuarios extends Component {
  render() {
    const tableHeader = tableHeaders.map((item) =>
                <th key={item.id}>{item.name}</th>
            , this);

    const tableLines = tableItems.map((item) =>
                <tr key={item.matricula}>
                <td>{item.matricula}</td> 
                <td>{item.name}</td> 
                <td>{item.email}</td> 
                <td>{item.telefone}</td> 
                </tr>
            , this);

    return (
          <div id="page-content-wrapper">
            <h1>Usuários</h1>
                <p>
                    <button id="btnSalvar"
                        className="btn btn-sm btn-primary">
                        Novo
                    </button>
                </p>
                <div id="listagem">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                        </thead>
                        <tbody>
                            {tableLines}
                        </tbody>
                    </table>
                </div>
          </div>
    );
  }
}

export default Usuarios;
