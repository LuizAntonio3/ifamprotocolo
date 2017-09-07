import React, { Component } from 'react';
import Crud from './crud.js';
import RequisicaoForm from './requisicaoform.js'
import _requisicao from './js/models/requisicao.js'

// const tableItems = [
//   {id:0, data:"15/06/2017 00:10:00", status: "Em espera"},
//   {id:1, data:"16/06/2017 00:10:00", status: "Em espera"}
// ];

var CrudState = {
    listagem: 0,
    novo: 1,
    edit: 2,
    view: 3
}

class Requisicoes extends Component {
    constructor(props){
        super(props);

        this.state = {
            crudState: CrudState.listagem, // 0 listagem, 1 novo, 2 edit, 3 view
            selectedItemId: -1,
            listItems:[]
        }

        this.handleBtnNovoClicked = this.handleBtnNovoClicked.bind(this);
        this.handleFormSaved = this.handleFormSaved.bind(this);
        this.handleFetchRequisicoesResponse = this.handleFetchRequisicoesResponse.bind(this);

        this.handleItemDeleteClick = this.handleItemDeleteClick.bind(this);
        this.handleItemEditClick = this.handleItemEditClick.bind(this);
        this.handleItemInfoClick = this.handleItemInfoClick.bind(this);

        this.handleDeleteRequisicaoResponse = this.handleDeleteRequisicaoResponse.bind(this);
    }
    handleFetchRequisicoesResponse (res) {
        console.log(res);
        if (res.success) {
            const Requisicoes = this.state.listItems.concat(res.data.data);

            console.log('Requisicoes', this.state.listItems);
            this.setState({listItems: Requisicoes});
        }
    }
    handleDeleteRequisicaoResponse (res) {
        console.log(res);
        console.log(this.state.selectedItemId);
        if (res.success) {

            alert("Item removido com sucesso");

            // find the item by id and remove it
            var idx = -1;
            for (var index = 0; index < this.state.listItems.length; index++) {
                if (this.state.listItems[index].id == this.state.selectedItemId) {
                    idx = index
                    break;
                }
            }

            this.state.listItems.splice(idx, 1);
            this.setState({ listItems: this.state.listItems, selectedItemId: -1 });
        }
    }
    componentDidMount() {
        _requisicao.listAll(this.handleFetchRequisicoesResponse)
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

        // reload requisicoes
        _requisicao.listAll(this.handleFetchRequisicoesResponse)


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
        this.setState({ selectedItemId: event.target.id, crudState: 2 });
    }
    handleItemInfoClick(event) {
        console.log("info",event.target.id);
        // console.log(this.state.listAnexos);

        // this.state.listAnexos.splice(event.target.id, 1);
        // this.setState({ listAnexos: this.state.listAnexos });
        
        // console.log('files',this.state.listAnexos);
    }
  render() {
    var tela;

    switch (this.state.crudState) {
        case 0: // listagem
            tela = <Crud 
                        onNovoClicked={this.handleBtnNovoClicked} 
                        onItemDeleteClicked={this.handleItemDeleteClick}
                        onItemEditClicked={this.handleItemEditClick}
                        onItemInfoClicked={this.handleItemInfoClick}
                        crudHeaderText='Requisições' 
                        tableItems={this.state.listItems} 
                        tableHeaders={this.tableHeaders}/>
            break;
        case 1: // novo
            tela = <RequisicaoForm 
                        onBtnCancelClicked={this.handleFormSaved}
                        onSaved={this.handleFormSaved}/>              
            break;
        case 2: // edit
            tela = <RequisicaoForm 
                        onBtnCancelClicked={this.handleFormSaved}
                        onSaved={this.handleFormSaved}/> 
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

export default Requisicoes;
