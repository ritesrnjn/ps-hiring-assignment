import React from 'react';
import './App.css';
import Home from './Home'

import { Route, Switch, } from 'react-router-dom';

function App(props) {
    return (
            <Switch>
                <Route
                    path="/"
                    render={props => <Home {...props} />}
                />
            </Switch>
    );
}

export default App;