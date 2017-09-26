import React, { Component } from 'react';
import Crud from './crud.js';
import OperadorForm from './operadorform.js'
var _operador = require('../models/operador')

var CrudState = {
    listagem: 0,
    novo: 1,
    edit: 2,
    view: 3
}

class Operadores extends Component {
    constructor(props){
        super(props);

        this.state = {
            crudState: CrudState.listagem,
            selectedItemId: -1,
            selectedItem: null,
            listItems:[]
        }

        this.handleBtnNovoClicked = this.handleBtnNovoClicked.bind(this);
        this.handleFormSaved = this.handleFormSaved.bind(this);
        this.handleFetchOperadoresResponse = this.handleFetchOperadoresResponse.bind(this);

        this.handleItemDeleteClick = this.handleItemDeleteClick.bind(this);
        this.handleItemEditClick = this.handleItemEditClick.bind(this);
        this.handleItemInfoClick = this.handleItemInfoClick.bind(this);

        this.handleDeleteRequisicaoResponse = this.handleDeleteRequisicaoResponse.bind(this);
    }
    handleFetchOperadoresResponse (res) {
        console.log(res);
        if (res.success) {
            var list = [];

            list = list.concat(res.data.data);

            console.log('Operadores', list);
            this.setState({listItems: list});
        }
    }
    handleDeleteRequisicaoResponse (res) {
        console.log(res);
        console.log(this.state.selectedItemId);
        if (res.success) {

            alert("Item removido com sucesso");

            // find the item by id and remove it
            var id = this.state.selectedItemId;
            var idx = this.state.listItems.find(function (item) {
                return item.id == id;
            })

            this.state.listItems.splice(idx, 1);
            this.setState({ listItems: this.state.listItems, selectedItemId: -1 });
        }
    }
    componentDidMount() {
        _requisicao.listAll(this.handleFetchOperadoresResponse)
    }
    componentWillMount = () => {
        this.tableHeaders = [
                        {id:0, name:"ID", column: "id" },
                        {id:4, name:"Data", column: "createdAt"},
                        {id:5, name:"Status", column: "status"}
                        ];
    }
    handleBtnNovoClicked(event){
        this.setState({
            crudState: CrudState.novo
        })
    }
    handleFormSaved(event){

        // reload Operadores
        _requisicao.listAll(this.handleFetchOperadoresResponse)

        this.setState({
            crudState: CrudState.listagem
        })
    }
    handleItemDeleteClick(event) {
        console.log("delete",event.target);
        console.log("delete",event.target.id);

        this.setState({selectedItemId: event.target.id})

        _requisicao.delete(event.target.id, this.handleDeleteRequisicaoResponse)
    }
    handleItemEditClick(event) {
        console.log("edit",event.target.id);

        // find the item by id
        var id = event.target.id;
        var item = this.state.listItems.find(function (item) {
            return item.id == id;
        })

        this.setState({ selectedItem: item, crudState: CrudState.edit });
    }
    handleItemInfoClick(event) {
        console.log("info",event.target.id);
        this.setState({ selectedItemId: event.target.id, crudState: CrudState.view });
    }
  render() {
    var tela;

    switch (this.state.crudState) {
        case CrudState.listagem: // listagem
            tela = <Crud 
                        onNovoClicked={this.handleBtnNovoClicked} 
                        onItemDeleteClicked={this.handleItemDeleteClick}
                        onItemEditClicked={this.handleItemEditClick}
                        onItemInfoClicked={this.handleItemInfoClick}
                        crudHeaderText='Requisições' 
                        tableItems={this.state.listItems} 
                        tableHeaders={this.tableHeaders}/>
            break;
        case CrudState.novo: // novo
            tela = <RequisicaoForm 
                        onBtnCancelClicked={this.handleFormSaved}
                        onSaved={this.handleFormSaved}/>              
            break;
        case CrudState.edit: // edit
            tela = <RequisicaoForm 
                        onBtnCancelClicked={this.handleFormSaved}
                        onSaved={this.handleFormSaved}
                        item={this.state.selectedItem}/> 
            break;
    
        default:
            tela = <Crud 
                        onNovoClicked={this.handleBtnNovoClicked} 
                        onItemDeleteClicked={this.handleItemDeleteClick}
                        onItemEditClicked={this.handleItemEditClick}
                        onItemInfoClicked={this.handleItemInfoClick}
                        crudHeaderText='Requisições' 
                        tableItems={this.state.listItems} 
                        tableHeaders={this.tableHeaders}/>
            break;
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Operadores;
