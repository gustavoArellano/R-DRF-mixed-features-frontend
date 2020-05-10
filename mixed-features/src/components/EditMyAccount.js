import React, { Component } from 'react';
import '../static/EditMyAccount.css';
import axios from 'axios';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';


class EditMyAccount extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            zip_code: '',
            logged_in: localStorage.getItem('token') ? true : false,
            image: null,
        }

        this.getCookie = this.getCookie.bind(this);
        this.is_image_included = this.is_image_included.bind(this)
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
            .then(data => {
                this.setState({ 
                    user: data,
                    image: data.image,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    email: data.email,
                    zip_code: data.zip_code,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log("ERROR: " + err, "Somethings wrong in update.")
            })
        } else {
            window.location = '/login'
        }
    }

    handle_image_change = e => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handle_change = e => {        
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            console.log(newState)
            return newState;
        })
    }

    is_image_included() {
        let form_data = new FormData();
        if (this.state.image.name === undefined) {
            return null;
        } else {
            return form_data.append('image', this.state.image, this.state.image.name);
        }
    }

    handle_update = (e, data) => {
        e.preventDefault();
        if(this.state.logged_in) {
            console.log(this.state)
            var csrftoken = this.getCookie('csrftoken')
            var id = this.state.user.id
            console.log("IMAGE NAME = ", this.state.image.name)
            let form_data = new FormData();
            this.is_image_included()
            form_data.append('first_name', this.state.first_name);
            form_data.append('last_name', this.state.last_name);
            form_data.append('username', this.state.username);
            form_data.append('email', this.state.email);
            form_data.append('zip_code', this.state.zip_code);
            axios.put('http://localhost:8000/api/user-update/' + id + '/', form_data, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrftoken,
                }
            })

                .then(window.location = '/account')  
                .catch(err => console.log(err, 'Update failed from catch.'))
        } else {
            window.location = '/login'
        }
    }

    render() {
        console.log("CURRENT IMAGE", this.state.image_name)
        const userProfile = 
            this.state.isLoading ? 
                ''
            : 
            <form onSubmit={this.handle_update}>
                <label>Profile Image</label>
                <img src={`http://localhost:8000` + this.state.user.image} alt=""/>
                <input type="file" name="image" accept="image/*" onChange={this.handle_image_change} />

                <label>First Name</label>
                <input type="text" name="first_name" value={this.state.first_name} onChange={this.handle_change} />

                <label>Last Name</label>
                <input type="text" name="last_name" value={this.state.last_name} onChange={this.handle_change} />

                <label>Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handle_change} />

                <label>Email</label>
                <input type="text" name="email" value={this.state.email} onChange={this.handle_change} />

                <label>Zip Code</label>
                <input type="text" name="zip_code" value={this.state.zip_code} onChange={this.handle_change} />

                <input className="button" type="submit" />

            </form>
        return(
            <div>

                <h1>Update Account</h1>

                {userProfile}
                

            </div>
        )
    }
}

export default EditMyAccount;