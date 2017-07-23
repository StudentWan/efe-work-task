import * as storage from '../model/storage'

export function render() {
    const header = $('.header')[0]
    header.lastElementChild.className = 'add'
    header.lastElementChild.innerHTML = 'Add'
    header.firstElementChild.style.visibility = 'hidden'

    const main = $('#main')[0]
    main.innerHTML = `
                     <p class="slogan">Now!The One Thing is</p>
                     `
    let todoData = storage.getData()
    for(let data of todoData) {
        if(data.prior === '0' && data.status === '0') {
            main.innerHTML += `
                              <div class="item onething">
                                <div class="prior">
                                    <i class="fa fa-play high" aria-hidden="true"></i>
                                </div>
                                <p class="text">${data.content}</p>
                              </div>
                              `
            break
        }
    }
}