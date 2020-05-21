import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/MyAccount.css'

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            user: '',
            userList: [],
            myEventList: [],
            eventList: [],
            isLoading: false,
        }

        this.eventsList = this.eventsList.bind(this)
        this.getCookie = this.getCookie.bind(this);

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

    async fetchMyEvents() {
        this.setState({isLoading: true})
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
                    isLoading: false
                })
            })
    }

    async leaveEvent(e, event_id) {
        e.preventDefault()
        this.setState({isLoading: true})
        const event = event_id
        const user = this.state.user.id
        console.log("SUBMIT DATA = ", user, event)
        if(this.state.logged_in) {
            var csrftoken = this.getCookie('csrftoken')
            await fetch('http://localhost:8000/api/leave/' + event + '/' + user + '/', {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
            })
                .then(res => this.fetchMyEvents())
                .then(alert("You've left this event!! 🏃🏃🏻‍♀️"))
                .then(this.setState({isLoading: false}))
                .catch(err => console.log("Error from catch: ", err))
        } else {
            window.location = '/login';
        }

    }

    eventsList() {
        const Event = props => (
    
            <div className="event-box">
                <p>Title: {props.event.title}</p>
                <p>Description: {props.event.description}</p>
                <p>Zip Code: {props.event.zip_code}</p>
                <p>Hosted By: {props.user[0].first_name}</p>
                <Link to={"/event-details/" + props.event.id}><button>Event Details</button></Link>
                <form onSubmit={(e) => this.leaveEvent(e, props.event.id)}>
                    <button>Leave</button>
                </form>
                { props.event.event_by_user === this.state.user.id ? 
                    <form>
                        <button type="submit">Delete</button>
                    </form> 
                    : 
                    null
                } 
            </div>
        )
        // eslint-disable-next-line
        return  this.state.myEventList.map(myevent => {
            var hosted_by = this.state.userList.filter(user => { if (myevent.event_by_user === user.id) { return user.first_name } else {return null} })
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

                        <p>
                            <u>Followers:</u><br/>
                            0
                        </p>

                        <p>
                            <u>Following:</u><br/>
                            0
                        </p>
                        <br />
                        <Link to={"/user/" + this.state.user.id + "/"}>Profile View</Link>
                        <br />
                        <Link to="/account-edit">Edit Profile</Link>
                        <br />
                        <Link to="#">Delete My Account</Link>

                    </div>

                    <div className="joined_events">
                        <h4>Events I am attending</h4>
                        <h6>{this.state.myEventList.length} total events</h6>
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