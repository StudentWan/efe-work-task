import * as storage from '../model/storage'

export function render(...chosenArr) {
    let priorArr = chosenArr[0]
    let statusArr = chosenArr[1]
    if ((!priorArr || priorArr.length === 0) && (!statusArr || statusArr.length === 0)) {
        const header = $('.header')[0]
        header.lastElementChild.className = 'add'
        header.lastElementChild.innerHTML = 'Add'

        header.firstElementChild.style.visibility = 'hidden'

        $('.header')[0].firstElementChild.style.visibility = 'hidden'

        const main = $('#main')[0]
        main.innerHTML = `
                     <div class="choose">
                        <div class="choose-prior">
                            <p class="option-prior" data-option="0"><i class="high fa fa-circle" aria-hidden="true"></i>高优
                            </p>
                            <p class="option-prior" data-option="1"><i class="medium fa fa-circle" aria-hidden="true"></i>中优
                            </p>
                            <p class="option-prior" data-option="2"><i class="low fa fa-circle" aria-hidden="true"></i>低优
                            </p>
                        </div>
                        <div class="choose-status">
                            <p class="option-status" data-option="0"><i class="fa fa-play" aria-hidden="true"></i>进行中
                            </p>
                            <p class="option-status" data-option="1"><i class="fa fa-pause" aria-hidden="true"></i>待办
                            </p>
                            <p class="option-status" data-option="2"><i class="fa fa-stop" aria-hidden="true"></i>已完成
                            </p>
                        </div>
                    </div>
                    <div class="list"></div>
                     `


        let todoData = storage.getData()
        const list = $('.list')[0]

        for (let i = 0, lens = todoData.length; i < lens; i++) {
            let prior
            switch (todoData[i].prior) {
                case '0':
                    prior = 'high'
                    break
                case '1':
                    prior = 'medium'
                    break
                case '2':
                    prior = 'low'
                    break
                default:
                    break
            }

            let status
            switch (todoData[i].status) {
                case '0':
                    status = 'fa-play'
                    break
                case '1':
                    status = 'fa-pause'
                    break
                case '2':
                    status = 'fa-stop'
                    break
                default:
                    break
            }
            list.innerHTML += `
                          <div class="item" data-index="${i}">
                            <div class="prior">
                                <i class="fa ${status} ${prior}" aria-hidden="true"></i>
                            </div>
                            <p class="text">${todoData[i].content}</p>
                          </div>
                          `
        }
    } else {

        let todoData = storage.getData()
        const list = $('.list')[0]

        list.innerHTML = ''

        for (let i = 0, lens = todoData.length; i < lens; i++) {
            let isRender = false
            for (let opt of priorArr) {
                if (todoData[i].prior === opt) {
                    isRender = true
                    break
                }
            }
            if (!isRender) {
                for (let opt of statusArr) {
                    if (todoData[i].status === opt) {
                        isRender = true
                        break
                    }
                }
            }
            if (isRender) {
                let prior
                switch (todoData[i].prior) {
                    case '0':
                        prior = 'high'
                        break
                    case '1':
                        prior = 'medium'
                        break
                    case '2':
                        prior = 'low'
                        break
                    default:
                        break
                }

                let status
                switch (todoData[i].status) {
                    case '0':
                        status = 'fa-play'
                        break
                    case '1':
                        status = 'fa-pause'
                        break
                    case '2':
                        status = 'fa-stop'
                        break
                    default:
                        break
                }
                list.innerHTML += `
                          <div class="item" data-index="${i}">
                            <div class="prior">
                                <i class="fa ${status} ${prior}" aria-hidden="true"></i>
                            </div>
                            <p class="text">${todoData[i].content}</p>
                          </div>
                          `
            }
        }
    }
}