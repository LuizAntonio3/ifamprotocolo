import React, { Component } from 'react';
const Usuario = require('./js/models/usuario.js')

class LoginForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
            email: '',
            password: ''
        };

    this.callOnLoginOk = this.callOnLoginOk.bind(this);
    this.handleLoginApiCall = this.handleLoginApiCall.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event){
        this.setState({
                email: event.target.value
            });
    }
  handlePasswordChange(event){
        this.setState({
                password: event.target.value
            });
    }

    callOnLoginOk(){
        this.props.onLoginOk();
    }

    handleLoginApiCall (res) {
        console.log('resposta: ' + res.msg);

        if (res.success) {
            this.callOnLoginOk();
        } else {
            alert(res.msg);
        }
    }

    handleSubmit(event){
        //alert('submit');
        console.log('teste');
        console.log('email: ' + this.state.email);
        console.log('password: ' + this.state.password);

        Usuario.login(this.state.email, this.state.password, this.handleLoginApiCall);

        event.preventDefault();
    }

    render() {
        return (
        <div>
            <form className="form-signin" onSubmit={this.handleSubmit} >
                <input type="email" id="inputEmail" 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        className="form-control" 
                        placeholder="Email" 
                        required autoFocus/>     
                <input type="password" id="inputPassword" 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        className="form-control" 
                        placeholder="Password" required/>
                <div>
                <input id="btnLogin" 
                            className="btn btn-block btn-primary" 
                            type="submit"
                            value="Acessar" />
                </div>
            </form>
        </div>
        );
    }
}

export default LoginForm;