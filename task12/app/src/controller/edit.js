import * as storage from '../model/storage'

let data = {}
let index
export function render(...isEdit) {
    const header = $('.header')[0]
    if (isEdit.length === 0) {
        header.lastElementChild.className = 'done-add'
        header.lastElementChild.innerHTML = 'Done'
    } else {
        header.lastElementChild.className = 'done-edit'
        header.lastElementChild.innerHTML = 'Done'
    }

    header.firstElementChild.style.visibility = 'visible'

    const footer = $('.footer')[0]

    footer.firstElementChild.className = 'one-thing'
    footer.lastElementChild.className = 'all'



    const main = $('#main')[0]
    main.innerHTML = `
                     <div class="select">
                        <div class="select-prior">
                            <p class="prior-item" data-prior="0"><i class="high fa fa-circle" aria-hidden="true"></i>高优
                            </p>
                            <p class="prior-item" data-prior="1"><i class="medium fa fa-circle" aria-hidden="true"></i>中优
                            </p>
                            <p class="prior-item" data-prior="2"><i class="low fa fa-circle" aria-hidden="true"></i>低优
                            </p>
                        </div>
                        <div class="select-status">
                            <p class="status-item" data-status="0"><i class="fa fa-play" aria-hidden="true"></i>进行中
                            </p>
                            <p class="status-item" data-status="1"><i class="fa fa-pause" aria-hidden="true"></i>待办
                            </p>
                            <p class="status-item" data-status="2"><i class="fa fa-stop" aria-hidden="true"></i>已完成
                            </p>
                        </div>
                     </div>
                     <div class="input-task">
                         <textarea id="task-info" cols="50" rows="10"></textarea>
                     </div>
                     `
    if (isEdit.length > 0) {
        $('.select-prior')[0].children[isEdit[0]].classList.add('sel')
        data.prior = isEdit[0]
        $('.select-status')[0].children[isEdit[1]].classList.add('sel')
        data.status = isEdit[1]
        $('#task-info')[0].value = isEdit[2]
        index = isEdit[3]
    }
}

export function startListen() {
    const hammerSelect = new Hammer($('.select')[0])
    hammerSelect.on('tap', selectItem)
}

export function doneAdd() {
    data.content = $('#task-info')[0].value
    if (data.prior && data.status && data.content) {
        storage.add(data)
    }
    data = {}
    stopListen()
}

export function doneEdit() {
    data.content = $('#task-info')[0].value
    let todoData = storage.getData()
    todoData[index] = data
    if (data.prior && data.status && data.content) {
        storage.modify(todoData)
    }
    data = {}
    stopListen()
}

export function stopListen() {
    const hammerSelect = new Hammer($('.select')[0])
    hammerSelect.off('tap', selectItem)
}

function selectItem(e) {
    switch (e.target.className) {
        case 'prior-item':
            data.prior = e.target.dataset.prior
            setStyle(e.target, 'prior-item')
            break
        case 'status-item':
            data.status = e.target.dataset.status
            setStyle(e.target, 'status-item')
            break
        default:
            break
    }
}

function setStyle(el, defVal) {
    for (let child of el.parentNode.children) {
        child.className = defVal
    }
    el.classList.add('sel')
}