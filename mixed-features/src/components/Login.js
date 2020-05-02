import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../static/Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
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

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
                logged_in: true,
                displayed: '',
                username: json.user.username
            })
            window.location = '/home'
        })
      }

    render() {
        return(
            <div>
                <h1><u>Login</u></h1>
                <form onSubmit={e => handle_login(e, this.state)}>
                    <label>Username</label> 
                    <input type="text" name="username" value={this.state.username} onChange={this.handle_change} />

                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handle_change}/>

                    <input type="submit" className="button" />
                </form>
            </div>
        )
    }
}

export default Login
