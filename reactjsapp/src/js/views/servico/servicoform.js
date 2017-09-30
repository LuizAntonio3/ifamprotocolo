import React, { Component } from 'react';
import Form from '../form.js';
var _servico = require('../../models/servico')

class ServicoForma extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateServico = this.handleCreateServico.bind(this);
    }
    handleCreateServico (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            alert('Serviço criado com sucesso');
            this.props.onSaved();  
        } else {
            alert('Não foi possível realizar a servico');
        }
    }
    handleSubmit(event){
        this.props.onSubmitClicked(event);

        var data = {
            nome: this.state.nome,
            id_curso: this.state.id_curso
        };

        _servico.create(data, this.handleCreateServico);
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleChange(event){
        this.setState({
            nome: event.target.value
        });
    }
  render() {
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
                                onChange={this.handleChange}
                                value={this.state.nome}/>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default ServicoForma;