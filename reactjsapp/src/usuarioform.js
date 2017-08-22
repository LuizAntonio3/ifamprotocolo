import React, { Component } from 'react';
import Form from './form.js';
const Usuario = require('./js/models/usuario.js')

class CadastroUsuario extends Component {
    constructor(props){
        super(props);
        this.state = {
            tipo: 0,
            nome: '',
            email: '',
            matricula: '',
            telefone: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            senha: '',
            confirmaSenha: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleTipoChange = this.handleTipoChange.bind(this);
        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMatriculaChange = this.handleMatriculaChange.bind(this);
        this.handleTelefoneChange = this.handleTelefoneChange.bind(this);
        this.handleLogradouroChange = this.handleLogradouroChange.bind(this);
        this.handleNumeroChange = this.handleNumeroChange.bind(this);
        this.handleComplementoChange = this.handleComplementoChange.bind(this);
        this.handleBairroChange = this.handleBairroChange.bind(this);
        this.handleSenhaChange = this.handleSenhaChange.bind(this);
        this.handleConfirmaSenhaChange = this.handleConfirmaSenhaChange.bind(this);

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

        Usuario.create(this.state, this.handleApiCall)
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
    handleEmailChange(event){
        this.setState({email: event.target.value})
    }
    handleMatriculaChange(event){
        this.setState({matricula: event.target.value})
    }
    handleTelefoneChange(event){
        this.setState({telefone: event.target.value})
    }
    handleLogradouroChange(event){
        this.setState({logradouro: event.target.value})
    }
    handleNumeroChange(event){
        this.setState({numero: event.target.value})
    }
    handleComplementoChange(event){
        this.setState({complemento: event.target.value})
    }
    handleBairroChange(event){
        this.setState({bairro: event.target.value})
    }
    handleSenhaChange(event){
        this.setState({senha: event.target.value})
    }
    handleConfirmaSenhaChange(event){
        this.setState({confirmaSenha: event.target.value})
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
                            <option value="0">Nenhum</option>
                            <option value="1">Administrador</option>
                            <option value="2">Estudante</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="nome" className="col-sm-3 control-label">
                        Nome Completo
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                id="nome" 
                                placeholder="Nome Completo" 
                                className="form-control" 
                                required
                                onChange={this.handleNomeChange}
                                value={this.state.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-3 control-label">
                        Email</label>
                    <div className="col-sm-9">
                        <input type="email" id="email" 
                                placeholder="Email" 
                                className="form-control" 
                                required
                                onChange={this.handleEmailChange}
                                value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="matricula" className="col-sm-3 control-label">
                        Matrícula
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="matricula" 
                                placeholder="Matrícula" 
                                className="form-control"
                                onChange={this.handleMatriculaChange}
                                value={this.state.matricula}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="telefone" className="col-sm-3 control-label">
                        Telefone
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="telefone" 
                                placeholder="(92)991547542" 
                                className="form-control"
                                onChange={this.handleTelefoneChange}
                                value={this.state.telefone}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="logradouro" className="col-sm-3 control-label">
                        Logradouro
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="logradouro" 
                                placeholder="Rua 2" 
                                className="form-control"
                                onChange={this.handleLogradouroChange}
                                value={this.state.logradouro}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="numero" className="col-sm-3 control-label">
                        Numero
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="numero" 
                                placeholder="12542" 
                                className="form-control"
                                onChange={this.handleNumeroChange}
                                value={this.state.numero}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="bairro" className="col-sm-3 control-label">
                        Bairro
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="bairro" 
                                placeholder="Compensa" 
                                className="form-control"
                                onChange={this.handleBairroChange}
                                value={this.state.bairro}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="complemento" className="col-sm-3 control-label">
                        Complemento
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="complemento" 
                                placeholder="Onde judas perdeu as botas" 
                                className="form-control"
                                onChange={this.handleComplementoChange}
                                value={this.state.complemento}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="senha" className="col-sm-3 control-label">Senha</label>
                    <div className="col-sm-9">
                        <input type="password" id="senha" 
                                placeholder="Senha" 
                                className="form-control" required
                                onChange={this.handleSenhaChange}
                                value={this.state.senha}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmaSenha" 
                            className="col-sm-3 control-label">
                            Confirmação de senha
                    </label>
                    <div className="col-sm-9">
                        <input type="password" 
                                    id="confirmaSenha" 
                                    placeholder="Confirmação de senha" 
                                    className="form-control" required
                                    onChange={this.handleConfirmaSenhaChange}
                                    value={this.state.confirmaSenha}/>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default CadastroUsuario;