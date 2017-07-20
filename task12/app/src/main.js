import * as onething from './controller/onething'
import * as all from './controller/all'
import * as edit from './controller/edit'

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
        $('.all')[0].className = 'all'
        onething.render()
    } else {
        $('.one-thing')[0].className = 'one-thing'
        all.render()
    }
})

const hammerHeader = new Hammer($('.header')[0])

hammerHeader.on('tap', (e) => {
    switch (e.target.className) {
        case 'add':
            edit.render()
            break
        case 'done':
            $('.all')[0].classList.add('class', 'sel')
            all.render()
            //TODO
            break
        case 'cancel':
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
        if (e.target.className === 'text') {
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
        if (e.target.className === 'text') {
            if (!e.target.nextElementSibling) {
                let leftChoose = `<div class="leftchoose">
                                    <div class="btn-edit">已完成</div>
                                    <div class="btn-delete">待办</div>
                                    <div class="btn-delete">进行中</div>
                                  <div>
                                 `
                e.target.parentNode.innerHTML += leftChoose
                caniPan = false
            }
        }
    }
})

hammerBody.on('tap', (e) => {
    let target = e.target
    if(target.className.indexOf('btn-') > -1) {
        target.parentNode.outerHTML = ''
        caniPan = true
        //TODO
    }
})