import React, { Component } from 'react';
import '../static/UserProfile.css'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            userProfile: this.props.match.params.id,
            user: null
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        if(this.state.logged_in) {
            console.log(this.state.logged_in)
            fetch('http://localhost:8000/api/user-detail/' + this.state.userProfile, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    user: json,
                })
            })
            .catch(err => {
                console.log(err, "you are not logged in!")
            })

        } else {
            // window.location = '/login'
        }
    }

    render() {
        console.log(this.state.userProfile)
        return(
            <div>
                <h1>User Profile</h1>
            </div>
        )
    }
} 

export default UserProfile