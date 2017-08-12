import React, { Component } from 'react';
import './servicos.css';

const tableHeaders = [
  "Serviço"
];

const tableItems = [
  {id:0, name:"Historico"},
  {id:1, name:"Laboratório"},
  {id:2, name:"Transferência"},
  {id:3, name:"Abono"}
];

class Servicos extends Component {
  render() {
    const tableHeader = tableHeaders.map((item, id) =>
                <th key={id}>{item}</th>
            , this);

    const tableLines = tableItems.map((item) =>
                <tr key={item.id}>
                    <td>{item.name}</td> 
                </tr>
            , this);

    return (
          <div id="page-content-wrapper">
            <h1>Serviços</h1>
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

export default Servicos;
