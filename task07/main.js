/**
 * @file 用来实现任务07的需求，包括：左边栏二级项目展示、浮出层、表格项目控制等
 * @author benyuwan(benyuwan@gmail.com)
 */

const table = document.getElementById('main-table');
const head = document.getElementById('head-table');

let tableContent = table.children[0].innerHTML;
// 根据数据文件table.js动态生成表格
for (let i = 0, lens = Object.keys(content).length; i < lens; i++) {
    let eachLine = '<tr><td>' + content[i].name +
        '</td><td>' + content[i].content +
        '</td><td>' + content[i].value +
        '</td><td><button class="edit">Edit</button> ' +
        '<button class="delete">Delete</button></td></tr>';
    tableContent += eachLine;
}
table.children[0].innerHTML = tableContent;
fitWidth(table, head); // 动态生成后再适配宽度

const sidebar = document.getElementById('left-sidebar');
sidebar.style.height = 'auto'; // Before you ask for the height of the document          
                               // inside the element you should set the height
                               // of the element to "auto".
sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px边框

document.addEventListener('scroll', scrollPage);

window.addEventListener('resize', resizeWindow);

sidebar.addEventListener('click', toggleLevel2);

const editDialog = document.getElementById('edit-dialog');
const deleteDialog = document.getElementById('delete-dialog');
const layer = document.getElementById('layer');
const editName = document.getElementById('edit-name');
const editContent = document.getElementById('edit-content');
const editValue = document.getElementById('edit-value');
let editRow;
let deleteRow;
document.addEventListener('click', controllTable);

/**
 * @function 右侧滑动时的事件处理程序
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

/**
 * @function 用于控制窗口大小改变时的事件处理程序，主要用来重新设置左侧栏高度及更新悬浮表头的位置
 * @param {window的resize事件对象} e 
 */
function resizeWindow(e) {
    // 实时设置左侧栏高度
    sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px';

    // 更新悬浮表头的位置
    let tableRect = table.getBoundingClientRect();
    head.style.left = tableRect.left + 'px';
}

/**
 * @function 用于控制切换二级表单显示的事件处理程序
 * @param {侧边栏的click事件对象} e 
 */
function toggleLevel2(e) {
    e.stopPropagation();
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

    sidebar.style.height = 'auto'; // Before you ask for the height of the document          
                                   // inside the element you should set the height
                                   // of the element to "auto".
    sidebar.style.maxHeight = (sidebar.scrollHeight + 2) + 'px'; // 2px边框
    sidebar.style.height = (window.innerHeight - sidebar.getBoundingClientRect().top) + 'px'; // 这里其实不设置也可以，设置回去我安心一点...
}

/**
 * @function 用于控制点击编辑和删除按钮，及操作浮层的事件处理程序
 * @param {document的click事件对象} e 
 */
function controllTable(e) {
    switch (e.target.className) {
        case 'edit':
            editRow = e.target.parentNode.parentNode;
            editName.value = editRow.children[0].innerHTML;
            editContent.value = editRow.children[1].innerHTML;
            editValue.value = editRow.children[2].innerHTML;
            toggleDialog(editDialog);
            break;
        case 'delete':
            deleteRow = e.target.parentNode.parentNode;
            toggleDialog(deleteDialog);
            break;
        case 'confirm-edit':
            e.preventDefault();
            editRow.children[0].innerHTML = editName.value;
            editRow.children[1].innerHTML = editContent.value;
            editRow.children[2].innerHTML = editValue.value;
            fitWidth(table, head);
            toggleDialog(editDialog);
            break;
        case 'confirm-delete':
            deleteRow.outerHTML = '';
            toggleDialog(deleteDialog);
            fitWidth(table, head);
            break;
        case 'cancel':
            e.preventDefault();
            closeDialog();
            break;
        case 'layer':
            closeDialog();
            break;
        default:
            break;
    }
}

/**
 * 
 * @function 用于适配悬浮表头的宽度
 * @param {主表的引用} table 
 * @param {悬浮表头表的引用} head 
 */
function fitWidth(table, head) {
    head.querySelector('#head-1').style.width = window.getComputedStyle(table.querySelector('#main-1')).width;
    head.querySelector('#head-2').style.width = window.getComputedStyle(table.querySelector('#main-2')).width;
    head.querySelector('#head-3').style.width = window.getComputedStyle(table.querySelector('#main-3')).width;
    head.querySelector('#head-4').style.width = window.getComputedStyle(table.querySelector('#main-4')).width;
}

/**
 * @function 用于切换浮层的显示状态
 * @param {需要切换显示的浮层} dialog 
 */
function toggleDialog(dialog) {
    if (window.getComputedStyle(dialog).display === 'none') {
        dialog.style.display = 'block';
        layer.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        dialog.style.display = 'none';
        layer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * @function 关闭所有浮层显示
 */
function closeDialog() {
    editDialog.style.display = 'none';
    deleteDialog.style.display = 'none';
    layer.style.display = 'none';
    document.body.style.overflow = 'auto';
}