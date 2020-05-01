import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../static/Signup.css'


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            zip_code: '',
            password: ''
        }
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        })
    }

    render() {
        return(
            <div>
                <h1><u>Signup</u></h1>

                <form onSubmit={e => this.props.handle_signup(e, this.state)}>

                    <label>First Name</label>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.handle_change} />

                    <label>Last Name</label>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.handle_change} />

                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handle_change} />

                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handle_change} />

                    <label>Zip Code</label>
                    <input type="text" name="zip_code" value={this.state.zip_code} onChange={this.handle_change} />

                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handle_change} />

                    <input className="button" type="submit" />

                </form>
    
            </div>
        )
    }
}

export default Signup

Signup.propTypes = {
    handle_signup: PropTypes.func.isRequired
}