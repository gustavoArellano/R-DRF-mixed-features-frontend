import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/NavBar.css';
import PropTypes from 'prop-types'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, display: ''})
        window.location = '/'
      }


    render() {
        const logged_out_nav = (
            <ul>

                <li>
                    <Link to="/login" className="link">Login</Link>
                </li>

                <li>
                    <Link to="/signup" className="link">Signup</Link>
                </li>

                <li>
                    <Link to="/" className="link">:]</Link>
                </li>

            </ul>
        )

        const logged_in_nav = (
            <ul>

                <li>
                    <Link to="/" onClick={ this.handle_logout } className="link">Logout</Link>
                </li>

                <li>
                    <Link to="/account" className="link">Account</Link>
                </li>

                <li>
                    <Link to="/home" className="link">Home</Link>
                </li>

            </ul>
        )

        return(
            <div className="navbar-container">
                
                {this.props.logged_in ? logged_in_nav : logged_out_nav}

            </div>
        )
    }
}

export default NavBar

NavBar.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    // handle_logout: PropTypes.func.isRequired
}

