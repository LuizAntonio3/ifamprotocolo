import React, { Component } from 'react';
import './home.css';
import SideBarMenu from './sidebarmenu.js'

import Requisicoes from './requisicao/requisicoes.js'
import Departamentos from './departamento/departamentos.js'
import Operadores from './operador/operadores.js'
import Servicos from './servico/servicos.js'
import Alunos from './aluno/alunos.js'
import AlocacoesProfessores from './alocacaoprofessor/alocacoesprofessores.js'
import Cursos from './curso/cursos.js'
import Turmas from './turma/turmas.js'
import Disciplinas from './disciplina/disciplinas.js'
import Professors from './professor/professores.js'
import ResponsaveisDepartamentos from './responsaveldepartamento/responsaveisdepartamentos.js'


const homeScreens = [
{comp: <Operadores />, nome: 'Operadores'},
{comp: <Cursos />, nome: 'Cursos'},
{comp: <Disciplinas />, nome: 'Disciplinas'},
{comp: <Turmas />, nome: 'Turmas'},
{comp: <Professors />, nome: 'Professores'},
{comp: <AlocacoesProfessores />, nome: 'Alocações Professores'},
{comp: <Alunos />, nome: 'Alunos'},
{comp: <Departamentos />, nome: 'Departamentos'},
{comp: <ResponsaveisDepartamentos />, nome: 'Responsáveis Departamento'},
{comp: <Servicos />, nome: 'Serviços'},
{comp: <Requisicoes />, nome: 'Requisições'}
];

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            current_screen: 0
        }

        this.handleSideBarItemClick = this.handleSideBarItemClick.bind(this);
    }

    handleSideBarItemClick(e){
        this.setState({
            current_screen: e.target.id
        })
    }
    render() {

        let content = homeScreens[this.state.current_screen].comp;

        return (
        <div>
            <div id="wrapper">
                <div>
                    <SideBarMenu 
                        onItemClick={this.handleSideBarItemClick} 
                        options={homeScreens} 
                        userName={"Robson"}/>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
        );
    }
}

export default Home;