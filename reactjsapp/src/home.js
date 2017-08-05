import React, { Component } from 'react';
import SideBarMenu from './sidebarmenu.js'
import Requisicoes from './requisicoes.js'
import './home.css';

const homeScreens = [
{
    id: 0,
    tela: "Requisicoes"
},
{
    id: 1,
    tela: "Departamentos"
},
{
    id: 2,
    tela: "Usuários"
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

    handleSideBarItemClick(){
        this.setState({
            current_screen: 1
        })
    }

    render() {
        return (
        <div>
            <div id="wrapper">
                <SideBarMenu 
                    onItemClick={this.handleSideBarItemClick} 
                    options={homeScreens} 
                    userName={this.state.user_name}/>
                <Requisicoes />
            </div>
        </div>
        );
    }
}

export default Home;