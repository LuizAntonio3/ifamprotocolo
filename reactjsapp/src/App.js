import React, { Component } from 'react';
import Header from './js/views/header.js'
import LoginForm from './js/views/loginform.js'
import Home from './js/views/home.js'
import './js/views/home.css'

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          screen: 1, // 0 login, 1 home,
          loginData: null
      };

      this.handleLoginOk = this.handleLoginOk.bind(this);
      this.handleLogoutOk = this.handleLogoutOk.bind(this);      
  }
  handleLoginOk(data) {
    this.setState({
      screen: 1,
      loginData: data
    });
  }
  handleLogoutOk(){
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
          />;
        break;
      case 1:
        content = <Home loginData={this.state.loginData} />;
        break; 

      default:
        content = <LoginForm 
          onLoginOk={this.handleLoginOk}
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
