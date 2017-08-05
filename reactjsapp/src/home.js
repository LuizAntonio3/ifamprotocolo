import React, { Component } from 'react';
import SideBarMenu from './sidebarmenu.js'
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
        this.handleUserMenuItemClick = this.handleUserMenuItemClick.bind(this);
    }

    handleSideBarItemClick(){
        this.setState({
            current_screen: 1
        })
    }
    handleUserMenuItemClick(){

    }

    render() {
        return (
        <div>
            <div id="wrapper">
                <SideBarMenu 
                    onItemClick={this.handleSideBarItemClick} 
                    options={homeScreens} 
                    userName={this.state.user_name}/>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1>Simple Sidebar</h1>
                                <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                                <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;