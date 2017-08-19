import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        alert('submit');
        this.props.onLoginOk();
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
                            className="btn btn-block btn-primary" 
                            type="submit">
                            Acessar
                    </button>
                </div>
            </form>
        </div>
        );
    }
}

export default LoginForm;
