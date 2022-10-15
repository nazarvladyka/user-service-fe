import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUsersComponent from './components/user/ListUsersComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUserComponent from './components/user/CreateUserComponent';
import ViewUserComponent from './components/user/ViewUserComponent';

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={ListUsersComponent}></Route>
                        <Route path="/users/:id" component={ViewUserComponent}></Route>
                        <Route path="/users/" component={ListUsersComponent}></Route>
                        <Route path="/add-user/:id" component={CreateUserComponent}></Route>
                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>

    );
}

export default App;
