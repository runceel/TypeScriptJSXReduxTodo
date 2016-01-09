// Actionの識別子
export enum Types {
    AddTodo,
    ToggleTodo,
    DeleteTodo
}

// Actionのインターフェース
export interface Action<TPayload> {
    type: Types;
    payload: TPayload;
}

// TODO追加のPayload
export class AddTodoPayload {
    constructor(public text: string) {
    }
}

// TODO完了状態のトグルのPayload
export class ToggleTodoPayload {
    constructor(public id: number) {
    }
}

// TODO追加のPayload
export class DeleteTodoPayload {
    constructor(public id: number) {
    }
}

// TODO追加アクション
export function addTodo(text: string): Action<AddTodoPayload> {
    return {
        type: Types.AddTodo,
        payload: new AddTodoPayload(text)
    };
}

// TODO完了状態のトグルアクション
export function toggleTodo(id: number): Action<ToggleTodoPayload> {
    return {
        type: Types.ToggleTodo,
        payload: new ToggleTodoPayload(id)
    };
}

// TODO削除のアクション
export function deleteTodo(id: number): Action<DeleteTodoPayload> {
    return {
        type: Types.DeleteTodo,
        payload: new DeleteTodoPayload(id)
    };
}