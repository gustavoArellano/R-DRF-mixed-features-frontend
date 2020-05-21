import React, { Component } from 'react';

class EventDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            event_id: this.props.match.params.id,
            event: '',
            eventUsersGoing: []
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        const event_id = this.state.event_id
        const id = event_id.toString()
        const point = "event-detail/" + id + "/"
        if(this.state.logged_in) {
            fetch("http://localhost:8000/api/" + point, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    event: data,
                    eventUsersGoing: data.users_going,
                    isLoading: false
                })
                console.log(this.state.event)
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
                
                <h1>Event Details</h1>
                <h2>Title: {this.state.event.title}</h2>
                <h2>Description: {this.state.event.description}</h2>
                <h2>Zip Code: {this.state.event.zip_code}</h2>
                <h2>Attending: {this.state.eventUsersGoing.length}</h2>

            </div>
        return(
            <div>
                {content}
            </div>
            
        )
    }
}

export default EventDetails;