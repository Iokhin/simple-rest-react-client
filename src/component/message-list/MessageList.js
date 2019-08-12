import React from 'react';
import MessageListItem from "../message-list-item/MessageListItem";
import {Container, ListGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

export default class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };
    }

    componentDidMount() {
        this.getMessages();
    }

    getMessages() {
        fetch('http://localhost:8080/message', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json().then(json => {
            this.setState({
                messages: json
            })
        }));
    }

    messageInputChangeHandle = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    };

    messageAddButtonClickHandle = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: this.state.newMessage, date: new Date().toLocaleTimeString()})
        }).then(console.log);
        this.getMessages();
    };

    inputEnterHandle = (e) => {
        if (e.key === 'Enter') {
            this.messageAddButtonClickHandle(e);
            e.target.value = '';
        }
    };

    removeMessage = async (id) => {
        await fetch(`http://localhost:8080/message/${id}`, {method: 'DELETE'}).then(console.log);
        this.getMessages();
    };

    clearMessages = async () => {
        await fetch(`http://localhost:8080/message/clear`, {method: 'GET'}).then(console.log);
        this.getMessages();
    };

    editMessage = async (id, text) => {
        await fetch(`http://localhost:8080/message/${id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text: text, date: new Date().toLocaleTimeString()})
            }).then(console.log);
        this.getMessages();
    };

    render() {
        return (
            <Container>
                <h3>message list</h3>
                <ListGroup>
                    {this.state.messages.map(message => {
                        return (
                            <MessageListItem key={message.id} message={message} removeMessage={this.removeMessage}
                                             editMessage={this.editMessage}/>
                        )
                    })}
                </ListGroup>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={this.messageInputChangeHandle}
                            onKeyDown={this.inputEnterHandle}
                            placeholder="Enter your message"
                        />
                    </InputGroup>
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-danger" onClick={this.clearMessages}>clear</Button>
                </div>
            </Container>
        );
    }
}