import React, { Component } from 'react';
import './crud.css';

class Crud extends Component {
    handleBtnNovoClick(event){
        // trocar para form
    }
  render() {
    const tableHeaders = this.props.tableHeaders.map((item) =>
        <th key={item.id}>{item.name}</th>
    , this);

    const tableRows = this.props.tableItems.map((item) =>{
                var keys = Object.keys(item);
        
                // make cells
                var cells = keys.map((key, index) =>{
                    return <td key={index}>{item[keys[index]]}</td> 
                }, this);

                // make
                cells.push( <td key={keys.length + 1}>
                        <i className="glyphicon glyphicon-trash"></i>
                        <i className="glyphicon glyphicon-edit"></i>
                        <i className="glyphicon glyphicon-info-sign"></i>
                </td> );
                return <tr key={item[keys[0]]}>
                    {cells}
                </tr>
            }
        , this);
    return (
          <div id="page-content-wrapper">
            <h1>{this.props.crudHeaderText}</h1>
                <p>
                    <button id="btnNovo" onClick={this.props.onNovoClicked}
                        className="btn btn-sm btn-primary">
                        Novo
                    </button>
                </p>
                <div id="listagem">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            {tableHeaders}
                            <th>Opções</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
          </div>
    );
  }
}

export default Crud;
