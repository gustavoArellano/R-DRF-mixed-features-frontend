import React, { Component } from 'react';
// import PropTypes from 'prop-types'

// const User = props => (
//     <p>{props.user.username}</p>
// )
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
            userList: []
        }

        // this.usersList = this.usersList.bind(this)
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
                .then(json => 
                    this.setState({userList: json, isLoading: false})
                    )
        } else {
            window.location = '/'
        }
    }

    // usersList() {
    //     return this.state.userList.map(user => {
    //         return <User user={user} key={user.id} />
    //     })
    // }

    render() {
        const content = this.state.isLoading ? '' : <h1>Welcome, {this.state.username}!</h1>
        return(
            <div>

                { content }

                { this.state.userList.map((thisUser) => (
                    <p>{thisUser}</p>
                ))}

            </div>
        )
    }
}

export default Home

// Home.propTypes = {
//     logged_in: PropTypes.bool.isRequired,
// }