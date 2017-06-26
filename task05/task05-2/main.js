const opts = document.getElementsByClassName('nav-opt');
const excelTabs = document.getElementsByClassName('exl-tab');
const excelContents = document.getElementsByClassName('exl-ct');

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
);

for(let i = 0; i < excelTabs.length; i++) {
    excelTabs[i].addEventListener('click', (e) => {
        removeSelection(excelTabs);
        removeSelection(excelContents);
        excelTabs[i].setAttribute('class', 'exl-tab sel');
        excelContents[i].setAttribute('class', 'exl-ct sel');
    })
}

function removeSelection(elements) {
    console.log(elements[0].className.indexOf('sel'));
    for(let element of elements) {
        let selectPos = element.className.indexOf('sel') - 1;
        if(selectPos > -2) {
            element.setAttribute('class',element.className.substr(0,selectPos));
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