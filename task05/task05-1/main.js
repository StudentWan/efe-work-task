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
let index = '无';

countrySelect.addEventListener('click', (e) => {
    stopPropagation(e);
    cities.style.display = 'none';
    if (window.getComputedStyle(countries).display === 'none') {
        countries.style.display = 'block';
    } else {
        countries.style.display = 'none';
    }
});

countries.addEventListener('click', (e) => {
    countries.style.display = 'none';
    countrySelect.value = e.target.innerHTML;
    index = e.target.innerHTML;
    citySelect.value = citiesArray[index][0];

    let cityContent = '';
    for (let city of citiesArray[index]) {
        cityContent += '<p class="sel-city">' + city + '</p>';
    }
    cities.innerHTML = cityContent;
});

citySelect.addEventListener('click', (e) => {
    stopPropagation(e);
    countries.style.display = 'none;'
    if (window.getComputedStyle(cities).display === 'none') {
        cities.style.display = 'block';
    } else {
        cities.style.display = 'none';
    }
});

cities.addEventListener('click', (e) => {
    cities.style.display = 'none';
    citySelect.value = e.target.innerHTML;
});

document.addEventListener('click', (e) => {
    countries.style.display = 'none';
    cities.style.display = 'none';
})

function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}