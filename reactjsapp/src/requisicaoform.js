import React, { Component } from 'react';
import Form from './form.js';

class RequisicaoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            idSolicitante: 0,
            nome:'',
            matricula:'',
            listServicos: [],
            listAnexos: [],
            listDepartamentos: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
    }
    handleSubmit(event){
        this.props.onSubmitClicked(event);
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
  render() {
    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
            <div className="form-group">
            <label>
                    <b >Incluir solicitante:</b>
            </label>
            </div>
            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-2 control-label">
                    Nome
                </label>
                <div className="col-sm-4">
                    <input type="text" 
                            id="nome" 
                            placeholder="Nome" 
                            className="form-control"/>
                </div>
                <div className="col-sm-3">
                    <i className="glyphicon glyphicon-search">
                    </i>
                </div>
                
            </div>
            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-2 control-label">
                    Matrícula
                </label>
                <div className="col-sm-4">
                    <input type="text" 
                            id="matricula" 
                            placeholder="123" 
                            className="form-control"/>
                </div>
                <div className="col-sm-3">
                    <i className="glyphicon glyphicon-search">
                    </i>
                </div>
            </div>
			<div>
                <div className="form-group">
                    <label>
                        <b >Dados do solicitante:</b>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="nome" className="col-sm-2 control-label">
                        Nome:
                    </label>
                    <div className="col-sm-9">
                        <label htmlFor="nome" className="col-sm-3 control-label">
                            {this.state.nome}
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="matricula" className="col-sm-2 control-label">
                        Matrícula:
                    </label>
                    <div className="col-sm-9">
                    <label htmlFor="matricula" className="col-sm-3 control-label">
                        {this.state.matricula}
                    </label>
                    </div>
                </div>                
			</div>
			<div>
                <div className="form-group">
                    <label>
                        <b >Serviços:</b>
                    </label>
                </div>
                <div>
                    <ul>
                        <li>
                            <label >
                                <input htmlFor="laboratorio" type="checkbox" value="0"/> 
                                Laboratorio
                            </label>                        
                        </li>
                        <li>
                            <label>
                                <input htmlFor="saladeaula" type="checkbox" value="0"/>
                                    Sala de aula
                            </label>                        
                        </li>
                        <li>
                            <label>
                                <input htmlFor="quadrapoliesportiva" type="checkbox" value="0"/>
                                    Quadra poliesportiva
                            </label>                        
                        </li>
                    </ul>
                </div>
            </div>
			<div>
                <div className="form-group">
                    <label>
                        <b >Anexos:</b>
                    </label>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Anexo 1: </label>
                    <div className="col-sm-3">
                        <input type="text" 
                                id="inputAnexo1" 
                                name="anexo_1"
                                className="form-control"/>
                    </div>
                    <div className="col-sm-1">
                        <i className="glyphicon glyphicon-paperclip">
                        </i>
                    </div>
                    <div className="col-sm-1">
                        <i className="glyphicon glyphicon-plus"></i>
                    </div>
                </div>
			</div> 
    		<div>
                <div className="form-group">
                    <label>
                        <b>Departamentos:</b>
                    </label>
                </div>
                <div>
                    <ul>
                        <li>
                            <label >
                                <input htmlFor="laboratorio" type="checkbox" value="0"/> 
                                Secretaria
                            </label>                        
                        </li>
                        <li>
                            <label>
                                <input htmlFor="saladeaula" type="checkbox" value="0"/>
                                    Sala de professores
                            </label>                        
                        </li>
                        <li>
                            <label>
                                <input htmlFor="quadrapoliesportiva" type="checkbox" value="0"/>
                                    Diretoria
                            </label>                        
                        </li>
                    </ul>
                </div>
			</div> 
        </Form>
      </div>
    );
  }
}

export default RequisicaoForm;