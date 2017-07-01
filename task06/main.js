/**
 * @file 用来实现任务06的需求，包括：左边栏滚动、长度实时变化、悬浮表头等
 * @author benyuwan(benyuwan@gmail.com)
 */
const sidebar = document.getElementById('left-sidebar');

// 设置最大高度/初始高度，并记录初始高度
const sideHeight = (window.innerHeight - sidebar.getBoundingClientRect().top);
sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px边框
sidebar.style.height = sideHeight + 'px';

document.addEventListener('scroll', scrollPage);

/**
 * 
 * @param {document的scroll事件对象} e 
 */
function scrollPage(e) {
    // 实时更改左侧栏高度
    let scrollTop = parseInt(this.body.scrollTop, 10);
    let totalHeight = sideHeight + scrollTop;
    sidebar.style.height = totalHeight + 'px';

    // 悬浮表头实现
    const table = document.getElementById('main-table');
    const head = document.getElementById('head-table');
    let tableRect = table.getBoundingClientRect();
    if(tableRect.top <= 0) {
        head.style.display = 'table';
        head.style.width = tableRect.width + 'px';
        head.style.left = tableRect.left + 'px';
    } else {
        head.style.display = 'none';
    }
}

sidebar.addEventListener('scroll', scrollSide);

/**
 * 
 * @param {sidebar的scroll事件对象} e 
 */
function scrollSide(e) {
    // 防止冒泡被document侦听
    e.stopPropagation();
}