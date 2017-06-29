let sidebar = document.getElementById('left-sidebar');
let sideHeight = parseInt(window.getComputedStyle(sidebar).height, 10);
document.addEventListener(
    'mousewheel',
    function scrollPage(e) {
        let scrollTop = parseInt(document.body.scrollTop, 10);
        let totalHeight = sideHeight + scrollTop;
        sidebar.style.height = totalHeight + 'px';
    }
)

sidebar.addEventListener(
    'mousewheel',
    function scrollLeft(e) {
        e.stopPropagation();
    }
)