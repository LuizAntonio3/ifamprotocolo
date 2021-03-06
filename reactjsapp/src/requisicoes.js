import React, { Component } from 'react';
import './requisicoes.css';

const tableHeaders = [
  {id:0, name:"Usuário"},
  {id:1, name:"Serviço"},
  {id:2, name:"Departamento"},
  {id:3, name:"Data"},
  {id:4, name:"Status"}
];

const tableItems = [
  {id:0, name:"Robson", servico:"serv1", depto: "depto1", data:"15/06/2017 00:10:00", status: "Em espera"},
  {id:1, name:"Adriana", servico:"serv2", depto: "depto2", data:"16/06/2017 00:10:00", status: "Em espera"}
];

class Requisicoes extends Component {
  render() {
    const tableHeader = tableHeaders.map((item) =>
                <th key={item.id}>{item.name}</th>
            , this);

    const tableLines = tableItems.map((item) =>
                <tr key={item.id}>
                <td>{item.name}</td> 
                <td>{item.servico}</td> 
                <td>{item.depto}</td> 
                <td>{item.data}</td> 
                <td>{item.status}</td> 
                </tr>
            , this);

    return (
          <div id="page-content-wrapper">
            <h1>Requisicoes</h1>
                <p>
                    <button id="btnSalvar"
                        className="btn btn-sm btn-primary">
                        Nova
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

export default Requisicoes;
