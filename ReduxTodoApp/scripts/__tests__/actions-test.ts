/// <reference path="../../typings/jest/jest.d.ts" />

jest.dontMock('../actions');
import * as Actions from '../actions';

describe('action tests', () => {
    it('create addTodo', () => {
        var action = Actions.addTodo('test');
        expect(action.type).toBe(Actions.Types.AddTodo);
        expect(action.payload.text).toBe('test');
    });

    it('create toggleTodo', () => {
        var action = Actions.toggleTodo(10);
        expect(action.type).toBe(Actions.Types.ToggleTodo);
        expect(action.payload.id).toBe(10);
    });

    it('create deleteTodo', () => {
        var action = Actions.deleteTodo(10);
        expect(action.type).toBe(Actions.Types.DeleteTodo);
        expect(action.payload.id).toBe(10);
    });
});
