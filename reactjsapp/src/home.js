import React, { Component } from 'react';
import SideBarMenu from './sidebarmenu.js'
import Requisicoes from './requisicoes.js'
import Departamentos from './departamentos.js'
import Usuarios from './usuarios.js'
import './home.css';

const homeScreens = [
{comp: <Usuarios />, nome: 'Usuários'},
{comp: <Departamentos />, nome: 'Departamentos'},
{comp: <Requisicoes />, nome: 'Requisições'}
];

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            current_screen: 0, // 0 Requisições, 1 Departamentos, 2 Usuários, 3 etcs
            user_name: "Robson"
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
                        userName={this.state.user_name}/>
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