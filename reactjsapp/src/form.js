import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.props.onSaved}>
            <div>
                {this.props.children}
            </div>
            <div className="form-group">
                <div className="col-sm-9 col-sm-offset-3">
                    <button id="btnSalvar" type="submit" 
                            className="btn btn-lg btn-primary">
                            Salvar
                    </button>
                    <button className="btn btn-lg" 
                        onClick={this.props.onCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

export default Form;