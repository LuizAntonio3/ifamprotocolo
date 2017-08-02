import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNovoUsuario = this.handleNovoUsuario.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        alert('submit');
        //event.preventDefatult();

        this.props.onLoginOk();
    }
    handleNovoUsuario(event){
        alert('cancel');

        this.props.onNovoUsuarioClick();
    }
    handleChange(event){
        this.setState({
            email: event.target.email,
            password: event.target.password
        });
    }
    render() {
        return (
        <div>
            <form className="form-signin" onSubmit={this.handleSubmit} >
                <input type="email" id="inputEmail" 
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="Email" 
                        required autoFocus/>     
                <input type="password" id="inputPassword" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="form-control" 
                        placeholder="Password" required/>
                <div>
                    <button id="btnLogin" 
                            className="btn btn-lg btn-primary" 
                            type="submit">
                            Acessar
                    </button>
                    <button id="btnNovoUsuario" 
                            className="btn btn-lg"
                            onClick={this.handleNovoUsuario}>
                        Novo usuário
                    </button>
                </div>
            </form>
        </div>
        );
    }
}

export default LoginForm;
