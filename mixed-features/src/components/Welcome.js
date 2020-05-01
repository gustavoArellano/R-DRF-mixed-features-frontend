import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';
import '../static/Welcome.css';


class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
          displayed: '',
          logged_in: localStorage.getItem('token') ? true : false,
          username: ''
        };
      };
    
    componentDidMount() {
        if(this.state.logged_in) {
            fetch('http://localhost:8000/api/current-user/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ username: json.username})
            })
        }
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
        })
    }

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/user-signup/', {
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
                username: json.username
            })
        })
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, display: ''})
    }

    displayThis = show => {
        this.setState({
            displayed: show
        });
    };

    render() {
        let show;
        switch (this.state.displayed) {

            case 'login':
                show = <Login handle_login={this.handle_login} />
                break;

            case 'signup':
                show = <Signup handle_signup={this.handle_signup}/>
                break;

            default: 
                show = ''
                // (
                //   <div className="title">
                //     <h1>Mixed Features</h1>
                //     <p>{this.state.logged_in ? `Hello, ${this.state.username}!` : 'Please SIGNUP or LOGIN!!!'}</p>
                //   </div>
                // )
        }
        return(
            <div className="app-container">

                <h1 className="title">Mixed Features</h1>

                {show}

            </div>
        )
    }
}

export default Welcome