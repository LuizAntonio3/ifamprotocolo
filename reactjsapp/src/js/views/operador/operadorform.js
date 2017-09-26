import React, { Component } from 'react';
import Form from '../form.js';

class OperadorForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            confirmaSenha: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleChangeNome = this.handleChangeNome.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeSenha = this.handleChangeSenha.bind(this);
        this.handleChangeConfirmaSenha = this.handleChangeConfirmaSenha.bind(this);
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

        var data = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            confirmaSenha: this.state.confirmaSenha
        };

        console.log('data: ' + data)

        this.props.model.create(data, this.handleApiCall)
        //event.preventDefault();
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleChangeNome(event){
        this.setState({
            nome: event.target.value
        });
    }
    handleChangeEmail(event){
        this.setState({
            email: event.target.value
        });
    }
    handleChangeSenha(event){
        this.setState({
            senha: event.target.value
        });
    }
    handleChangeConfirmaSenha(event){
        this.setState({
            confirmaSenha: event.target.value
        });
    }
  render() {
    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
                <div className="form-group">
                    <label className="col-sm-3 control-label">
                        Nome
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                className="form-control" 
                                required
                                autoFocus
                                onChange={this.handleChangeNome}
                                value={this.state.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                className="form-control" 
                                required
                                onChange={this.handleChangeEmail}
                                value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">
                        Senha
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                className="form-control" 
                                required
                                onChange={this.handleChangeSenha}
                                value={this.state.senha}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">
                        Confirmação de Senha
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                className="form-control" 
                                required
                                onChange={this.handleChangeConfirmaSenha}
                                value={this.state.confirmaSenha}/>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default OperadorForm;