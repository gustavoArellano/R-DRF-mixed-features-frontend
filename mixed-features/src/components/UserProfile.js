import React, { Component } from 'react';
import '../static/UserProfile.css';
import { Link } from 'react-router-dom';
// import RiddenEventPosts from './RiddenEventPosts';
import MyPosts from './MyPosts';
// import HostingEvents from './HostingEvents';

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            userProfileId: this.props.match.params.id,
            user: '',
            displaying: '',
            userHostedEvents: []
        }
        this.display = this.display.bind(this);
        this.fetchUserDetail = this.fetchUserDetail.bind(this);
        this.fetchUserHostedEvents = this.fetchUserHostedEvents.bind(this);
        this.hostedEvents = this.hostedEvents.bind(this)

    }

    

    async fetchUserDetail() {
        if(this.state.logged_in) {
            await fetch(`http://localhost:8000/api/user-detail/${this.state.userProfileId}/`, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    user: data,
                })
            })
            .catch(err => {
                console.log(err, "something went wrong!")
            })

        } else {
            window.location = '/login'
        }
    }

    async fetchUserHostedEvents() {
        console.log(this.state.userProfileId)
        var id = this.state.userProfileId
        console.log("IAM HERE", id)
        if(this.state.logged_in) {
            await fetch(`http://localhost:8000/api/events-hosted/` + id + `/`, {
                method: 'GET',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userHostedEvents: data,
                })
                console.log(data)
                console.log(this.state.userHostedEvents)
            })
            .catch(err => console.log(err))

        } else {
            window.location = '/login'

        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        if(this.state.logged_in) {
            this.fetchUserDetail()
            this.fetchUserHostedEvents()
            this.setState({isLoading: false})
            console.log("USER HOSTED EVENTS = ", console.log(this.state.userHostedEvents))
            console.log("USER HOSTED USER ID = ", console.log(this.state.userProfileId))

        }

    }

    display = (name) => {
        this.setState({
            displaying: name,
        })
    }

    section() {
        switch (this.state.displaying) {
            case 'MyPosts':
            return <h1>{this.state.user.username} does not have any posts!</h1>
            
            default:
        return this.state.userHostedEvents.length === 0 ? <h1>{this.state.user.username} is not hosting any events at the moment!</h1> : this.hostedEvents() 
        }
    }

    hostedEvents() {
        const Event = props => (
            <div className="event-box">
                <Link to={"/event-details/" + props.event.id}><p>Title: {props.event.title}</p></Link>
                <br/>
                <p>Description: {props.event.description}</p>
                <br/>
                <p>Zip Code: {props.event.zip_code}</p>
                <br/>Attending: {props.event.users_going.length}
            </div>
        )
        
        return this.state.userHostedEvents.map(event => {
            return <Event event={event} key={event.id} />
        })
    }

    render() {
        const content = this.state.isLoading ? '' :
            <div className="info">
                
                <h1>{this.state.user.first_name}'s Profile</h1>

                <img src={ 'http://localhost:8000' + this.state.user.image } alt=""/>
                <h6>["For attending events" Badge[Bronze | Silver | Gold | Platinum]]</h6>
                <h6>["For hosting events" Badge[Bronze | Silver | Gold | Platinum]]</h6>
                <div className="info">
                    <p>Username: { this.state.user.username }</p>
                    <p>About me: asdkfjdkslajfklsdjfklsdajfksdlfjsd.</p>
                    <p>Email: { this.state.user.email }</p>
                    <p>Ridden Events: [0]</p>
                    <p>Followers: [0]</p>
                    <p>Riding Skill: [Beginner]</p>
                    <p>[Follow / Following]</p>
                    <p>[Direct Message]</p>
                </div>

                <div className="options">
                    <h6 onClick={() => this.display('HostingEvents')} className="option">Hosting Events</h6>
                    <h6>|</h6>
                    <h6 onClick={() => this.display('MyPosts')} className="option">My Posts</h6>
                </div> 

                {this.section()}

            </div>   
            
            // const hostedEvents = this.state.isLoading ? '' : this.hostedEvents()

        return(
            <div>

                {content}

                {/* {hostedEvents} */}
                
            </div>
        )
    }
} 

export default UserProfile