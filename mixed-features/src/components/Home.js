import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/Home.css'


const User = props => (
    <Link  to={"/" + props.user.id} className="user-list" ><p className="user-list">{props.user.username}</p></Link>
)
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            userList: []
        }

        this.usersList = this.usersList.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading: true})
        if(this.state.logged_in) {
            fetch('http://localhost:8000/api/current-user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })

            .then(res => res.json())
            .then(json => {
                this.setState({ 
                    username: json.username,
                })
            })
            .catch(err => {
                console.log(err, "you are not logged in!")
            })

            fetch('http://localhost:8000/api/user-list/', {
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

            window.location = '/'
        }
    }

    usersList() {
        return this.state.userList.map(user => {
            if ( this.state.username === user.username ) {
                return null
            } else {
                return <User user={user} key={user.id} />
            }
        })
    }

    render() {
        const content = this.state.isLoading ? '' : <h1>Welcome, {this.state.username}!</h1>
        const usersList = this.usersList()
        return(
            <div>

                { content }

                { usersList }

            </div>
        )
    }
}

export default Home

// Home.propTypes = {
//     logged_in: PropTypes.bool.isRequired,
// }