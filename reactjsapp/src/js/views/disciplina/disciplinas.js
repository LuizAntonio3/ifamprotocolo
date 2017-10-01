import React, { Component } from 'react';
import Crud from '../crud.js';
import DisciplinaForm from './disciplinaform.js'
var _disciplina = require('../../models/disciplina')

var CrudState = {
    listagem: 0,
    novo: 1,
    edit: 2,
    view: 3
}

class Disciplinas extends Component {
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
        this.handleFetchItemsResponse = this.handleFetchItemsResponse.bind(this);

        this.handleItemDeleteClick = this.handleItemDeleteClick.bind(this);
        this.handleItemEditClick = this.handleItemEditClick.bind(this);
        this.handleItemInfoClick = this.handleItemInfoClick.bind(this);

        this.handleDeleteRequisicaoResponse = this.handleDeleteRequisicaoResponse.bind(this);
    }
    handleFetchItemsResponse (res) {
        console.log('items',res);
        if (res.success) {
            var list = [];

            list = list.concat(res.data);

            console.log('Disciplinas', list);
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
        _disciplina.listAll(this.handleFetchItemsResponse)
    }
    componentWillMount = () => {
        this.tableHeaders = [
                        {id:0, name:"ID", column: "id" },
                        {id:4, name:"Nome", column: "nome"},
                        {id:5, name:"Curso", column: "nome_curso"}
                        ];
    }
    handleBtnNovoClicked(event){
        this.setState({
            crudState: CrudState.novo
        })
    }
    handleFormSaved(event){

        // reload Disciplinas
        _disciplina.listAll(this.handleFetchItemsResponse)

        this.setState({
            crudState: CrudState.listagem
        })
    }
    handleItemDeleteClick(event) {
        console.log("delete",event.target);
        console.log("delete",event.target.id);

        this.setState({selectedItemId: event.target.id})

        _disciplina.delete(event.target.id, this.handleDeleteRequisicaoResponse)
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
                        crudHeaderText='Disciplinas' 
                        tableItems={this.state.listItems} 
                        tableHeaders={this.tableHeaders}/>
            break;
        case CrudState.novo: // novo
            tela = <DisciplinaForm 
                        onBtnCancelClicked={this.handleFormSaved}
                        onSaved={this.handleFormSaved}/>              
            break;
        case CrudState.edit: // edit
            tela = <DisciplinaForm 
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
                        crudHeaderText='Disciplinas' 
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

export default Disciplinas;
