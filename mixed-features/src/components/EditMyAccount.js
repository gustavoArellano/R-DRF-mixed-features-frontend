import React, { Component } from 'react';
import '../static/EditMyAccount.css';
import axios from 'axios';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';


class EditMyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            user: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            zip_code: '',
            logged_in: localStorage.getItem('token') ? true : false,
            isLoading: false,
        }

        this.getCookie = this.getCookie.bind(this);
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
        console.log("IMAGE CHANGE = ", e.target.files[0])
        this.setState({
            image: e.target.files[0],
        })
        console.log("AFTER IMAGE CHANGE THIS IS THE NEW IMAGE STATE = ", this.state.image, this.state.first_name)
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

    async to_account() {
        await this.componentDidMount;
    }

    handle_update = (e) => {
        e.preventDefault();
        if(this.state.logged_in) {
            console.log("THIS STATE = ", this.state)
            var csrftoken = this.getCookie('csrftoken')
            var id = this.state.user.id
            let form_data = new FormData();
            form_data.append('image', this.state.image, this.state.image.name);
            form_data.append('first_name', this.state.first_name);
            form_data.append('last_name', this.state.last_name);
            form_data.append('username', this.state.username);
            form_data.append('email', this.state.email);
            form_data.append('zip_code', this.state.zip_code);
            console.log("THIS IS WHATS IN THE FORM = ", form_data.data,)
            axios.put('http://localhost:8000/api/user-update/' + id + '/', form_data, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(res => console.log(res.data, "User Updated!"))
                .catch(err => console.log(err, 'Update failed from catch.'))
                
        } else {
            window.location = '/login'
        }

    }

    render() {
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!
        // IMAGE UPLOAD WORKS, DOES NOT WORK UPDATING IT TOGETHER WITH THE REST OF THE DATA, SEPARATE IT!!!!!!!


        // ALSO, AS SOON AS UPDATE IS SUBMITTED AND WINDOW RELOCATION BACK TO ACCOUNT FAILS TO UPLOAD THE IMAGE!!!
        // ALSO, AS SOON AS UPDATE IS SUBMITTED AND WINDOW RELOCATION BACK TO ACCOUNT FAILS TO UPLOAD THE IMAGE!!!
        // ALSO, AS SOON AS UPDATE IS SUBMITTED AND WINDOW RELOCATION BACK TO ACCOUNT FAILS TO UPLOAD THE IMAGE!!!
        // ALSO, AS SOON AS UPDATE IS SUBMITTED AND WINDOW RELOCATION BACK TO ACCOUNT FAILS TO UPLOAD THE IMAGE!!!
        // ALSO, AS SOON AS UPDATE IS SUBMITTED AND WINDOW RELOCATION BACK TO ACCOUNT FAILS TO UPLOAD THE IMAGE!!!       
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        console.log("CURRENT STATE = ", this.state)
        const userProfile = 
            this.state.isLoading ? 
                ''
            : 
            <form onSubmit={this.handle_update}>
                <label>Profile Image</label>
                <img src={`http://localhost:8000` + this.state.user.image} alt=""/>
                <input type="file" name="image" accept="image/png, image/gif, image/jpeg" onChange={this.handle_image_change} />

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