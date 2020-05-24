import React, { Component } from 'react';

class Error extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return(
            <div>
                <h1>Error</h1>
                <p>You must be logged in to view this page!!!</p>
                <button>Login</button>
            </div>
        )
    }
}

export default Error