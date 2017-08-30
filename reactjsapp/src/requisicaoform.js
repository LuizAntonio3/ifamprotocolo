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

var servicos = [
{id: 0, nome: 'Laboratório', selected:false},
{id: 1, nome: 'Sala de aula', selected:false},
{id: 2, nome: 'Quadra Poliesportiva', selected:false}
];

var departamentos = [
{id: 0, nome: 'Secretaria', selected:false},
{id: 1, nome: 'Sala de professores', selected:false},
{id: 2, nome: 'Diretoria', selected:false}
];

class RequisicaoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            IdSolicitante: -1,
            listAnexos: [],
            listDepartamentos: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleSolicitanteChange = this.handleSolicitanteChange.bind(this);
        this.handleServicoCheckBoxChange = this.handleServicoCheckBoxChange.bind(this);
        this.handleDepartamentoCheckBoxChange = this.handleDepartamentoCheckBoxChange.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleAnexoDeleteClick = this.handleAnexoDeleteClick.bind(this);
    }
    componentWillMount = () => {
        this.selectedServicos = new Set();
        this.selectedDepartamentos = new Set();
        this.files = [];
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

        if (this.selectedServicos.has(event.target.id)) {
            this.selectedServicos.delete(event.target.id);
        } else {
            this.selectedServicos.add(event.target.id);
        }
        console.log(this.selectedServicos);
    }
    handleDepartamentoCheckBoxChange(event){
        console.log(event.target);

        if (this.selectedDepartamentos.has(event.target.id)) {
            this.selectedDepartamentos.delete(event.target.id);
        } else {
            this.selectedDepartamentos.add(event.target.id);
        }
        console.log(this.selectedDepartamentos);
    }

    handleFileSelect(event) {
        console.log(event.target.files[0]);
        this.files.push(event.target.files[0]);
        
        const documents = this.state.listAnexos.concat(event.target.files[0].name);
        this.setState({ listAnexos: documents });
        
        console.log(this.files);
    }
    handleAnexoDeleteClick(event) {
        console.log(event.target);

    }
  render() {
    const documents = this.state.listAnexos.map((anexo, index) => {
      return <tr key={index}>
                <td>{anexo}</td> 
                <td><i id={index} className="glyphicon glyphicon-trash" onClick={this.handleAnexoDeleteClick}></i></td> 
            </tr>
    });

    const solicitantesRender = solicitantes.map((resp, idx) =>{
                        return <option key={idx} value={idx}>{resp.nome}</option>
                    });

    const servicosRender = servicos.map((servico, idx)=>{
    return <li key={idx}>
        <label>
            <input id={idx} type="checkbox" onClick={this.handleServicoCheckBoxChange}/> {servico.nome}
        </label>
    </li>
    })

    const departamentosRender = departamentos.map((departamento, idx)=>{
    return <li key={idx}>
        <label>
            <input id={idx} type="checkbox" onChange={this.handleDepartamentoCheckBoxChange}/> {departamento.nome}
        </label>
    </li>
    })

    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
            <div className="form-group">
                <label>Dados do solicitante:</label>
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
                                {solicitantesRender}
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
                                {solicitantesRender}
                    </select>
                </div>
            </div>
			<div>
                <div className="form-group">
                    <label><b >Serviços:</b></label>
                </div>
                <div><ul>{servicosRender}</ul></div>
            </div>
			<div>
                <div className="form-group">
                    <label><b >Anexos:</b></label>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">
                        Adicione um arquivo: 
                    </label>
                    <div className="col-sm-4">
                        <input type="file" 
                                onChange={this.handleFileSelect} 
                                className="form-control"/>                    
                    </div>
                </div>
                <div className="form-group ">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th >Arquivo</th>
                            <th>Opções</th>
                        </tr>
                        </thead>
                        <tbody>{documents}</tbody>
                    </table>
                </div>
			</div> 
    		<div>
                <div className="form-group">
                    <label><b>Departamentos:</b></label>
                </div>
                <div>
                    <ul>{departamentosRender}</ul>
                </div>
			</div> 
        </Form>
      </div>
    );
  }
}

export default RequisicaoForm;