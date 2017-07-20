export function render() {
    const header = $('.header')[0]
    header.lastElementChild.className = 'done'
    header.lastElementChild.innerHTML = 'Done'

    header.firstElementChild.style.visibility = 'visible'

    const footer = $('.footer')[0]

    footer.firstElementChild.className = 'one-thing'
    footer.lastElementChild.className = 'all'
    


    const main = $('#main')[0]
    main.innerHTML = `
                     <div class="select">
                        <div class="select-prior">
                            <p><i class="high fa fa-circle" aria-hidden="true"></i>高优
                            </p>
                            <p><i class="medium fa fa-circle" aria-hidden="true"></i>中优
                            </p>
                            <p><i class="low fa fa-circle" aria-hidden="true"></i>低优
                            </p>
                        </div>
                        <div class="select-status">
                            <p><i class="fa fa-play" aria-hidden="true"></i>进行中
                            </p>
                            <p><i class="fa fa-pause" aria-hidden="true"></i>待办
                            </p>
                            <p><i class="fa fa-stop" aria-hidden="true"></i>已完成
                            </p>
                        </div>
                     </div>
                     <div class="input-task">
                         <textarea id="task-info" cols="50" rows="10"></textarea>
                     </div>
                     `
}