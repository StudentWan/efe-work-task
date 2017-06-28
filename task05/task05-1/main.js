const swipeController = document.getElementById('swp-imgs-id');
const swipeButtons = document.getElementsByClassName('swp-btn');
const excelTabs = document.getElementsByClassName('exl-tab');
const excelContents = document.getElementsByClassName('exl-ct');

setInterval(
    () => {
        let beforeMove = parseInt(window.getComputedStyle(swipeController).left);
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

        chosenButton.setAttribute('class', 'swp-btn sel');
        unchosenButton.setAttribute('class', 'swp-btn');
    },
    2000
);

for (let i = 0; i < excelTabs.length; i++) {
    excelTabs[i].addEventListener('click', (e) => {
        removeSelection(excelTabs);
        removeSelection(excelContents);
        excelTabs[i].setAttribute('class', 'exl-tab sel');
        excelContents[i].setAttribute('class', 'exl-ct sel');
    })
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

const countrySelect = document.getElementById('bkt-country');
const citySelect = document.getElementById('bkt-city');
const countries = document.getElementById('sel-ctries-id');
const cities = document.getElementById('sel-cties-id');
let index = '';

countrySelect.addEventListener('click', (e) => {
    toggleDisplay(countries, cities, e);
});

countries.addEventListener('click', (e) => {
    countries.style.display = 'none';
    countrySelect.value = e.target.innerHTML;
    index = e.target.innerHTML;
    citySelect.value = citiesArray[index][0];

    let cityContent = '';
    for (let city of citiesArray[index]) {
        cityContent += `<p class="sel-city">${city}</p>`;
    }
    cities.innerHTML = cityContent;
});

citySelect.addEventListener('click', (e) => {
    toggleDisplay(cities, countries, e);
});

cities.addEventListener('click', (e) => {
    cities.style.display = 'none';
    citySelect.value = e.target.innerHTML;
});

// 模拟select行为，使得点击页面其他地方可以关闭选框
document.addEventListener('click', (e) => {
    countries.style.display = 'none';
    cities.style.display = 'none';
})


/**
 * 
 * @param {事件目标，阻止冒泡} e 
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
 * @param {事件目标，阻止冒泡} event 
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
