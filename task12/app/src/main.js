import * as onething from './controller/onething'
import * as all from './controller/all'
import * as edit from './controller/edit'
import * as storage from './model/storage'

import 'font-awesome-webpack'
import './static/less/layout.less'

onething.render()

const hammerFooter = new Hammer($('.footer')[0])

hammerFooter.on('tap', (e) => {
    if (!e.target.classList[1]) {
        e.target.classList.add('sel')
    } else {
        return
    }
    let tapped = e.target.classList[0]
    if (tapped === 'one-thing') {
        try {
            edit.stopListen()
        } catch (e) {
            // nothing happend but tried to untied!
        }
        $('.all')[0].className = 'all'
        onething.render()
    } else {
        try {
            edit.stopListen()
        } catch (e) {
            // nothing happend but tried to untied!
        }
        $('.one-thing')[0].className = 'one-thing'
        all.render()
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
            $('.all')[0].classList.add('class', 'sel')
            all.render()
            break
        case 'done-edit':
            edit.doneEdit()
            $('.all')[0].classList.add('class', 'sel')
            all.render()
            break
        case 'cancel':
            edit.stopListen()
            $('.all')[0].classList.add('class', 'sel')
            $('.header')[0].firstElementChild.style.visibility = 'hidden'
            all.render()
            break
        default:
            break
    }
})

let caniPan = true
const hammerBody = new Hammer($('.main')[0])
hammerBody.on('panleft', (e) => {
    if (caniPan) {
        if (e.target.className === 'text' && e.target.parentNode.className === 'item') {
            if (!e.target.nextElementSibling) {
                let rightChoose = `<div class="rightchoose">
                                        <div class="btn-edit">编辑</div>
                                        <div class="btn-delete">删除</div>
                                   <div>
                                  `
                e.target.parentNode.innerHTML += rightChoose
                caniPan = false
            }
        }
    }
})

hammerBody.on('panright', (e) => {
    if (caniPan) {
        if (e.target.className === 'text' && e.target.parentNode.className === 'item') {
            if (!e.target.nextElementSibling) {
                let leftChoose = `<div class="leftchoose">
                                    <div class="btn-done">已完成</div>
                                    <div class="btn-wait">待办</div>
                                    <div class="btn-now">进行中</div>
                                  <div>
                                 `
                e.target.parentNode.innerHTML += leftChoose
                caniPan = false
            }
        }
    }
})

let priorArr = []
let statusArr = []
hammerBody.on('tap', (e) => {
    let target = e.target
    if (target.className.indexOf('btn-') > -1) {
        let todoData = storage.getData()
        let index = target.parentNode.parentNode.dataset.index
        switch (target.className) {
            case 'btn-done':
                todoData[index]['status'] = '2'
                storage.modify(todoData)
                all.render()
                break
            case 'btn-wait':
                todoData[index]['status'] = '1'
                storage.modify(todoData)
                all.render()
                break
            case 'btn-now':
                todoData[index]['status'] = '0'
                storage.modify(todoData)
                all.render()
                break
            case 'btn-edit':
                let prior = todoData[index]['prior']
                let status = todoData[index]['status']
                let content = todoData[index]['content']
                edit.render(prior, status, content, index)
                edit.startListen()
                break
            case 'btn-delete':
                todoData.splice(index, 1)
                storage.modify(todoData)
                all.render()
                break
            default:
                break
        }
        target.parentNode.outerHTML = ''
        caniPan = true
    }

    if (target.className.indexOf('option-') > -1) {
        target.classList.toggle('sel')
        switch (target.classList[0]) {
            case 'option-prior':
                let posPrior = priorArr.indexOf(target.dataset.option)
                if (posPrior === -1) {
                    priorArr.push(target.dataset.option)
                } else {
                    priorArr.splice(posPrior, 1)
                }
                break
            case 'option-status':
                let posStatus = statusArr.indexOf(target.dataset.option)
                if (posStatus === -1) {
                    statusArr.push(target.dataset.option)
                } else {
                    statusArr.splice(posStatus, 1)
                }
                break
            default:
                break
        }
        all.render(priorArr, statusArr)
    }
})