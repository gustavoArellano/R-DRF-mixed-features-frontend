import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';


class App extends Component {
  constructor() {
    super()
    this.state = {
      displayed: '',
      logged_in: localStorage.getItem('token') ? true : false,
    }
  }

  displayThis = show => {
      this.setState({
          displayed: show
      });
  };

  render() {
    let show;
      switch (this.state.displayed) {

        case 'login':
            show = <Login />
            break;

        case 'signup':
            show = <Signup handle_signup={this.handle_signup} />
            break;

        default: 

    }
    return(
      <Router>

        <div className="container">

          <NavBar 
            logged_in = {this.state.logged_in}
            showThis = {this.displayThis}
          />
          <br />

          <Route path="/" exact component = {Welcome} />

          <Route path="/login" component = {Login} />

          <Route path="/signup" component = {Signup} />     

          <Route path="/home" component = {Home} />

          {show}

        </div>

      </Router>
    )
  }
}

export default App;
