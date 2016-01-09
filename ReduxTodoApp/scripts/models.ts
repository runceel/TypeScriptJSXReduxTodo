// TODOの1項目
export class Todo {
    id: number = Date.now();
    constructor(public text: string, public completed: boolean = false) {
    }
}

// TODOのリストを管理する
export class TodoList {
    // TODOのハッシュ
    todos: { [key: number]: Todo } = {};
}

// Todo関連のユーテリティ
export class TodoUtils {
    static toList(todos: { [key: number]: Todo }) {
        var items: Todo[] = [];
        for (var key in todos) {
            items.push(todos[key]);
        }
        return items.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        });
    }
}