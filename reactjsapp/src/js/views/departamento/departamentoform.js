import React, { Component } from 'react';
import Form from '../form.js';
const _departamento = require('../../models/departamento.js')
const _responsavel_departamento = require('../../models/responsavel_departamento')

class DepartamentoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: '',
            id_responsavel: -1,
            listResponsaveis:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleNomeChange = this.handleNomeChange.bind(this);

        this.handleResponsavelChange = this.handleResponsavelChange.bind(this);
        this.handleFetchResponsaveisResponse = this.handleFetchResponsaveisResponse.bind(this);
        this.handleApiCall = this.handleApiCall.bind(this);
    }
    handleFetchResponsaveisResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listResponsaveis.push({id: -1, nome: 'Selecione', matricula: 'Selecione'});

            const responsaveis = this.state.listResponsaveis.concat(res.data);

            console.log('responsaveis', this.state.listResponsaveis);
            this.setState({listResponsaveis: responsaveis});
        }
    }
    handleResponsavelChange(event){
        this.setState({id_curso: event.target.value})
    }
    componentDidMount() {
        _responsavel_departamento.listAll(this.handleFetchResponsaveisResponse)
    }
    handleApiCall (res) {
        console.log('api response: ' + res);

        if (res.success) {
            alert('Departamento salvo com sucesso');
            this.props.onSaved(res);
        } else {
            alert(res.msg);
            this.props.onBtnCancelClicked(res);
        }
    }
    handleSubmit(event){
        console.log('state: ' + this.state)

        var data = {
            nome: this.state.nome,
            id_responsavel: -1
        };

        console.log('data: ' + data)

        _departamento.create(data, this.handleApiCall)
        event.preventDefault();
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleNomeChange(event){
        this.setState({
            nome: event.target.value
        });
    }
  render() {
    const responsavelRender = this.state.listResponsaveis.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });

    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
                <div className="form-group">
                    <label for="nome" className="col-sm-3 control-label">
                        Nome
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                id="nome" 
                                placeholder="Nome" 
                                className="form-control" 
                                required
                                onChange={this.handleNomeChange}
                                value={this.state.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="departamento" className="col-sm-2 control-label">
                        Responsaveis
                    </label>
                    <div className="col-sm-4">
                        <select id="departamentos" 
                                    className="form-control" 
                                    onChange={this.handleResponsavelChange}
                                    value={this.state.id_responsavel}>
                                    {responsavelRender}
                        </select>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default DepartamentoForm;