import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup, Input} from "reactstrap";
import {sendShortLink} from "../../store/actions";
import {connect} from "react-redux";

class Shorten extends Component {
    state = {
        originalUrl: '',
    };
    submitFormHandler = async (e) => {
        e.preventDefault();

        if (this.state.originalUrl === '') {
             alert('Please, enter your URL')
        }
         else {
            await this.props.sendShortLink(this.state)
        }
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        return (
            <Container>
                    <Col xs={12} >
                        <Form onSubmit={this.submitFormHandler}>
                            <div className='d-flex justify-content-center mb-5 mt-5'>
                                <h1>Shorten your link</h1>
                            </div>
                            <FormGroup className='d-flex justify-content-center'>
                                <Input type="text" name="originalUrl" placeholder="Enter URL here" className='w-50' onChange={this.inputChangeHandler}/>
                                <Button color="danger" className='ml-2'>Shorten!</Button>
                            </FormGroup>
                        </Form>
                        {this.props.link &&
                        <div className='d-flex justify-content-center' style={{flexDirection: 'column', alignItems: 'center'}}>
                            <h4>Your link now looks like this:</h4>
                            <a href={`http://localhost:8000/short/${this.props.link.shortUrl}`}>http://localhost:8000/short/{this.props.link.shortUrl}</a>
                        </div>
                        }
                    </Col>
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    link: state.link,
});
const mapDispatchToProps = dispatch => ({
    sendShortLink: link => dispatch(sendShortLink(link)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Shorten);