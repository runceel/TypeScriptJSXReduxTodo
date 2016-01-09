import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createHashHistory} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {TodoApp, ReduxTodoListPage, ReduxTodoListManagePage} from './components';
import {Provider} from 'react-redux';
import * as Redux from 'redux';
import * as Reducers from './reducers';

let history = createHashHistory();
var routes = (
    <Router history={history}>
        <Route path='/' component={TodoApp} >
            <IndexRoute component={ReduxTodoListPage} />
            <Route path='/manage' component={ReduxTodoListManagePage} />
        </Route>
    </Router>
);

let store = Redux.createStore(Reducers.todoApp);

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('content'));
