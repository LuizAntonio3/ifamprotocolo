import React, { Component } from 'react';
import Crud from './crud.js';
import RequisicaoForm from './requisicaoform.js'
import _requisicao from './js/models/requisicao.js'

// const tableItems = [
//   {id:0, data:"15/06/2017 00:10:00", status: "Em espera"},
//   {id:1, data:"16/06/2017 00:10:00", status: "Em espera"}
// ];

class Requisicoes extends Component {
    constructor(props){
        super(props);

        this.state = {
            showCrud: true,
            listItems:[]
        }

        this.handleBtnNovoClicked = this.handleBtnNovoClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleDeleteRequisicaoResponse (id, res) {
        console.log(res);
        console.log(id);
        if (res.success) {

            alert("Item removido com sucesso");

            // find the item by id and remove it
            var idx = -1;
            for (var index = 0; index < this.state.listItems.length; index++) {
                if (this.state.listItems[index].id == id) {
                    idx = index
                    break;
                }
            }

            this.state.listItems.splice(idx, 1);
            this.setState({ listItems: this.state.listItems });
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
            showCrud: false
        })
    }
    handleSubmit(event){
        this.setState({
            showCrud: true
        })
    }
    handleItemDeleteClick(event) {
        console.log("delete",event.target);
        console.log("delete",event.target.id);

        _requisicao.delete(event.target.id, this.handleDeleteRequisicaoResponse)
    }
    handleItemEditClick(event) {
        console.log("edit",event.target.id);
        // console.log(this.state.listAnexos);

        // this.state.listAnexos.splice(event.target.id, 1);
        // this.setState({ listAnexos: this.state.listAnexos });
        
        // console.log('files',this.state.listAnexos);
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

    if (this.state.showCrud) {
        tela = <Crud 
                    onNovoClicked={this.handleBtnNovoClicked} 
                    onItemDeleteClicked={this.handleItemDeleteClick}
                    onItemEditClicked={this.handleItemEditClick}
                    onItemInfoClicked={this.handleItemInfoClick}
                    crudHeaderText='Requisições' 
                    tableItems={this.state.listItems} 
                    tableHeaders={this.tableHeaders}/> 
    } else {
        tela = <RequisicaoForm 
                    onBtnCancelClicked={this.handleSubmit}
                    onSubmitClicked={this.handleSubmit}/> 
    }

    return (
          <div>
              {tela}
          </div>
    );
  }
}

export default Requisicoes;
