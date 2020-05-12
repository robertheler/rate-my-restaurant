import React from 'react';
import ImageContainer from './ImageContainer.jsx';
import styled from 'styled-components';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            users: []
        }
        this.getImages = this.getImages.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getImages();
        this.getUsers();
    }

    // error handling
    handleError(error) {
        console.log(error);
    }

    getImages() {
        axios.get('http://localhost:3002/images')
        .then(res => this.setState({images: res.data}))
        .catch(this.handleError)
    }

    getUsers() {
        axios.get('/users')
        .then(res => this.setState({users: res.data}))
        .catch(this.handleError)
    }

    render() {
        return(
            <div>
                <ImageContainer images={this.state.images} users={this.state.users}/>
            </div>
        );
    }
}

export default App;