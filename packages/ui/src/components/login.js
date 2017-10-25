/**
 * @author Shalini Jha
 * @name Login
 * @desc This component renders the login page
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    
    /**
     * @name render
     * @desc Renders the login HTML
     */
    render = () => {
        return (
            <div>
                <Link to={`/`}>Login</Link>
            </div>
        )
    }
}

export default Login;

