import React, { Component } from 'react';
// import Signup from './Signup';
// import Login from './Login';
import '../static/Welcome.css';


class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
          displayed: '',
          logged_in: localStorage.getItem('token') ? true : false,
        //   username: ''
        };
      };



    render() {
        return(
            <div className="app-container">

                <h1 className="title">Mixed Features</h1>

            </div>
        )
    }
}

export default Welcome