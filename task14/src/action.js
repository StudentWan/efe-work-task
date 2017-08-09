import {store} from 'san-store'
import {updateBuilder} from 'san-update'


store.addAction('init', function () {
    let todos = JSON.parse(window.localStorage.todos || '[]')
    return updateBuilder().set('todos', todos)
})

store.addAction('addTodo', function (todo) {
    if (todo.prior && todo.status && todo.content) {
        let todos = store.getState('todos')
        todos.push(todo)
        window.localStorage.todos = JSON.stringify(todos)
        return updateBuilder().set('todos', todos)
    }
})

store.addAction('modifyTodo', function (obj) {
    let todo = obj.todo
    let index = obj.index
    if (todo.prior && todo.status && todo.content) {
        let todos = store.getState('todos')
        todos.splice(index, 1, todo)
        window.localStorage.todos = JSON.stringify(todos)
        return updateBuilder().splice('todos', index, 1, todo)
    }
})

store.addAction('deleteTodo', function (index) {
    let todos = store.getState('todos')
    todos.splice(index, 1)
    window.localStorage.todos = JSON.stringify(todos)
    // return updateBuilder().set('todos', todos)
    return updateBuilder().splice('todos', index, 1)
})

store.addAction('modifyStatus', function (obj) {
    let todos = store.getState('todos')
    console.log(obj.index)
    todos[obj.index].status = obj.status
    window.localStorage.todos = JSON.stringify(todos)
    return updateBuilder().splice('todos', obj.index, 1, todos[obj.index])
})