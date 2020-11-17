import { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../images/logo.png';

class Header extends Component{
    render() {
        return(
            <div className="header">
                <div className="logo">
                <Link to="/"><img src={logo} alt="Objective" width="96" /></Link>
                </div>
                <div className="contentCbCandidate">
                    <p className="candidateContent">
                        <strong>Wendell Christian</strong><br />Teste de Front-end
                    </p>
                    <div className="cb">cb</div>
                </div>
            </div>
        )
    }
}

export default Header;