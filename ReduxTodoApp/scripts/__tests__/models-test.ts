/// <reference path="../../typings/jest/jest.d.ts" />

jest.dontMock('../models');
import * as Models from '../models';

describe('TodoUtils test', () => {
    it('toList test', () => {
        var todos: {[key: number]: Models.Todo} = {
            10: new Models.Todo('a'),
            5: new Models.Todo('b'),
            20: new Models.Todo('c')
        };
        todos[10].id = 10;
        todos[5].id = 5;
        todos[20].id = 20;

        var list = Models.TodoUtils.toList(todos);
        expect(list.length).toBe(3);
        expect(list[0].id).toBe(5);
        expect(list[1].id).toBe(10);
        expect(list[2].id).toBe(20);
    });
});
