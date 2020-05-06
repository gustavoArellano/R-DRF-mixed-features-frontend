import React, { Component } from 'react';
import '../static/UserProfile.css'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            userProfile: this.props.match.params.id,
            user: '',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        const getId = this.state.userProfile
        const id = getId.toString()
        const point = "user-detail/" + id + "/"
        if(this.state.logged_in) {
            fetch('http://localhost:8000/api/' + point, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    user: data,
                    isLoading: false,
                })
            })
            .catch(err => {
                console.log(err, "something went wrong!")
            })
        } else {
            window.location = '/login'
        }
    }

    render() {
        const content = this.state.isLoading ? '' : 
        <div>
            
            <h1>{this.state.user.first_name}'s Profile</h1>

            <img src={'http://localhost:8000' + this.state.user.image} alt=""/>
            <p>Last Name: {this.state.user.last_name}</p>
            <p>Username: {this.state.user.username}</p>
            <p>Email: {this.state.user.email}</p>

        </div>
        return(
            <div>

                {content}

            </div>
        )
    }
} 

export default UserProfile