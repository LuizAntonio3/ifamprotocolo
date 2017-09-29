import React, { Component } from 'react';
import Form from '../form.js';
var _turma = require('../../models/turma')
var _curso = require('../../models/curso')

class TurmaForm extends Component {
    constructor(props){
        super(props);

        console.log('item',this.props.item);

        this.state = {
            id: 0,
            nome: '',
            id_curso: 0,
            listCursos: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        this.handleNomeChange = this.handleNomeChange.bind(this);

        this.handleCursoChange = this.handleCursoChange.bind(this);

        this.handleFetchCursosResponse = this.handleFetchCursosResponse.bind(this);
        this.handleCreateTurma = this.handleCreateTurma.bind(this);

    }
    handleFetchCursosResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listCursos.push({id: -1, nome: 'Selecione', matricula: 'Selecione'});

            const cursos = this.state.listCursos.concat(res.data);

            console.log('cursos', this.state.listCursos);
            this.setState({listCursos: cursos});
        }
    }
    handleCursoChange(event){
        this.setState({id_curso: event.target.value})
    }
    componentDidMount() {
        _curso.listAll(this.handleFetchCursosResponse);
    }
    handleCreateTurma (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            alert('Turma criada com sucesso');
            this.props.onSaved();  
        } else {
            alert('Não foi possível realizar a turma');
        }
    }
    handleSubmit(event){
        this.props.onSubmitClicked(event);

        var data = {
            nome: this.state.nome,
            id_curso: this.state.id_curso
        };

        _turma.create(data, this.handleCreateTurma);

    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleNomeChange(event){
        this.setState({
            nome: event.target.value
        });
    }
  render() {
    const cursosRender = this.state.listCursos.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });
            
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
                                onChange={this.handleNomeChange}
                                value={this.state.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="curso" className="col-sm-2 control-label">
                        Cursos
                    </label>
                    <div className="col-sm-4">
                        <select id="Cursos" 
                                    className="form-control" 
                                    onChange={this.handleCursoChange}
                                    value={this.state.id_curso}>
                                    {cursosRender}
                        </select>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default TurmaForm;