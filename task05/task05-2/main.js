const opts = document.getElementsByClassName('nav-opt');

for (let opt of opts) {
    opt.addEventListener('mouseover', (e) => {
        opt.style.background = 'url(https://raw.githubusercontent.com/StudentWan/efe-work-task/master/task02/static/img/arrow.png) 99% 50% no-repeat,#303030';
        opt.children[0].style.display = 'block';
    });
    opt.addEventListener('mouseout', (e) => {
        opt.style.background = 'url(https://raw.githubusercontent.com/StudentWan/efe-work-task/master/task02/static/img/arrow.png) 99% 50% no-repeat';
        opt.children[0].style.display = 'none';
    });
}

const imgList = document.getElementsByClassName('swp-img');
const swipeButtons = document.getElementsByClassName('swp-btn');

setInterval(
    () => {
        for (let i = 0, lens = imgList.length; i < lens; i++) {

            if (imgList[i].getAttribute('class').indexOf('sel') >= 0) {
                imgList[i].setAttribute('class', 'swp-img');
                swipeButtons[i].setAttribute('class', 'swp-btn');

                imgList[(i + 1) % 3].setAttribute('class', 'swp-img sel');
                swipeButtons[(i + 1) % 3].setAttribute('class', 'swp-btn sel');
                break;
            }
        }
    },
    2000
)