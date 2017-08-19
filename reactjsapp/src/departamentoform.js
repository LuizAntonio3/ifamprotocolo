import React, { Component } from 'react';
import Form from './form.js';

class DepartamentoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        this.props.onSubmitClicked(event);
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleChange(event){
        this.setState({
            nome: event.target.nome
        });
    }
  render() {
    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
                <div className="form-group">
                    <label for="nome" className="col-sm-3 control-label">
                        Nome
                    </label>
                    <div className="col-sm-9">
                        <input type="text" 
                                id="nome" 
                                placeholder="Nome" 
                                className="form-control" 
                                required
                                onChange={this.handleChange}
                                value={this.state.nome}/>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default DepartamentoForm;