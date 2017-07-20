export function render() {
    const header = $('.header')[0]
    header.lastElementChild.className = 'add'
    header.lastElementChild.innerHTML = 'Add'

    header.firstElementChild.style.visibility = 'hidden'

    const main = $('#main')[0]
    main.innerHTML = `
                     <p class="slogan">Now!The One Thing is</p>
                     <div class="item">
                        <div class="prior"> 
                            <i class="fa fa-play high" aria-hidden="true"></i>
                        </div>
                        <p class="text">Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task</p>
                     </div>
                     `
}