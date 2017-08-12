import React, { Component } from 'react';

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
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        //alert('submit');
        //event.preventDefatult();
        this.props.onCadastroOk();
    }
    handleLoginButtonClick(event){
        //alert('Login');
        //event.preventDefatult();

        this.props.onLoginButtonClick();
    }
    handleChange(event){
        this.setState({
            tipo: event.target.tipo,
            nome: event.target.nome,
            email: event.target.email,
            matricula: event.target.matricula,
            telefone: event.target.telefone,
            logradouro: event.target.logradouro,
            numero: event.target.numero,
            complemento: event.target.complemento,
            bairro: event.target.bairro,
            senha: event.target.senha,
            confirmaSenha: event.target.confirmaSenha
        });
    }
  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="tipo" className="col-sm-3 control-label">
                        Tipo
                    </label>
                    <div className="col-sm-9">
                        <select id="tipo" 
                                    className="form-control" 
                                    autoFocus 
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.tipo}>
                            <option value="0">Nenhum</option>
                            <option value="1">Administrador</option>
                            <option value="2">Estudante</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label for="nome" className="col-sm-3 control-label">
                        Nome Completo
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                id="nome" 
                                placeholder="Nome Completo" 
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                value={this.state.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="email" className="col-sm-3 control-label">
                        Email</label>
                    <div className="col-sm-9">
                        <input type="email" id="email" 
                                placeholder="Email" 
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                value={this.state.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="matricula" className="col-sm-3 control-label">
                        Matrícula
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="matricula" 
                                placeholder="Matrícula" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.matricula}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="telefone" className="col-sm-3 control-label">
                        Telefone
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="telefone" 
                                placeholder="(92)991547542" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.telefone}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="logradouro" className="col-sm-3 control-label">
                        Logradouro
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="logradouro" 
                                placeholder="Rua 2" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.logradouro}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="numero" className="col-sm-3 control-label">
                        Numero
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="numero" 
                                placeholder="12542" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.numero}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="bairro" className="col-sm-3 control-label">
                        Bairro
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="bairro" 
                                placeholder="Compensa" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.bairro}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="complemento" className="col-sm-3 control-label">
                        Complemento
                        </label>
                    <div className="col-sm-9">
                        <input type="text" id="complemento" 
                                placeholder="Onde judas perdeu as botas" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.complemento}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="senha" className="col-sm-3 control-label">Senha</label>
                    <div className="col-sm-9">
                        <input type="password" id="senha" 
                                placeholder="Senha" 
                                className="form-control" required
                                onChange={this.handleChange}
                                value={this.state.senha}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="confirmaSenha" 
                            className="col-sm-3 control-label">
                            Confirmação de senha
                    </label>
                    <div className="col-sm-9">
                        <input type="password" 
                                    id="confirmaSenha" 
                                    placeholder="Confirmação de senha" 
                                    className="form-control" required
                                    onChange={this.handleChange}
                                    value={this.state.confirmaSenha}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button id="btnSalvar" type="submit" 
                                className="btn btn-lg btn-primary">
                                Salvar
                        </button>
                        <button className="btn btn-lg" 
                            onClick={this.handleLoginButtonClick}>
                            Login
                        </button>
                    </div>
                </div>
            </form>
      </div>
    );
  }
}

export default CadastroUsuario;