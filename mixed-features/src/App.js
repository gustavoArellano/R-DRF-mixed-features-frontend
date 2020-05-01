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
    this.state = {}
  }

  render() {
    return(
      <Router>

        <div className="container">

          <NavBar 
            logged_in = {this.state.logged_in}
            showThis = {this.displayThis}
            handle_logout = {this.handle_logout}
          />
          <br />

          <Route path="/" exact component = {Welcome} />

          <Route path="/login" component = {Login} />

          <Route path="/signup" component = {Signup} />     

          <Route path="/home" component = {Home} />

        </div>

      </Router>
    )
  }
}

export default App;
