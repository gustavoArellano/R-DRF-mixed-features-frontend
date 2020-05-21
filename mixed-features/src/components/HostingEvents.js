import React, { Component } from 'react';

class HostingEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            userHostingList: [],
            isLoading: false,
            userEvents: [],
            user: ''
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        // const getId = this.state.userId
        // const id = getId.toString()
        if(this.state.logged_in) {
            fetch(`http://localhost:8000/api/user-details/` + this.props.user.id + `/`, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
                .then(res => res.json())
                .then(events => this.setState({isLoading: false, userEvents: events}))
                .catch(err => console.log("ERROR = ", err))
        }
    }

    render() {
        console.log("FROM HOSTINGEVENTSCOMPONENT USER = ", this.props.user)
        console.log("FROM HOSTINGEVENTSCOMPONENT EVENTS = ", this.state.user)
        // const myEvents = this.state.myEventList.map(event => {return Event})
        return(
            
            <div>
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

export default HostingEvents;