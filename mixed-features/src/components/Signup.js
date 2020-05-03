import React, { Component } from 'react';
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
            password: '',
            logged_in: localStorage.getItem('token') ? true : false,
        }

        this.getCookie = this.getCookie.bind(this)

    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if ( cookie.substring(0, name.length +1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length +1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    componentDidMount() {
        if(this.state.logged_in) {
             window.location = '/home'
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

    handle_signup = (e, data) => {
        e.preventDefault();
        var csrftoken = this.getCookie('csrftoken')
        fetch('http://localhost:8000/api/user-signup/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
                logged_in: true,
            })
            window.location = '/home'
        })
      }

    render() {
        return(
            <div>
                <h1><u>Signup</u></h1>

                <form onSubmit={e => this.handle_signup(e, this.state)}>

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
