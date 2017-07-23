export function init() {
    if (!localStorage.todoData) {
        localStorage.todoData = JSON.stringify([])
    }
}

export function add(data) {
    init()
    let todoData = JSON.parse(localStorage.todoData)
    todoData.push(data)
    localStorage.todoData = JSON.stringify(todoData)
}

export function modify(data) {
    init()
    localStorage.todoData = JSON.stringify(data)
}

export function getData() {
    init()
    return JSON.parse(localStorage.todoData)
}
