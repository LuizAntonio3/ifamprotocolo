import React, { Component } from 'react';
import Form from '../form.js';
const _curso = require('../../models/curso.js')

class CursoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipo: 0,
            nome: '',
            ano_letivo: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleTipoChange = this.handleTipoChange.bind(this);
        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleAnoLetivoChange = this.handleAnoLetivoChange.bind(this);
        
        this.handleApiCall = this.handleApiCall.bind(this);
    }

    handleApiCall (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            this.props.onSubmitClicked(res);
        } else {
            alert(res.msg);
        }
    }
    handleSubmit(event){
        console.log('state: ' + this.state)

        _curso.create(this.state, this.handleApiCall)
        event.preventDefault();
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }

    handleTipoChange(event){
        this.setState({tipo: event.target.value})
    }
    handleNomeChange(event){
        this.setState({nome: event.target.value})
    }
    handleAnoLetivoChange(event){
        this.setState({ano_letivo: event.target.value})
    }

  render() {
    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
            <div className="form-group">
                    <label htmlFor="tipo" className="col-sm-3 control-label">
                        Tipo
                    </label>
                    <div className="col-sm-9">
                        <select id="tipo" 
                                    className="form-control" 
                                    autoFocus 
                                    required
                                    onChange={this.handleTipoChange}
                                    value={this.state.tipo}>
                            <option value="Nenhum">Nenhum</option>
                            <option value="Superior">Superior</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Médio">Médio</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome" className="col-sm-3 control-label">
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
                    <label htmlFor="ano_letivo" className="col-sm-3 control-label">
                        Ano Letivo</label>
                    <div className="col-sm-9">
                        <input type="number" id="ano_letivo"
                                placeholder="ano_letivo" 
                                className="form-control" 
                                required
                                onChange={this.handleAnoLetivoChange}
                                value={this.state.ano_letivo}/>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default CursoForm;