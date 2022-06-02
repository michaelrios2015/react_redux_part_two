import React, { Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore(( state = { loading: true, users: []}, action )=>{
    return state;
});

class App extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            loading: true
        };
    }

    async componentDidMount(){
        this.setState({ 
            users: (await axios.get('/api/users')).data,
            loading: false
         });
    }
    
    render(){
        const { users, loading } = this.state
        if (loading){
            return '.....loading';
        }
        return (
                <ul>
                    {
                        users.map( user => {
                            return (
                                <li key = { user.id }>
                                    { user.name }
                                </li>
                            );
                        })
                    }
                </ul>
        );
    }
}


import { createRoot } from 'react-dom/client';
const container = document.querySelector('#root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store= { store }><App tab="home" /></Provider>);


// not the way they do it anymore 
// render(<App />, document.querySelector('#root'));