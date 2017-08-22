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
            <label htmlFor="tipo" className="col-sm-3 control-label">
                    <b >Incluir solicitante</b>
            </label>
            </div>
            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-3 control-label">
                    Nome
                </label>
                <div className="col-sm-9">
                    <input type="text" 
                            id="nome" 
                            placeholder="Nome" 
                            className="form-control"/>
                </div>
                <i className="glyphicon glyphicon-search col-sm-8">
                </i>
            </div>
            <div className="form-group">
                <label htmlFor="tipo" className="col-sm-3 control-label">
                    Matrícula
                </label>
                <div className="col-sm-9">
                    <input type="text" 
                            id="matricula" 
                            placeholder="123" 
                            className="form-control"/>
                </div>
                <i className="glyphicon glyphicon-search col-sm-8">
                </i>
            </div>
			<div>
				<div className="col-sm-5"><hr /></div>
				<div className="col-sm-2"><b>Dados do solicitante</b></div>
				<div className="col-sm-5"><hr /></div>

                <div className="form-group">
                    <label htmlFor="nome" className="col-sm-3 control-label">
                        Nome
                    </label>
                    <div className="col-sm-9">
                        <label htmlFor="nome" className="col-sm-3 control-label">
                            {this.state.nome}
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="matricula" className="col-sm-3 control-label">
                        Matrícula
                    </label>
                    <div className="col-sm-9">
                    <label htmlFor="matricula" className="col-sm-3 control-label">
                        {this.state.matricula}
                    </label>
                    </div>
                </div>                
			</div>
			<div>
				<div className="col-sm-5"><hr/></div>
				<div className="col-sm-2"><b>Serviços</b></div>
				<div className="col-sm-5"><hr/></div>


            <div>
                <li>
                    <ul>
                <label>
                <input for="laboratorio" type="checkbox" value="0"/>
                    Laboratorio
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="saladeaula" type="checkbox" value="0"/>
                    Sala de aula
                </label>                        
                    </ul>
                    <ul>

                <label>
                <input for="quadrapoliesportiva" type="checkbox" value="0"/>
                    Quadra poliesportiva
                </label>                        
                    </ul>
                    <ul>

                <label>
                <input for="historicoescolar" type="checkbox" value="0"/>
                    Histórico Escolar
                </label>                        
                    </ul>
                    <ul>
                <label>
                <input for="certificadoensinomedio" type="checkbox" value="0"/>
                    Certificado do Ensino Médio
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="diplomadeniveltecnico" type="checkbox" value="0"/>
                    Diploma de Nível Técnico
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="transferenciaescolar" type="checkbox" value="0"/>
                    Transferência Escolar
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="justificativafaltas" type="checkbox" value="0"/>
                    Justificativa de Faltas
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="retornoaescola" type="checkbox" value="0"/>
                    Retorno á escola
                </label>

                    </ul>
                    <ul>

                <label>
                <input for="declaracaoescolaridade" type="checkbox" value="0"/>
                    Declaração de escolaridade
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="trancamentomatricula" type="checkbox" value="0"/>
                    Trancamento de Matrícula
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="cancelamentomatricula" type="checkbox" value="0"/>
                    Cancelamento de Matrícula
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="correcaonotas" type="checkbox" value="0"/>
                    Correção de Notas
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="avaliacao2achamada" type="checkbox" value="0"/>
                    Avaliação de 2a Chamada
                </label>
                    </ul>
                    <ul>

                <label>
                <input for="outros" type="checkbox" value="0"/>
                    Outros
                </label>
                    </ul>
                    <ul>

                    </ul>
                    <ul>

                    </ul>
                    <ul>

                    </ul>
                </li>


                    </div>
                </div>
			<div>
				<div className="col-sm-5"><hr/></div>
				<div className="col-sm-2"><b>Anexos</b></div>
				<div className="col-sm-5"><hr/></div>

                <div className="form-group">
                    <label className="control-label col-sm-5" >Anexo 1: </label>
                    <div className="col-sm-2">
                        <input type="text" id="inputAnexo1" name="anexo_1"/>
                    </div>
                    <i className="glyphicon glyphicon-paperclip col-sm-5"></i>
                </div>
			</div> 
    		<div>
				<div className="col-sm-5"><hr/></div>
				<div className="col-sm-2"><b>Setores</b></div>
				<div className="col-sm-5"><hr/></div>


			</div>
                
        </Form>
      </div>
    );
  }
}

export default RequisicaoForm;