import React, {Component} from "react";
import './HomeScreen.css';
import QuickSearchOne from "../../Component/QuickSearchOne/QuickSearchOne";

export default class HomeScreen extends Component{

    render(){
        return (
            <div className="home-container">
                <QuickSearchOne/>
            </div>
        );
    }
}