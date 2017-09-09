import React, { Component } from 'react';
import Form from './form.js';
import _usuario from './js/models/usuario.js'
import _servico from './js/models/servico.js'
import _departamento from './js/models/departamento.js'
import _requisicao from './js/models/requisicao.js'
import _anexo from './js/models/anexo.js'

class RequisicaoForm extends Component {
    constructor(props){
        super(props);

        console.log('item',this.props.item);

        var id_usuario = -1;
        var id_requisicao = -1;
        if (this.props.item) {
            id_usuario = this.props.item.id_usuario;
            id_requisicao = this.props.item.id;
        }

        this.state = {
            id: id_requisicao,
            IdSolicitante: id_usuario,
            listAnexos: [],
            listSolicitantes:[],
            listServicos:[],
            selectedServicos:[],
            listDepartamentos:[],
            selectedDepartamentos:[]
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
        this.handleUploadAnexoResponse = this.handleUploadAnexoResponse.bind(this);

        this.handleGetDepartamentosRequisicaoResponse = this.handleGetDepartamentosRequisicaoResponse.bind(this);
        this.handleGetServicosRequisicaoResponse = this.handleGetServicosRequisicaoResponse.bind(this);
        this.handleGetAnexosRequisicaoResponse = this.handleGetAnexosRequisicaoResponse.bind(this);

    }
    handleGetDepartamentosRequisicaoResponse (res) {
        console.log("resultado get departamentos solicitacao",res);
        if (res.success) {
            var selectedDeps = [];
            for (var index = 0; index < res.data.data.length; index++) {
                selectedDeps.push(res.data.data[index].id_departamento);
            }

            console.log("new selectedDepartamentos",selectedDeps);
            this.setState({selectedDepartamentos: selectedDeps})
        }
    }
    handleGetServicosRequisicaoResponse (res) {
        console.log("resultado get Servicos solicitacao",res);
        if (res.success) {
            var selected = [];
            for (var index = 0; index < res.data.data.length; index++) {
                selected.push(res.data.data[index].id_servico);
            }

            console.log("new selectedServicos",selected);
            this.setState({selectedServicos: selected})
        }
    }
    handleGetAnexosRequisicaoResponse (res) {
        console.log("resultado get Anexos solicitacao",res);
        if (res.success) {
            var anexos = [];
            for (var index = 0; index < res.data.data.length; index++) {
                anexos.push(res.data.data[index]);
            }

            console.log("new listAnexos",anexos);
            this.setState({listAnexos: anexos})
        }
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

        if (this.state.id > 0) {
            // find selected departamentos by requisicao id
            _requisicao.getDepartamentos(this.state.id, this.handleGetDepartamentosRequisicaoResponse);

            // find selected services by requisicao id
            _requisicao.getServicos(this.state.id, this.handleGetServicosRequisicaoResponse);

            // find anexos
            _requisicao.getAnexos(this.state.id, this.handleGetAnexosRequisicaoResponse);
        }
    }
    handleCreateRequisicaoResponse (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            alert('Requisição realizada com sucesso');
            this.props.onSaved();  
        } else {
            alert('Não foi possível realizar a requisição');
        }
    }
    handleSubmit(event){
        var data = {
            id_usuario: this.state.IdSolicitante,
            servicos: this.state.selectedServicos,
            departamentos: this.state.selectedDepartamentos,
            anexos: this.state.listAnexos
        };

        _requisicao.create(data, this.handleCreateRequisicaoResponse);

        event.preventDefault();
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleSolicitanteChange(event){
        this.setState({IdSolicitante: event.target.value})
    }
    handleServicoCheckBoxChange(event){
        console.log(event.target);

        var selected = this.state.selectedServicos;
        var index = selected.indexOf(event.target.id);

        if (index !== -1) {
            selected.splice(index, 1);
        }
        else{
            selected.push(event.target.id);
        }

        console.log(selected);
        this.setState({selectedServicos: selected})
    }
    handleDepartamentoCheckBoxChange(event){
        console.log(event.target);

        var selectedDeps = this.state.selectedDepartamentos;

        var index = selectedDeps.indexOf(event.target.id);

        if (index !== -1) {
            selectedDeps.splice(index, 1);
        }
        else{
            selectedDeps.push(event.target.id);
        }
        console.log(selectedDeps);

        this.setState({selectedDepartamentos: selectedDeps})
    }

    handleUploadAnexoResponse (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            const documents = this.state.listAnexos.concat(res.data);
            this.setState({ listAnexos: documents });
            
            console.log('files',this.state.listAnexos);

            alert('Arquivo adicionado com sucesso');
        } else {
            alert('Não foi adicionar o arquivo');
        }
    }
    handleFileSelect(event) {
        console.log(event.target.files[0]);
        const anexo = event.target.files[0];
        _anexo.upload(anexo, this.handleUploadAnexoResponse);
    }
    handleAnexoDeleteClick(event) {
        console.log(event.target);
        console.log(this.state.listAnexos);

        this.state.listAnexos.splice(event.target.id, 1);
        this.setState({ listAnexos: this.state.listAnexos });
        
        console.log('files',this.state.listAnexos);
    }
  render() {

    const documents = this.state.listAnexos.map((anexo, index) => {
      return <tr key={index}>
                <td>{anexo.originalname}</td> 
                <td><i id={index} 
                        className="glyphicon glyphicon-trash" 
                        onClick={this.handleAnexoDeleteClick}></i></td> 
            </tr>
    });

    const solicitantesNome = this.state.listSolicitantes.map((resp, idx) =>{
                        return <option key={idx} value={resp.id}>{resp.nome}</option>
                    });

    const solicitantesMatricula = this.state.listSolicitantes.map((resp, idx) =>{
                        return <option key={idx} value={resp.id}>{resp.matricula}</option>
                    });

    const servicosRender = this.state.listServicos.map((servico, idx)=>{

        var selected = this.state.selectedServicos.find(function (item) {
            return item == servico.id;
        })

        var checkbox;

        if (selected) {
            checkbox = <input checked 
                            id={servico.id} 
                            type="checkbox" 
                            onClick={this.handleServicoCheckBoxChange}/> 
        } else {
            checkbox = <input 
                            id={servico.id} 
                            type="checkbox" 
                            onClick={this.handleServicoCheckBoxChange}/> 
        }

        return <li key={idx}>
            <label>
                {checkbox}
                {servico.nome}
            </label>
        </li>
    })

    const departamentosRender = this.state.listDepartamentos.map((departamento, idx)=>{

        var selectedDep = this.state.selectedDepartamentos.find(function (item) {
            return item == departamento.id;
        })

        var checkbox;

        if (selectedDep) {
            checkbox = <input checked 
                            id={departamento.id} 
                            type="checkbox" 
                            onChange={this.handleDepartamentoCheckBoxChange}/>
        } else {
            checkbox = <input 
                            id={departamento.id} 
                            type="checkbox" 
                            onChange={this.handleDepartamentoCheckBoxChange}/>
        }
        return <li key={idx}>
            <label>
                {checkbox}
                {departamento.nome}
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