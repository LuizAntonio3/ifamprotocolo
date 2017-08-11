import React, { Component } from 'react';
import './requisicoes.css';

const tableHeaders = [
  {id:1, name:"Nome" }
];

const tableItems = [
  {id: "001", name:"Protocolo"},
  {id: "002", name:"Protocolo"}
];


class Departamentos extends Component {
  render() {

    const tableHeader = tableHeaders.map((item) =>
                <th key={item.id}>{item.name}</th>
            , this);

    const tableLines = tableItems.map((item) =>
                <tr key={item.id}>
                    <td>{item.name}</td> 
                </tr>
            , this);

    return (
          <div id="page-content-wrapper">
            <h1>Departamentos</h1>
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

export default Departamentos;
