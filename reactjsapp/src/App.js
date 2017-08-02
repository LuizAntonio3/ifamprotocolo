import React, { Component } from 'react';
import Header from './header.js'
import LoginForm from './loginform.js'
import CadastroUsuario from './cadastrousuarioform.js'

import './bootstrap/css/bootstrap.min.css';
import './index.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          screen: 0 // 0 login, 1 cadastro, 2 home
      };

      this.handleLoginOk = this.handleLoginOk.bind(this);
      this.handleNovoUsuarioClick = this.handleNovoUsuarioClick.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleCadastroOk = this.handleCadastroOk.bind(this);
      
  }
  handleLoginOk() {
    this.setState({
      screen: 1
    });
  }
  handleNovoUsuarioClick(){
    this.setState({
      screen: 1
    });
  }
  handleCancel(){
    this.setState({
      screen: 0
    });
  }
  handleCadastroOk(){
    this.setState({
      screen: 0
    });
  }
  render() {

    let content = null;

    if (this.state.screen === 0) {
      content = <LoginForm 
        onLoginOk={this.handleLoginOk}
        onNovoUsuarioClick={this.handleNovoUsuarioClick}
        />;
    } 
    else {
      content = <CadastroUsuario 
        onCadastroOk={this.handleCadastroOk}
        onCancelClick={this.handleCancel}
        />;             
    }

    return (
      <div className="App">
        <div className="container">
          <Header />
          {content}
        </div>
      </div>
    );
  }
}

export default App;
