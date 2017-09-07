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
    }
    handleFetchRequisicoesResponse (res) {
        console.log(res);
        if (res.success) {
            const Requisicoes = this.state.listItems.concat(res.data.data);

            console.log('Requisicoes', this.state.listItems);
            this.setState({listItems: Requisicoes});
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
  render() {
    
    var tela;

    if (this.state.showCrud) {
        tela = <Crud 
                    onNovoClicked={this.handleBtnNovoClicked} 
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
