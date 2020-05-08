import React, { Component } from 'react';

class CreateEvent extends Component {
    constructor() {
        super()
        this.state = {
            users_going: [],
            event_by_user: '',
            title: '',
            description: '',
            zip_code: '',
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false
        }

        this.getCookie = this.getCookie.bind(this);
        this.handle_submit = this.handle_submit.bind(this);


    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if ( cookie.substring(0, name.length +1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length +1));
                    break;
                }
            }
        }
        return cookieValue;
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
                        event_by_user: json.id,
                        users_going: [json.id]
                    })
                })
                .catch(err => {
                    console.log(err, "you are not logged in!")
                })
        }
    }

    handle_change_title = e => {
        this.setState({
            title: e.target.value,
        })
        console.log(this.state.title)
    }

    handle_change_description = e => {
        this.setState({
            description: e.target.value,
        })
        console.log(this.state.description)
    }

    handle_change_zip_code = e => {
        this.setState({
            zip_code: e.target.value,
        })
        console.log(this.state.zip_code)
    }

    handle_submit = (e) => {
        console.log(this.state)
        e.preventDefault();
        const data = {
            users_going: this.state.users_going,
            event_by_user: this.state.event_by_user,
            title: this.state.title,
            description: this.state.description,
            zip_code: this.state.zip_code
        }
        // console.log(data)
        if(this.state.logged_in) {
            var csrftoken = this.getCookie('csrftoken')
            fetch('http://localhost:8000/api/event-create/', {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .catch(err => console.log("Error from catch: ", err))
        } else {
            window.location = '/login'
        }
    }

    render() {
        return(
            <div>

                <h1>Lets start an event!</h1>

                <form onSubmit={this.handle_submit}>

                    <label>Title</label>
                    <input type="text" name="title" onChange={this.handle_change_title} />

                    <label>Description</label>
                    <input type="text" name="description" onChange={this.handle_change_description} />

                    <label>Zip Code</label>
                    <input type="text" name="zip_code" onChange={this.handle_change_zip_code} />

                    <button type="submit">Create</button>

                </form>

            </div>
        )
    }
}

export default CreateEvent