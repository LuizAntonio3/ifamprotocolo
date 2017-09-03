import React, { Component } from 'react';
import Form from './form.js';
import _usuario from './js/models/usuario.js'
import _servico from './js/models/servico.js'
import _departamento from './js/models/departamento.js'
import _requisicao from './js/models/requisicao.js'

class RequisicaoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            IdSolicitante: -1,
            listAnexos: [],
            listSolicitantes:[],
            listServicos:[],
            listDepartamentos:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleSolicitanteChange = this.handleSolicitanteChange.bind(this);
        this.handleServicoCheckBoxChange = this.handleServicoCheckBoxChange.bind(this);
        this.handleDepartamentoCheckBoxChange = this.handleDepartamentoCheckBoxChange.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleAnexoDeleteClick = this.handleAnexoDeleteClick.bind(this);

        this.handleFetchSolicitantesResponse = this.handleFetchSolicitantesResponse.bind(this);
        this.handleFetchServicosResponse = this.handleFetchServicosResponse.bind(this);
        this.handleFetchDepartamentosResponse = this.handleFetchDepartamentosResponse.bind(this);
        this.handleCreateRequisicaoResponse = this.handleCreateRequisicaoResponse.bind(this);
    }
    handleFetchDepartamentosResponse (res) {
        console.log(res);
        if (res.success) {
            const Departamentos = this.state.listDepartamentos.concat(res.data);

            console.log('Departamentos', this.state.listDepartamentos);
            this.setState({listDepartamentos: Departamentos});
        }
    }
    handleFetchSolicitantesResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listSolicitantes.push({id: -1, nome: 'Selecione', matricula: 'Selecione'});
            const solicitantes = this.state.listSolicitantes.concat(res.data);

            console.log('solicitantes', this.state.listSolicitantes);
            this.setState({listSolicitantes: solicitantes});
        }
    }
    handleFetchServicosResponse (res) {
        console.log(res);
        if (res.success) {
            const solicitantes = this.state.listServicos.concat(res.data);

            console.log('servicos', this.state.listServicos);
            this.setState({listServicos: solicitantes});
        }
    }
    componentDidMount() {
        _usuario.listAll(this.handleFetchSolicitantesResponse)
        _servico.listAll(this.handleFetchServicosResponse);
        _departamento.listAll(this.handleFetchDepartamentosResponse);
    }
    componentWillMount = () => {
        this.selectedServicos = [];
        this.selectedDepartamentos = [];
        this.files = [];
    }

    handleCreateRequisicaoResponse (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            alert('Requisição realizada com sucesso');
        } else {
            alert('Não foi possível realizar a requisição');
        }
    }

    handleSubmit(event){
        var data = {
            id_usuario: this.state.IdSolicitante,
            servicos: this.selectedServicos,
            departamentos: this.selectedDepartamentos,
            anexos: this.state.listAnexos
        };

        _requisicao.create(data, this.handleCreateRequisicaoResponse);

        event.preventDefault();

        //this.props.onSubmitClicked(event);
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleSolicitanteChange(event){
        this.setState({IdSolicitante: event.target.value})
    }
    handleServicoCheckBoxChange(event){
        console.log(event.target);

        var index = this.selectedServicos.indexOf(event.target.id);

        if (index !== -1) {
            this.selectedServicos.splice(index, 1);
        }
        else{
            this.selectedServicos.push(event.target.id);
        }

        console.log(this.selectedServicos);
    }
    handleDepartamentoCheckBoxChange(event){
        console.log(event.target);

        var index = this.selectedDepartamentos.indexOf(event.target.id);

        if (index !== -1) {
            this.selectedDepartamentos.splice(index, 1);
        }
        else{
            this.selectedDepartamentos.push(event.target.id);
        }
        
        console.log(this.selectedDepartamentos);
    }

    handleFileSelect(event) {
        console.log(event.target.files[0]);
        this.files.push(event.target.files[0]);
        
        const documents = this.state.listAnexos.concat(event.target.files[0]);
        this.setState({ listAnexos: documents });
        
        console.log('files',this.files);
    }
    handleAnexoDeleteClick(event) {
        console.log(event.target);

    }
  render() {
    const documents = this.state.listAnexos.map((anexo, index) => {
      return <tr key={index}>
                <td>{anexo.name}</td> 
                <td><i id={index} className="glyphicon glyphicon-trash" onClick={this.handleAnexoDeleteClick}></i></td> 
            </tr>
    });

    const solicitantesNome = this.state.listSolicitantes.map((resp, idx) =>{
                        return <option key={idx} value={resp.id}>{resp.nome}</option>
                    });

    const solicitantesMatricula = this.state.listSolicitantes.map((resp, idx) =>{
                        return <option key={idx} value={resp.id}>{resp.matricula}</option>
                    });

    const servicosRender = this.state.listServicos.map((servico, idx)=>{
    return <li key={idx}>
        <label>
            <input id={servico.id} type="checkbox" onClick={this.handleServicoCheckBoxChange}/> {servico.nome}
        </label>
    </li>
    })

    const departamentosRender = this.state.listDepartamentos.map((departamento, idx)=>{
    return <li key={idx}>
        <label>
            <input id={departamento.id} type="checkbox" onChange={this.handleDepartamentoCheckBoxChange}/> {departamento.nome}
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
                                {solicitantesNome}
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
                                {solicitantesMatricula}
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