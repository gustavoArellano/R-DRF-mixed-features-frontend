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
        <div className="info">
            
            <h1>{this.state.user.first_name}'s Profile</h1>

            <img src={ 'http://localhost:8000' + this.state.user.image } alt=""/>
            <h6>[Badge[Bronze | Silver | Gold | Platinum]]</h6>
            <div className="user-details">
                <p>Username: { this.state.user.username }</p>
                <p>About me: asdkfjdkslajfklsdjfklsdajfksdlfjsd.</p>
                <p>Email: { this.state.user.email }</p>
                <p>Ridden Events: [0]</p>
                <p>Followers: [0]</p>
                <p>Following: [0]</p>
                <p>Riding Skill: [Beginner]</p>
                <p>[Follow / Following]</p>
                <p>[Direct Message]</p>
            </div>

        </div>
        return(
            <div>

                {content}

                <h6>Ridden Event Posts | My Posts </h6>

                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>

            </div>
        )
    }
} 

export default UserProfile