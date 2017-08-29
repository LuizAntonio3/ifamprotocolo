import React, { Component } from 'react';
import Form from './form.js';

const solicitantes = [
{id: -1, nome: 'Selecione', matricula: 'Selecione'},
{id: 0, nome: 'Lucas', matricula: '123'},
{id: 1, nome: 'Luiz', matricula: '12345'},
{id: 2, nome: 'Paulo', matricula: '123456'},
{id: 3, nome: 'Laercio', matricula: '1234567'},
{id: 4, nome: 'João', matricula: '12345678'}
];

const servicos = [
{id: 0, nome: 'Laboratório', selected:0},
{id: 1, nome: 'Sala de aula', selected:0},
{id: 2, nome: 'Quadra Poliesportiva', selected:0}
];

const departamentos = [
{id: 0, nome: 'Secretaria', selected:0},
{id: 1, nome: 'Sala de professores', selected:0},
{id: 2, nome: 'Diretoria', selected:0}
];

class RequisicaoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            IdSolicitante: -1,
            listServicos: [],
            listAnexos: [],
            listDepartamentos: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleSolicitanteChange = this.handleSolicitanteChange.bind(this);
        this.handleServicoCheckBoxChange = this.handleServicoCheckBoxChange.bind(this);
        this.handleDepartamentoCheckBoxChange = this.handleDepartamentoCheckBoxChange.bind(this);
    }
    handleSubmit(event){
        this.props.onSubmitClicked(event);
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleSolicitanteChange(event){
        this.setState({IdSolicitante: event.target.value})
    }
    handleServicoCheckBoxChange(event){
        console.log(event.target);
        console.log(servicos[event.target.id]);
        servicos[event.target.id].selected &= servicos[event.target.id].selected;
    }
    handleDepartamentoCheckBoxChange(event){
        console.log(event.target);
        console.log(departamentos[event.target.id]);
        departamentos[event.target.id].selected &= departamentos[event.target.id].selected;
    }

  render() {

      let dadosSolicitante = {};
    if (this.state.IdSolicitante >= 0) {
        dadosSolicitante.matricula = solicitantes[this.state.IdSolicitante].matricula;
        dadosSolicitante.nome = solicitantes[this.state.IdSolicitante].nome;
    } else {
    }

    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
            <div className="form-group">
                <label>
                    Dados do solicitante:
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-2 control-label">
                    Solicitante
                </label>
                <div className="col-sm-4">
                    <select id="Solicitante" 
                                className="form-control" 
                                autoFocus
                                onChange={this.handleSolicitanteChange}
                                value={this.state.IdSolicitante}>
                                {
                                    solicitantes.map((resp, idx) =>{
                                        return <option key={idx} value={idx}>{resp.nome}</option>
                                    })
                                }
                    </select>
                </div>
            </div>


            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-2 control-label">
                    Matrícula
                </label>
                <div className="col-sm-4">
                    <select id="Matricula" 
                                className="form-control" 
                                onChange={this.handleSolicitanteChange}
                                value={this.state.IdSolicitante}>
                                {
                                    solicitantes.map((resp, idx) =>{
                                        return <option key={idx} value={idx}>{resp.matricula}</option>                
                                    })
                                }
                    </select>
                </div>
            </div>
			<div>
                <div className="form-group">
                    <label>
                        <b >Serviços:</b>
                    </label>
                </div>
                <div>
                    <ul>
                        {
                            servicos.map((servico, idx)=>{
                            return <li key={idx}>
                                <label>
                                    <input id={idx} type="checkbox" selected={servico.selected} onChange={this.handleServicoCheckBoxChange}/> {servico.nome}
                                </label>
                            </li>
                            })
                        }
                    </ul>
                </div>
            </div>
			<div>
                <div className="form-group">
                    <label>
                        <b >Anexos:</b>
                    </label>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Anexo 1: </label>
                    <div className="col-sm-3">
                        <input type="text" 
                                id="inputAnexo1" 
                                name="anexo_1"
                                className="form-control"/>
                    </div>
                    <div className="col-sm-1">
                        <i className="glyphicon glyphicon-paperclip">
                        </i>
                    </div>
                    <div className="col-sm-1">
                        <i className="glyphicon glyphicon-plus"></i>
                    </div>
                </div>
			</div> 
    		<div>
                <div className="form-group">
                    <label>
                        <b>Departamentos:</b>
                    </label>
                </div>
                <div>
                    <ul>
                        {
                            departamentos.map((departamento, idx)=>{
                            return <li key={idx}>
                                <label>
                                    <input id={idx} type="checkbox" selected={departamento.selected}  onChange={this.handleDepartamentoCheckBoxChange}/> {departamento.nome}
                                </label>
                            </li>
                            })
                        }
                    </ul>
                </div>
			</div> 
        </Form>
      </div>
    );
  }
}

export default RequisicaoForm;