import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/Events.css'


class Events extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            logged_in: localStorage.getItem('token') ? true : false,
            autoClose: false,
            isLoading: false,
            eventList: [],
            userList: [],
        }

        this.eventsList = this.eventsList.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.fetchEvents = this.fetchEvents.bind(this);


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
                .then(json => {
                    this.setState({ 
                        user: json,
                    })
                })
                .catch(err => {
                    console.log(err, "you are not logged in!")
                })

            var id = this.state.user.id
            await fetch('http://localhost:8000/api/not-attending-event/' + id + '/', {
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

    async fetchEvents() {
        var id = this.state.user.id
        await fetch('http://localhost:8000/api/not-attending-event/' + id + '/', {
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
    }

    async handle_submit(e, event_id) {
        e.preventDefault();
        this.setState({isLoading: true})
        const event = event_id
        const user = this.state.user.id
        console.log("SUBMIT DATA = ", user, event)
        if(this.state.logged_in) {
            var csrftoken = this.getCookie('csrftoken')
            await fetch('http://localhost:8000/api/join/' + event + '/' + user + '/', {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
            })
                .then(res => this.fetchEvents())
                .then(alert("You've joined this event!! 🙌 🎫 📅"))
                .catch(err => console.log("Error from catch: ", err))
        } else {
            window.location = '/login';
        }
    }

    eventsList() {
        const Event = props => (
            <div className="event-box">
                <Link to={"/event-details/" + props.event.id}><p>Title: {props.event.title}</p></Link>
                <p>Description: {props.event.description}</p>
                <p>Zip Code: {props.event.zip_code}</p>
                <p>Event By: {props.user}</p>
                <form onSubmit={(e) => this.handle_submit(e, props.event.id)}>
                    <button onClick={this.handle_change} type="submit" >Join</button>
                </form>
            </div>
        )

        return this.state.eventList.map(event => {
            // eslint-disable-next-line
            let hosted_by = this.state.userList.map(user => {if (event.event_by_user === user.id){return user.first_name}})
            return  <Event event={event} user={hosted_by} key={event.id} />
        })
    }


    render() {
        const content = this.state.isLoading ? '' : <h1>Events</h1>
        const eventsList = this.state.isLoading ? '' : this.eventsList()

        return(
            <div className="events-container">
                
                { content }

                { eventsList }

            </div>
        )
    }
}

export default Events;