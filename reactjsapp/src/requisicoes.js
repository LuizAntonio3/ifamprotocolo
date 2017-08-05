import React, { Component } from 'react';
import './requisicoes.css';

class Requisicoes extends Component {
  render() {
    return (
          <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-lg-12">
                          <h1>Requisicoes</h1>
                          <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                      </div>
                  </div>
              </div>
          </div>
    );
  }
}

export default Requisicoes;
