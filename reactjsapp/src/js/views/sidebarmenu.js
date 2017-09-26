import React, { Component } from 'react';
import './sidebarmenu.css';

class SideBarMenu extends Component {
    render() {
        const listItems = this.props.options.map((option, id) => {
            //console.log(id);
            return <li id={id} key={id} onClick={this.props.onItemClick}>{option.nome}</li>
        }
        , this);

        return <div>
                  <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <a >
                                Usuário: {this.props.userName}
                            </a>
                        </li>
                        {listItems}
                    </ul>
                </div>
        </div>;
    }
}

export default SideBarMenu;
