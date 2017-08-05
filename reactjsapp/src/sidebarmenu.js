import React, { Component } from 'react';
import './sidebarmenu.css';

class SideBarMenu extends Component {
    render() {
        const listItems = this.props.options.map((option) =>
            <li key={option.id}><a>{option.tela}</a></li>
        );

        return <div>
                  <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <a >
                                {this.props.userName}
                            </a>
                        </li>
                        {listItems}
                    </ul>
                </div>
        </div>;
    }
}

export default SideBarMenu;
