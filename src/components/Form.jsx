import React from 'react';
import * as $ from 'jquery';
import * as _ from 'lodash';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            response:  ''
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onFormSubmission = this.onFormSubmission.bind(this);
    }

    onNameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    onMessageChange (event) {
        console.log('event', event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    onFormSubmission () {
        const message = {
            name: this.state.name,
            message: this.state.message
        }
        $.ajax({
            url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting',
            type: 'POST',
            data: JSON.stringify(message),
            contentType: 'application/json',
            success: (response) => {
                console.log('RESPONSE', response)
                this.setState({
                    response: response
                })
            },
            error: () => console.error("Err message didn't post", error)
          })
    }


    render(){
        return (
            <div>
                {
                this.state.response ?
                <h1>{this.state.response}</h1>
                :
                <div>
                <p>name</p>
                <input onKeyUp={this.onNameChange} type="text" name="name" id="name"/>
                <p>message</p>
                <input onKeyUp={this.onMessageChange} type="text" name="message" id="message"/>
                <button onClick={this.onFormSubmission}>Submit</button>
                </div>
                }
            </div>           
        )
    }
}

export default Form;