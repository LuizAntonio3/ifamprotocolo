import React, { Component } from 'react';
import './sidebarmenu.css';

class SideBarMenu extends Component {
    render() {
        const listItems = this.props.options.map((option) =>
            <li id={option.id} key={option.id} onClick={this.props.onItemClick}>{option.tela}</li>
        , this);

        return <div>
                  <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <a >
                                Usuario: {this.props.userName}
                            </a>
                        </li>
                        {listItems}
                    </ul>
                </div>
        </div>;
    }
}

export default SideBarMenu;
