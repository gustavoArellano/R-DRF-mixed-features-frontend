import React, { Component } from 'react';
import '../static/NavBar.css';
import PropTypes from 'prop-types'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        const logged_out_nav = (
            <ul>
                <li onClick={ () => this.props.showThis('login') }>Login</li>
                <li onClick={ () => this.props.showThis('signup') }>Signup</li>
            </ul>
        )

        const logged_in_nav = (
            <ul>
                <li>Logout</li>
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
    showThis: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
}