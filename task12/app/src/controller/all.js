export function render() {
    const header = $('.header')[0]
    header.lastElementChild.className = 'add'
    header.lastElementChild.innerHTML = 'Add'

    header.firstElementChild.style.visibility = 'hidden'

    $('.header')[0].firstElementChild.style.visibility = 'hidden'

    const main = $('#main')[0]
    main.innerHTML = `
                     <div class="choose">
                        <div class="choose-prior">
                            <p><i class="high fa fa-circle" aria-hidden="true"></i>高优
                            </p>
                            <p><i class="medium fa fa-circle" aria-hidden="true"></i>中优
                            </p>
                            <p><i class="low fa fa-circle" aria-hidden="true"></i>低优
                            </p>
                        </div>
                        <div class="choose-status">
                            <p><i class="fa fa-play" aria-hidden="true"></i>进行中
                            </p>
                            <p><i class="fa fa-pause" aria-hidden="true"></i>待办
                            </p>
                            <p><i class="fa fa-stop" aria-hidden="true"></i>已完成
                            </p>
                        </div>
                    </div>
                    <div class="list">
                        <div class="item">
                            <div class="prior">
                                <i class="fa fa-play high" aria-hidden="true"></i>
                            </div>
                            <p class="text">Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task</p>
                        </div>
                    </div>
                     `
}