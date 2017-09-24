import React, { Component } from 'react';
import Header from './header.js'
import LoginForm from './loginform.js'
import Home from './home.js'
import './home.css'

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          screen: 1 // 0 login, 1 home
      };

      this.handleLoginOk = this.handleLoginOk.bind(this);
      this.handleLogoutOk = this.handleLogoutOk.bind(this);      
  }
  handleLoginOk() {
    this.setState({
      screen: 1
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
        content = <Home />;
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
