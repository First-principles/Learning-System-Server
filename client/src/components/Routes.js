import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';

const routes = (props) => (
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/editor/:slug" component={Editor} />
    <Route path="/editor" component={Editor} />
    <Route path="/article/:id" component={Article} />
    <Route path="/settings" component={Settings} />
    <Route path="/@:username/favorites" component={ProfileFavorites} />
    <Route path="/@:username" component={Profile} />
    </Switch>
);

export default routes;
