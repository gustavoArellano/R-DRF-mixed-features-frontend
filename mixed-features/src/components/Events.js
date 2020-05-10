import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../static/Events.css'

class Events extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            eventList: [],
            userList: []
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

    eventsList() {
        const Event = props => (
            <div className="event-box">
                <p>Title: {props.event.title}</p>
                <p>Description: {props.event.description}</p>
                <p>Zip Code: {props.event.zip_code}</p>
                <p>Event By: {props.user}</p>
                <button>Join</button>
            </div>
        )

        return this.state.eventList.map(event => {
            // eslint-disable-next-line
            let hosted_by = this.state.userList.map(user => {if (event.event_by_user === user.id){return user.first_name}})
            return <Event event={event} user={hosted_by} key={event.id} />
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