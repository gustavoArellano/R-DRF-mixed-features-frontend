import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import MyAccount from './components/MyAccount';
import EditMyAccount from './components/EditMyAccount';
import Events from './components/Events';
import CreateEvent from './components/CreateEvent';


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

          <Route path="/login" exact component = {Login} />

          <Route path="/signup" exact component = {Signup} />     

          <Route path="/home" exact component = {Home} />

          <Route path="/user/:id" exact component = {UserProfile} />

          <Route path="/account" exact component = {MyAccount} />

          <Route path="/account-edit" exact component = {EditMyAccount} />

          <Route path="/events" exact component = {Events} />

          <Route path="/create-event" exact component = {CreateEvent} />

          {show}

        </div>

      </Router>
    )
  }
}

export default App;
