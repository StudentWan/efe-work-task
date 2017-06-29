/**
 * 
 * @file 用来实现任务05-1的需求，包括：图片轮显，表格切换以及select模拟
 * @author benyuwan(benyuwan@gmail.com)
 */

const swipeController = document.getElementById('swipe-imgs-id');
const swipeButtons = document.getElementsByClassName('swipe-btn');

let swipeInterval = setInterval(
    () => {
        let beforeMove = parseInt(window.getComputedStyle(swipeController).left, 10);
        if (beforeMove === 0) {
            swipeController.style.transition = 'left .5s ease';
        }

        let afterMove = beforeMove - 960;
        swipeController.style.left = afterMove + 'px';
        if (afterMove === -2880) {
            setTimeout(
                () => {
                    swipeController.style.transition = 'none';
                    swipeController.style.left = '0';
                },
                500);
        }

        let chosenButton = swipeButtons[Math.abs(afterMove) / 960 % 3];
        let unchosenButton = swipeButtons[(Math.abs(afterMove) - 960) / 960 % 3];

        chosenButton.setAttribute('class', 'swipe-btn sel');
        unchosenButton.setAttribute('class', 'swipe-btn');
    },
    2000
);

const excelTab = document.getElementById('excel-tabs-id');
const excelMain = document.getElementById('excel-main-id');

excelTab.addEventListener('click', clickExcel)

/**
 * 
 * @param {点击表格Tab的事件对象} e 
 */
function clickExcel(e) {
    let sequence = e.target.dataset.seq;
    removeSelection(excelTab.children);
    removeSelection(excelMain.children);
    e.target.setAttribute('class', 'excel-tab sel');
    excelMain.children[sequence].setAttribute('class', 'excel-content sel');
}

/**
 * 
 * @param {*要移除选中的元素集合} elements 
 */
function removeSelection(elements) {
    for (let element of elements) {
        let selectPos = element.className.indexOf('sel') - 1;
        if (selectPos > -2) {
            element.setAttribute('class', element.className.substr(0, selectPos));
        }
    }
}

let citiesArray = [];
citiesArray['中国'] = ['北京', '上海', '广州'];
citiesArray['美国'] = ['洛杉矶', '纽约', '旧金山'];
citiesArray['英国'] = ['伦敦', '利物浦', '曼彻斯特'];
const blanket = document.getElementById('blanket-id');
const country = document.getElementById('sel-country-id');
const city = document.getElementById('sel-city-id');
const countrySelect = document.getElementById('country-opts-id');
const citySelect = document.getElementById('city-opts-id');
let index = '';

blanket.addEventListener('click', clickBlanket);

/**
 * 
 * @param {点击事件对象} e 
 */
function clickBlanket(e) {
    switch (e.target.className) {
        case 'sel-country':
            toggleDisplay(countrySelect, citySelect, e);
            break;
        case 'sel-city':
            toggleDisplay(citySelect, countrySelect, e);
            break;
        case 'country-opt':
            countrySelect.style.display = 'none';
            country.value = e.target.innerHTML;
            index = e.target.innerHTML;
            city.value = citiesArray[index][0];
            let cityOptions = '';
            for (let option of citiesArray[index]) {
                cityOptions += `<p class="city-opt">${option}</p>`;
            }
            citySelect.innerHTML = cityOptions;
            break;
        case 'city-opt':
            citySelect.style.display = 'none';
            city.value = e.target.innerHTML;
            break;
        default:
            break;
    }
}

/**
 * 
 * @param {事件，阻止冒泡} e 
 */
function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}

/**
 * 
 * @param {主要框} main 
 * @param {跟随框，在主要框显示之前消失} follow 
 * @param {事件，阻止冒泡} event 
 */
function toggleDisplay(main, follow, event) {
    stopPropagation(event);
    follow.style.display = 'none';
    if (window.getComputedStyle(main).display === 'none') {
        main.style.display = 'block';
    } else {
        main.style.display = 'none';
    }
}

// 模拟select行为，使得点击页面其他地方可以关闭选框
document.addEventListener('click', closeSelect);

/**
 * 
 * @param {点击页面其他地方以关闭选项的事件对象} e 
 */
function closeSelect(e) {
    countrySelect.style.display = 'none';
    citySelect.style.display = 'none';
}

// 卸载页面时移除事件处理程序并清除interval
document.addEventListener('unload', () => {
    excelTab.removeEventListener('click', clickExcel);
    blanket.removeEventListener('click', clickBlanket);
    document.removeEventListener('click', closeSelect);
    clearInterval(swipeInterval);
})

