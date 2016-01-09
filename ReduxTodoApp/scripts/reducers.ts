import * as Redux from 'redux';
import * as Actions from './actions';
import * as Models from './models';
import assign = require('object-assign');

// TODOを追加する
function addTodo(state: Models.TodoList, payload: Actions.AddTodoPayload) {
    var todos = <{ [key: number]: Models.Todo }>assign({}, state.todos);
    var todo = new Models.Todo(payload.text);
    todos[todo.id] = todo;
    return <Models.TodoList>assign({}, state, <Models.TodoList>{
        todos: todos
    });
}

// 対象のTODOのcompletedを切り替える
function toggleTodo(state: Models.TodoList, payload: Actions.ToggleTodoPayload) {
    var todos = <{ [key: number]: Models.Todo }>assign({}, state.todos);
    var target = <Models.Todo>assign({}, todos[payload.id]);
    target.completed = !target.completed;
    todos[payload.id] = target;
    return <Models.TodoList>assign({}, state, <Models.TodoList>{ todos: todos });
}

// 対象のTODOを削除する
function deleteTodo(state: Models.TodoList, payload: Actions.DeleteTodoPayload) {
    var todos = <{ [key: number]: Models.Todo }>assign({}, state.todos);
    delete todos[payload.id];
    return <Models.TodoList>assign({}, state, <Models.TodoList>{ todos: todos });
}

// TODOアプリの処理をディスパッチする
export function todos(state: Models.TodoList = new Models.TodoList(), action: Actions.Action<any>) {
    switch (action.type) {
        case Actions.Types.AddTodo:
            return addTodo(state, <Actions.AddTodoPayload>action.payload);
        case Actions.Types.ToggleTodo:
            return toggleTodo(state, <Actions.ToggleTodoPayload>action.payload);
        case Actions.Types.DeleteTodo:
            return deleteTodo(state, <Actions.DeleteTodoPayload>action.payload);
        default:
            return state;
    }
}

// アプリのステート
export interface TodoAppState {
    todos: Models.TodoList
}

// Reducerの作成
export const todoApp = Redux.combineReducers({
    todos
});