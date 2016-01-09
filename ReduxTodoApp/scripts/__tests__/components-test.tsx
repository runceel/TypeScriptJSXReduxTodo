/// <reference path="../../typings/jest/jest.d.ts" />

jest.dontMock('../components');
jest.dontMock('../models');
import * as Components from '../components';
import * as Models from '../models';
import * as React from 'react';
import TestUtils = require('react-addons-test-utils');

describe('components tests', () => {
    it('TodoComposer not completed', () => {
        var todo = new Models.Todo('test');
        todo.id = 1;

        var mockHandler = jest.genMockFunction();
        var todoComposer = TestUtils.renderIntoDocument(
            <Components.TodoComposer todo={todo} onToggle={mockHandler} />);
        var span = TestUtils.findRenderedDOMComponentWithTag(todoComposer, 'span');
        expect(span.textContent).toBe('test');
        expect((span as any).style.textDecoration).toBe('none');
        TestUtils.Simulate.click(span);
        expect(mockHandler).toBeCalled();
    });

    it('TodoComposer completed', () => {
        var todo = new Models.Todo('test', true);
        todo.id = 1;

        var mockHandler = jest.genMockFunction();
        var todoComposer = TestUtils.renderIntoDocument(
            <Components.TodoComposer todo={todo} onToggle={mockHandler} />);
        var span = TestUtils.findRenderedDOMComponentWithTag(todoComposer, 'span');
        expect(span.textContent).toBe('test');
        expect((span as any).style.textDecoration).toBe('line-through');
        TestUtils.Simulate.click(span);
        expect(mockHandler).toBeCalled();
    });

    it('TodoList', () => {
        var todos: Models.Todo[] = [
            new Models.Todo('test1'),
            new Models.Todo('test2'),
            new Models.Todo('test3')
        ];
        todos[0].id = 0;
        todos[1].id = 1;
        todos[2].id = 2;
        var mockHandler = jest.genMockFunction();
        var todoListComposer = TestUtils.renderIntoDocument(
            <Components.TodoListComposer todos={todos} onToggle={mockHandler} />);
        var spans = TestUtils.findAllInRenderedTree(todoListComposer, (x: any) => {
            return x.tagName && x.tagName.toLowerCase() === 'span';
        });
        expect(spans.length).toBe(3);
        TestUtils.Simulate.click(spans[1] as Element);
        expect(mockHandler).toBeCalledWith(todos[1].id);
    });

    it('TodoFormComposer', () => {
        var mockHandler = jest.genMockFunction();
        var formComposer = TestUtils.renderIntoDocument(
            <Components.TodoFormComposer onAddTodo={mockHandler}/>);

        var text = TestUtils.findRenderedDOMComponentWithTag(formComposer, 'form').childNodes[0] as HTMLInputElement;
        var submit = TestUtils.findRenderedDOMComponentWithTag(formComposer, 'form').childNodes[1] as HTMLInputElement;
        text.value = 'test';
        TestUtils.Simulate.submit(submit);

        expect(mockHandler).toBeCalledWith('test');
        expect(text.value).toBe('');
    });
});