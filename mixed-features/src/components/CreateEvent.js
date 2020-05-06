import React, { Component } from 'react';

class CreateEvent extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return(
            <div>

                <h1>Lets start an event!</h1>

                <form>

                    <label>Title</label>
                    <input type="text" />

                    <label>Description</label>
                    <input type="text" />

                    <label>Zip Code</label>
                    <input type="text" />

                    <button type="submit">Create</button>

                </form>

            </div>
        )
    }
}

export default CreateEvent