/// <reference path="../../typings/jest/jest.d.ts" />

jest.dontMock('../reducers');
jest.dontMock('../actions');
jest.dontMock('../models');
import * as Reducers from '../reducers';
import * as Actions from '../actions';
import * as Models from '../models';
import * as Redux from 'redux';

describe('reducers test', () => {
    it('initial state', () => {
        var state = Redux.createStore(Reducers.todoApp);
        var result = <Models.TodoList>state.getState().todos;
        expect(Models.TodoUtils.toList(result.todos).length).toBe(0);
    });

    it('crud', () => {
        // init
        var state = Redux.createStore(Reducers.todoApp);
        // add
        state.dispatch(Actions.addTodo('test'));
        var result = <Models.TodoList>state.getState().todos;
        var list = Models.TodoUtils.toList(result.todos);
        expect(list.length).toBe(1);
        expect(list[0].text).toBe('test');
        expect(list[0].completed).toBe(false);

        var id = list[0].id;
        // toggle
        state.dispatch(Actions.toggleTodo(id));
        result = <Models.TodoList>state.getState().todos;
        list = Models.TodoUtils.toList(result.todos);
        expect(list[0].completed).toBe(true);
        // toggle
        state.dispatch(Actions.toggleTodo(id));
        result = <Models.TodoList>state.getState().todos;
        list = Models.TodoUtils.toList(result.todos);
        expect(list[0].completed).toBe(false);

        // delete
        state.dispatch(Actions.deleteTodo(id));
        result = <Models.TodoList>state.getState().todos;
        list = Models.TodoUtils.toList(result.todos);
        expect(list.length).toBe(0);
    });
});
