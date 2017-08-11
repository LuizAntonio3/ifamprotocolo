import React, { Component } from 'react';
import SideBarMenu from './sidebarmenu.js'
import Requisicoes from './requisicoes.js'
import Departamentos from './departamentos.js'
import Usuarios from './usuarios.js'
import './home.css';

const homeScreens = [
{
    id: 0,
    tela: "Requisicoes"
},
{
    id: 1,
    tela: "Departamento"
},
{
    id: 2,
    tela: "Usuarios"
}

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
        console.log(e.target.id);
        this.setState({
            current_screen: e.target.id
        })
    }

    render() {

        let tela = homeScreens[this.state.current_screen].tela;

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
                    <Departamentos />
                </div>
            </div>
        </div>
        );
    }
}

export default Home;