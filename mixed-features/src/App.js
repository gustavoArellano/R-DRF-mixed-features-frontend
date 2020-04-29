import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed: '',
      logged_in: false,
    };
  };

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
        show = <Signup />
        break;

      default: 
        show = (
          <div className="title">
            <h1>Mixed Features</h1>
            <p>Please SIGNUP or LOGIN!!!</p>
          </div>
        )
    }
    return(
      <div className="app-container">

        <NavBar 
          logged_in = {this.state.logged_in}
          showThis = {this.displayThis}
        />

        {show}
        

      </div>
    )
  }
}

export default App;
