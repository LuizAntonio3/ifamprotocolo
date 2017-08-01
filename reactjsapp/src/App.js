import React, { Component } from 'react';
import './bootstrap/css/bootstrap.min.css';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header clearfix">
            <h3>IFAM - Protocolo - Login</h3>
          </div>
          <form className="form-signin">
            <input type="email" id="inputEmail" 
                    className="form-control" 
                    placeholder="Email" 
                    required autofocus/>     
            <input type="password" id="inputPassword" 
                  className="form-control" 
                  placeholder="Password" required/>
            <div className="checkbox">
              <label>
                <input type="checkbox" value="remember-me"/>
                    Lembrar me
              </label>  
            </div>
            <div>
            <button id="btnLogin" className="btn btn-lg btn-primary" 
                  type="submit">Acessar</button>
            <a className="btn btn-lg" href="cadastrar_usuario.html">Novo usuário</a>
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default App;
