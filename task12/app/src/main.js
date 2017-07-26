import * as onething from './controller/onething'
import * as all from './controller/all'
import * as edit from './controller/edit'
import * as storage from './model/storage'


import 'font-awesome-webpack'
import './static/less/layout.less'

onething.render()

const hammerFooter = new Hammer($('.footer')[0])
hammerFooter.on('tap', (e) => {
    let tappedTarget = e.target
    if (e.target.classList.contains('sel')) {
        return
    }
    tappedTarget.classList.add('sel')

    try {
        edit.stopListen()
    } catch (e) {
        // nothing happend but tried to untied!
    }

    if (tappedTarget.classList.contains('all')) {
        $('.one-thing').removeClass('sel')
        all.render()
    } else {
        $('.all').removeClass('sel')
        onething.render()
    }
})

const hammerHeader = new Hammer($('.header')[0])
hammerHeader.on('tap', (e) => {
    switch (e.target.className) {
        case 'add':
            edit.render()
            edit.startListen()
            break
        case 'done-add':
            edit.doneAdd()
            $('.all').addClass('sel')
            all.render()
            break
        case 'done-edit':
            edit.doneEdit()
            $('.all').addClass('sel')
            all.render()
            break
        case 'cancel':
            edit.stopListen()
            $('.all').addClass('sel')
            $('.header').children('.cancel').css('visibility', 'hidden')
            all.render()
            break
        default:
            break
    }
})

let caniPan = true
const hammerBody = new Hammer($('.main')[0])
hammerBody.on('pan', (e) => {
    let choose
    if (e.deltaX > 0) {
        choose = `
                 <div class="leftchoose">
                     <div class="btn-done">已完成</div>
                     <div class="btn-wait">待办</div>
                     <div class="btn-now">进行中</div>
                 <div>
                 `
    } else {
        choose = `
                 <div class="rightchoose">
                     <div class="btn-edit">编辑</div>
                     <div class="btn-delete">删除</div>
                 <div>
                 `
    }
    addChoose(e.target, choose)
})

let priorArr = []
let statusArr = []
hammerBody.on('tap', (e) => {
    let target = e.target
    if (target.className.indexOf('btn-') > -1) {
        let todoData = storage.getData()
        let index = target.parentNode.parentNode.dataset.index
        if (target.className === 'btn-edit') {
            let prior = todoData[index].prior
            let status = todoData[index].status
            let content = todoData[index].content
            edit.render(prior, status, content, index)
            edit.startListen()
        } else {
            switch (target.className) {
                case 'btn-done':
                    todoData[index].status = '2'
                    break
                case 'btn-wait':
                    todoData[index].status = '1'
                    break
                case 'btn-now':
                    todoData[index].status = '0'
                    break
                case 'btn-delete':
                    todoData.splice(index, 1)
                    break
                default:
                    break
            }
            storage.modify(todoData)
            all.render()
        }
        target.parentNode.outerHTML = ''
        caniPan = true
    }

    if (target.className.indexOf('option-') > -1) {
        target.classList.toggle('sel')
        if (target.classList.contains('option-prior')) {
            let posPrior = priorArr.indexOf(target.dataset.option)
            if (posPrior === -1) {
                priorArr.push(target.dataset.option)
            } else {
                priorArr.splice(posPrior, 1)
            }
        } else {
            let posStatus = statusArr.indexOf(target.dataset.option)
            if (posStatus === -1) {
                statusArr.push(target.dataset.option)
            } else {
                statusArr.splice(posStatus, 1)
            }
        }
        all.render(priorArr, statusArr)
    }
})

function addChoose(el, choose) {
    if (caniPan) {
        if (el.className === 'text' && el.parentNode.className === 'item') {
            if (!el.nextElementSibling) {
                el.parentNode.innerHTML += choose
                caniPan = false
            }
        }
    }
}