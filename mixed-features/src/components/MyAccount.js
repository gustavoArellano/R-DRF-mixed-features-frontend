import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/MyAccount.css'

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            user: '',
            myEventList: [],
            eventList: [],
            isLoading: false,
        }
        this.eventsList = this.eventsList.bind(this)
    }

    async componentDidMount() {
        
        this.setState({isLoading: true})
        if(this.state.logged_in) {
            await fetch('http://localhost:8000/api/current-user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })

                .then(res => res.json())
                .then(data => {
                    this.setState({ 
                        user: data,
                    })
                    console.log(data)
                })
                .catch(err => {
                    console.log("ERROR: " + err, "you are not logged in!")
                })

            var id = this.state.user.id
            await fetch('http://localhost:8000/api/attending-event-list/' + id + '/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        myEventList: json, 
                    })
                })
            
            await fetch('http://localhost:8000/api/event-list/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        eventList: json, 
                    })
                })

            await fetch('http://localhost:8000/api/user-list/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        userList: json, 
                        isLoading: false})
                })

            
        } else {
            window.location = '/login'
        }
    }
    

    eventsList() {
        const Event = props => (
    
            <div className="event-box">
                <p>Title: {props.event.title}</p>
                <p>Description: {props.event.description}</p>
                <p>Zip Code: {props.event.zip_code}</p>
                <p>Hosted By: {props.user}</p>
            </div>
        )
        // eslint-disable-next-line
        return  this.state.myEventList.map(myevent => {
            // eslint-disable-next-line
            var hosted_by = this.state.userList.map(user => { if (myevent.event_by_user === user.id) { return user.first_name } })
            return <Event event={myevent} user={hosted_by} key={myevent.id} />
        })
    }

    render() {
        
        console.log(this.state.userList)
        const my_events = this.state.isLoading ? '' : this.eventsList()
        const userProfile = 
            this.state.isLoading ? 
                '' 
            : 
                <div className="user-info">
                    <div className="info">
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
                        <br />
                        <Link to="/account-edit">Edit Profile</Link>
                        <br />
                        <Link to="/account-edit">Delete My Account</Link>

                    </div>

                    <div className="joined_events">
                        <h4>My Events</h4>
                        {my_events}
                    </div>

                </div>
        return(
            <div className="container">

                <h1>My Account</h1>

                {userProfile}

            </div>
        )
    }
}

export default MyAccount