import React from 'react';
import {ListGroup, Button, FormControl, InputGroup, FormLabel} from 'react-bootstrap';

import './MessageListItem.css';

export default class MessageListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message.text,
            isEditing: false
        };
    }

    messageInputChangeHandle = (e) => {
        this.setState({
            message: e.target.value
        })
    };

    removeMessage = (id) => {
        this.props.removeMessage(id);
    };

    editMessage = () => {
        this.setState({isEditing: true});
    };

    inputEnterHandle = (e) => {
        if (e.key === 'Enter') {
            this.submitEditedMessage();
            e.target.value = '';
        }
    };

    submitEditedMessage = () => {
        this.props.editMessage(this.props.message.id, this.state.message);
        this.setState({isEditing: false});
    };

    render() {
        return this.state.isEditing ? (
                <InputGroup className="mb-3">
                    <FormLabel>
                        Edit message:
                        <div className="d-flex">
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={this.messageInputChangeHandle}
                                onKeyDown={this.inputEnterHandle}
                                placeholder={this.state.message}
                            />
                            <Button onClick={this.submitEditedMessage} variant="outline-success"><i
                                className="fa fa-check"/></Button>
                        </div>
                    </FormLabel>
                </InputGroup>
            )

            :

            (
                <ListGroup.Item>
                    <div className="d-flex">
                        <p id="MessageHeaderItem">Time: {this.props.message.date}</p>
                        <p id="MessageHeaderItem">Message ID: {this.props.message.id}</p>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <p>{this.props.message.text}</p>
                        <div>
                            <Button id="Button" onClick={() => this.editMessage(this.props.message.id)}
                                    variant="outline-warning">
                                <i className="fa fa-pencil"/></Button>
                            <Button id="Button" onClick={() => this.removeMessage(this.props.message.id)}
                                    variant="outline-danger">
                                <i className="fa fa-trash-o"/></Button>
                        </div>
                    </div>
                </ListGroup.Item>
            );
    }
}