import React, { Component } from 'react';
import Header from './header.js'
import LoginForm from './loginform.js'
import CadastroUsuario from './cadastrousuarioform.js'
import Home from './home.js'
import './home.css'

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          screen: 0 // 0 login, 1 cadastro, 2 home
      };

      this.handleLoginOk = this.handleLoginOk.bind(this);
      this.handleNovoUsuarioClick = this.handleNovoUsuarioClick.bind(this);
      this.handleCadastroLoginButtonClick = this.handleCadastroLoginButtonClick.bind(this);
      this.handleCadastroOk = this.handleCadastroOk.bind(this);
      this.handleHomeLogout = this.handleHomeLogout.bind(this);
      
  }
  handleLoginOk() {
    this.setState({
      screen: 2
    });
  }
  handleNovoUsuarioClick(){
    this.setState({
      screen: 1
    });
  }
  handleCadastroLoginButtonClick(){
    this.setState({
      screen: 0
    });
  }
  handleCadastroOk(){
    this.setState({
      screen: 0
    });
  }
  handleHomeLogout(){
    this.setState({
      screen: 0
    });
  }
  render() {

    let content = null;

    switch (this.state.screen) {
      case 0:
        content = <LoginForm 
          onLoginOk={this.handleLoginOk}
          onNovoUsuarioClick={this.handleNovoUsuarioClick}
          />;
        break;    
      case 1:
        content = <CadastroUsuario 
          onCadastroOk={this.handleCadastroOk}
          onLoginButtonClick={this.handleCadastroLoginButtonClick}
          />;
        break; 
      case 2:
        content = <Home />;
        break; 

      default:
        content = <LoginForm 
          onLoginOk={this.handleLoginOk}
          onNovoUsuarioClick={this.handleNovoUsuarioClick}
          />;
        break;
    }

    return (
      <div className="App">
        <div className="container">
          <Header />
          <div id="content">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
