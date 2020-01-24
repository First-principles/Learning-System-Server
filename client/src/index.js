import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {base} from './constants/Routes';
import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={base} component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
