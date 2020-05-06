import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/MyAccount.css'

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            user: ''
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
            .then(data => {
                this.setState({ 
                    user: data
                })
                console.log(data)
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
            <div className="container">

                <h1>My Account</h1>

                <img src={'http://localhost:8000' + this.state.user.image} alt=""/>
                
                <p>
                    <u>First Name:</u><br/>
                    {this.state.user.first_name}
                </p>

                <p>
                    <u>Last Name:</u><br/>
                    {this.state.user.last_name}
                </p>

                <p>
                    <u>Username:</u><br/>
                    {this.state.user.username}
                </p>

                <p>
                    <u>Email:</u><br/>
                    {this.state.user.email}
                </p>

                <p>
                    <u>Zip Code:</u><br/>
                    {this.state.user.zip_code}
                </p>

                <Link to="/account-edit">Edit Profile</Link>

            </div>
        )
    }
}

export default MyAccount