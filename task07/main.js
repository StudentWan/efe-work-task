/**
 * @file 用来实现任务06的需求，包括：左边栏滚动、长度实时变化、悬浮表头等
 * @author benyuwan(benyuwan@gmail.com)
 */

const table = document.getElementById('main-table');
const head = document.getElementById('head-table');

const tableLine = table.children[0].children;
// 根据数据文件table.js设置表格内容
for (let i = 0, lens = tableLine.length; i < lens - 1; i++) {
    let item = tableLine[i + 1].children;
    item[0].innerHTML = content[i].name;
    item[1].innerHTML = content[i].content;
    item[2].innerHTML = content[i].value;
}
// 设置内容后再适配宽度
fitWidth(table, head);

const sidebar = document.getElementById('left-sidebar');
// 设置左侧栏最大高度
sidebar.style.height = 'auto'; // Before you ask for the height of the document inside the element you should set the height of the element to "auto".
sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px边框

document.addEventListener('scroll', scrollPage);
/**
 * 
 * @param {document的scroll事件对象} e 
 */
function scrollPage(e) {
    // 实时设置左侧栏高度
    sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px';

    // 悬浮表头实现
    let tableRect = table.getBoundingClientRect();
    if (tableRect.top <= 0) {
        head.style.display = 'table';
        head.style.width = tableRect.width + 'px';
        head.style.left = tableRect.left + 'px';
    } else {
        head.style.display = 'none';
    }
}

window.addEventListener('resize', resizeWindow);
/**
 * 
 * @param {window的resize事件对象} e 
 */
function resizeWindow(e) {
    // 实时设置左侧栏高度
    sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px';
}

sidebar.addEventListener('click', toggleLevel2);
/**
 * 
 * @param {侧边栏的click事件对象} e 
 */
function toggleLevel2(e) {
    let level1Elements = e.currentTarget.getElementsByClassName('sidebar-item');
    // 设置是否显示子菜单
    if (e.target.className === 'sidebar-item') {
        if (!e.target.nextElementSibling || e.target.nextElementSibling.className === 'sidebar-item') {
            for (let i = 0, lens = level1Elements.length; i < lens; i++) {
                if (e.target === level1Elements[i]) {
                    let level2String = '';
                    for (let data of level2Data[i]) {
                        level2String += '<p class="sub-item">' + data + '</p>'
                    }
                    e.target.outerHTML += level2String;
                }
            }
        } else {
            let nextElement = e.target.nextElementSibling;
            do {
                if (!nextElement.nextElementSibling) {
                    nextElement.outerHTML = '';
                    break;
                }
                let temp = nextElement.nextElementSibling;
                nextElement.outerHTML = '';
                nextElement = temp;
            } while (nextElement.className !== 'sidebar-item')
        }
    }

    sidebar.style.height = 'auto'; // Before you ask for the height of the document inside the element you should set the height of the element to "auto".
    sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px边框
    sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px'; // 这里其实不设置也可以，设置回去我安心一点...
}

/**
 * 
 * 
 * @param {主表的引用} table 
 * @param {悬浮表头表的引用} head 
 */
function fitWidth(table, head) {
    head.querySelector('#head-1').style.width = window.getComputedStyle(table.querySelector('#main-1')).width;
    head.querySelector('#head-2').style.width = window.getComputedStyle(table.querySelector('#main-2')).width;
    head.querySelector('#head-3').style.width = window.getComputedStyle(table.querySelector('#main-3')).width;
    head.querySelector('#head-4').style.width = window.getComputedStyle(table.querySelector('#main-4')).width;
}