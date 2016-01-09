import * as React from 'react';
import * as Redux from 'redux';
import * as Models from './models';
import * as Actions from './actions';
import * as Reducers from './reducers';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import {Link, IndexLink} from 'react-router';

// TODO 1項目に対応するコンポーネント
interface TodoComposerProps extends React.Props<{}> {
    todo: Models.Todo;
    onToggle: (id: number) => void;
}

class TodoComposer extends React.Component<TodoComposerProps, {}> {
    render() {
        var todo = this.props.todo;
        var style: React.CSSProperties = {
            textDecoration: todo.completed ? 'line-through' : 'none'
        };
        return (
            <li onClick={() => this.props.onToggle(todo.id)}>
                <span style={style}>{todo.text}</span>
            </li>
        );
    }
}

// TODOのリスト
interface TodoListComposerProps extends React.Props<{}> {
    todos: Models.Todo[];
    onToggle: (id: number) => void;
}

class TodoListComposer extends React.Component<TodoListComposerProps, {}> {
    render() {
        var todos = this.props.todos.map(x => <TodoComposer key={x.id} todo={x} onToggle={x => this.props.onToggle(x)}/>);
        return (
            <div>
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

// TODOの入力フォーム
interface TodoFormComposerProps extends React.Props<{}> {
    onAddTodo: (text: string) => void;
}

class TodoFormComposer extends React.Component<TodoFormComposerProps, {}> {
    private handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        var text = this.refs['text'] as HTMLInputElement;
        this.props.onAddTodo(text.value);
        text.value = '';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type='text' ref='text' />
                <input type='submit' value='追加' />
            </form>
        );
    }
}

interface TodoListPageProps extends React.Props<{}> {
    todoList?: Models.TodoList;
    dispatch?: Redux.Dispatch;
}

class TodoListPage extends React.Component<TodoListPageProps, {}> {
    render() {
        var { todoList, dispatch } = this.props;
        return (
            <div>
                <TodoFormComposer onAddTodo={x => dispatch(Actions.addTodo(x))} />
                <hr />
                <TodoListComposer todos={Models.TodoUtils.toList(todoList.todos) } onToggle={x => dispatch(Actions.toggleTodo(x))} />
            </div>
        );
    }
}

function selectTodoListPage(state: Reducers.TodoAppState): TodoListPageProps {
    return {
        todoList: state.todos
    };
}
export const ReduxTodoListPage = ReactRedux.connect(selectTodoListPage)(TodoListPage);


// TODO削除ページ
interface TodoListManagePageProps extends React.Props<{}> {
    todoList?: Models.TodoList;
    dispatch?: Redux.Dispatch;
}

class TodoListManagePage extends React.Component<TodoListManagePageProps, {}> {
    render() {
        var { todoList, dispatch } = this.props;
        return (
            <div>
                <TodoListComposer
                    todos={Models.TodoUtils.toList(todoList.todos) }
                    onToggle={x => dispatch(Actions.deleteTodo(x)) } />
            </div>
        );
    }
}

function selectTodoListManagePage(state: Reducers.TodoAppState): TodoListManagePageProps {
    return {
        todoList: state.todos
    };
}
export const ReduxTodoListManagePage = ReactRedux.connect(selectTodoListManagePage)(TodoListManagePage);

interface TodoAppProps extends React.Props<{}> {
}

export class TodoApp extends React.Component<TodoAppProps, {}> {
    render() {
        return (
            <div>
                <h1>TODOアプリ</h1>
                <div>
                    <IndexLink to='/' activeStyle={{ backgroundColor: 'pink' }}>TODOリスト</IndexLink>
                    |
                    <Link to='/manage' activeStyle={{ backgroundColor: 'pink' }}>管理</Link>
                </div>
                {this.props.children}
            </div>            
        );
    }
}
