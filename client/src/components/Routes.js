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
import * as path from '../constants/Routes';
const routes = (props) => (
    <Switch>
    <Route exact path={path.base} component={Home}/>
    <Route path={path.login} component={Login} />
    <Route path={path.register} component={Register} />
    <Route path={path.slug} component={Editor} />
    <Route path={path.editor} component={Editor} />
    <Route path={path.article} component={Article} />
    <Route path={path.settings} component={Settings} />
    <Route path={path.favorite} component={ProfileFavorites} />
    <Route path={path.user} component={Profile} />
    </Switch>
);

export default routes;
