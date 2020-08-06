import React, {Component} from "react";
import './Header.css';
import {Link} from "react-router-dom";

export default class Header extends Component{

    render(){
        return (
            <header className="my-header">
                <div className="header-title">Pokemon Stats</div>
                <nav>
                    <Link to="/" className="header-nav-links">
                        Accueil
                    </Link>
                    <Link to="/compare" className="header-nav-links">
                        Comparateur
                    </Link>
                </nav>
            </header>
        );
    }
}