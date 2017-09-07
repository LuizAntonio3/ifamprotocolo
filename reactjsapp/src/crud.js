import React, { Component } from 'react';
import './crud.css';

class Crud extends Component {
  render() {
    const tableHeaders = this.props.tableHeaders.map((item) =>
        <th key={item.id}>{item.name}</th>
    , this);

    const columns = this.props.tableHeaders.map((item) =>
        {return item.column;}
    , this);

    const tableRows = this.props.tableItems.map((item) =>{
                var keys = Object.keys(item);

                console.log(keys)
                console.log(item)
        
                // make cells
                var cells = [];
                for (var index = 0; index < keys.length; index++) {
                    if (columns.indexOf(keys[index]) !== -1) {
                        cells.push(
                            <td key={index}>{item[keys[index]]}</td> 
                        );
                    }
                }

                // make
                cells.push( <td key={keys.length + 1}>
                        <i id={item.id} className="glyphicon glyphicon-trash"  onClick={this.props.onItemDeleteClicked}></i> 
                         | <i id={item.id} className="glyphicon glyphicon-edit"  onClick={this.props.onItemEditClicked}></i>
                         | <i id={item.id} className="glyphicon glyphicon-info-sign"  onClick={this.props.onItemInfoClicked}></i>
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
