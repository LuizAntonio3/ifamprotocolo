import React, { Component } from 'react';
import Form from '../form.js';
const _alocacao_professor = require('../../models/alocacao_professor')

var _professor = require('../../models/professor')
var _turma = require('../../models/turma')
var _curso = require('../../models/curso')
var _disciplina = require('../../models/disciplina')

class ResponsavelDepartamentoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            id_professor: -1,
            id_curso: -1,
            id_turma: -1,
            id_disciplina: -1,
            listProfessor: [],
            listCursos: [],
            listTurmas: [],
            listDisciplinas: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBtnCancelClicked = this.handleBtnCancelClicked.bind(this);
        
        this.handleApiCall = this.handleApiCall.bind(this);
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
        this.handleChangeCurso = this.handleChangeCurso.bind(this);
        this.handleChangeTurma = this.handleChangeTurma.bind(this);
        this.handleChangeDisciplina = this.handleChangeDisciplina.bind(this);

        this.handleFetchProfessoresResponse = this.handleFetchProfessoresResponse.bind(this);
        this.handleFetchCursosResponse = this.handleFetchCursosResponse.bind(this);
        this.handleFetchTurmasResponse = this.handleFetchTurmasResponse.bind(this);
        this.handleFetchDisciplinasResponse = this.handleFetchDisciplinasResponse.bind(this);
    }
    handleFetchProfessoresResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listProfessor.push({id: -1, nome: 'Selecione'});

            const items = this.state.listProfessor.concat(res.data);

            console.log('items', this.state.listProfessor);
            this.setState({listProfessor: items});
        }
    }
    handleFetchCursosResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listCursos.push({id: -1, nome: 'Selecione'});

            const items = this.state.listCursos.concat(res.data);

            console.log('items', this.state.listCursos);
            this.setState({listCursos: items});
        }
    }
    handleFetchTurmasResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listTurmas.push({id: -1, nome: 'Selecione'});

            const items = this.state.listTurmas.concat(res.data);

            console.log('items', this.state.listTurmas);
            this.setState({listTurmas: items});
        }
    }
    handleFetchDisciplinasResponse (res) {
        console.log(res);
        if (res.success) {
            this.state.listDisciplinas.push({id: -1, nome: 'Selecione'});

            const items = this.state.listDisciplinas.concat(res.data);

            console.log('items', this.state.listDisciplinas);
            this.setState({listDisciplinas: items});
        }
    }
    handleApiCall (res) {
        console.log('resposta: ' + res);

        if (res.success) {
            alert('Alocação salva com sucesso');
            this.props.onSaved();  
        } else {
            alert('Não foi possível realizar a alocação do professor');
        }
    }
    handleSubmit(event){
        console.log('state: ' + this.state)

        var data = {
            id_professor:this.state.id_professor,
            id_curso:this.state.id_curso,
            id_turma:this.state.id_turma,
            id_disciplina:this.state.id_disciplina,
        };

        console.log('data: ' + data)

        _alocacao_professor.create(data, this.handleApiCall)
        event.preventDefault();
    }
    handleBtnCancelClicked(event){
        this.props.onBtnCancelClicked(event);
    }
    handleChangeProfessor(event){
        this.setState({
            id_professor: event.target.value
        });
    }
    handleChangeCurso(event){
        this.setState({
            id_curso: event.target.value
        });
    }
    handleChangeTurma(event){
        this.setState({
            id_turma: event.target.value
        });
    }
    handleChangeDisciplina(event){
        this.setState({
            id_disciplina: event.target.value
        });
    }
    componentDidMount() {
        _professor.listAll(this.handleFetchProfessoresResponse)
        _curso.listAll(this.handleFetchCursosResponse)
        _turma.listAll(this.handleFetchTurmasResponse)
        _disciplina.listAll(this.handleFetchDisciplinasResponse)
    }
  render() {

    const professoresRender = this.state.listProfessores.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });

    const cursosRender = this.state.listCursos.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });

    const turmasRender = this.state.listTurmas.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });


    const disciplinasRender = this.state.listDisciplinas.map((resp, idx) =>{
                return <option key={idx} value={resp.id}>{resp.nome}</option>
            });
    return (
      <div>
        <Form onSaved={this.handleSubmit} onCancel={this.handleBtnCancelClicked}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                        Professores
                    </label>
                    <div className="col-sm-4">
                        <select id="Professores" 
                                    className="form-control" 
                                    onChange={this.handleChangeProfessor}
                                    value={this.state.id_curso}>
                                    {professoresRender}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
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
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                        Turmas
                    </label>
                    <div className="col-sm-4">
                        <select id="Turmas" 
                                    className="form-control" 
                                    onChange={this.handleChangeTurma}
                                    value={this.state.id_turma}>
                                    {turmasRender}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                        Disciplinas
                    </label>
                    <div className="col-sm-4">
                        <select id="Disciplinas" 
                                    className="form-control" 
                                    onChange={this.handleChangeDisciplina}
                                    value={this.state.id_disciplina}>
                                    {disciplinasRender}
                        </select>
                    </div>
                </div>
        </Form>
      </div>
    );
  }
}

export default ResponsavelDepartamentoForm;