import React, { Component } from 'react';
import '../static/MyAccount.css'

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            data: ''
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        if(this.state.logged_in) {
            fetch('http://localhost:8000/api/current-user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })

            .then(res => res.json())
            .then(json => {
                this.setState({ 
                    data: json
                })
            })
            .catch(err => {
                console.log("ERROR: " + err, "you are not logged in!")
            })
        } else {
            window.location = '/login'
        }
    }

    render() {
        return(
            <div>
                
                <h1>My Account</h1>
                
                <p>
                    <u>First Name:</u><br/>
                    {this.state.data.first_name}
                </p>

                <p>
                    <u>Last Name:</u><br/>
                    {this.state.data.last_name}
                </p>

                <p>
                    <u>Username:</u><br/>
                    {this.state.data.username}
                </p>

                <p>
                    <u>Email:</u><br/>
                    {this.state.data.email}
                </p>

            </div>
        )
    }
}

export default MyAccount