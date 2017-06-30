let sidebar = document.getElementById('left-sidebar');
let table = document.getElementById('main-table');
let head = document.getElementById('head-table');

sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px';

let sideHeight = parseInt(window.getComputedStyle(sidebar).height, 10);

sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px是边框

document.addEventListener('scroll', scrollPage);

function scrollPage(e) {
    let scrollTop = parseInt(document.body.scrollTop, 10);
    let totalHeight = sideHeight + scrollTop;
    sidebar.style.height = totalHeight + 'px';

    let tableRect = table.getBoundingClientRect();

    if(tableRect.top <= 0) {
        head.style.display = 'table';
        head.style.width = tableRect.width + 'px';
        head.style.left = tableRect.left + 'px';
    } else {
        head.style.display = 'none';
    }
}

sidebar.addEventListener('scroll', scrollLeft);

function scrollLeft(e) {
    e.stopPropagation();
}