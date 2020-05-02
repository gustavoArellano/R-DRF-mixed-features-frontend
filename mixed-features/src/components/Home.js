import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if(this.state.logged_in) {
            fetch('http://localhost:8000/api/current-user/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ username: json.username})
            })
        }
    }

    render() {
        return(
            <div>
                <h1>Welcome, [NAME HERE]!</h1>
            </div>
        )
    }
}

export default Home