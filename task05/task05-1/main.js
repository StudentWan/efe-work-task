const swipeController = document.getElementById('swp-imgs-id');
const swipeButton = document.getElementsByClassName('swp-btn');

setInterval(
    () => {
        let leftStyle = parseInt(window.getComputedStyle(swipeController).left)
        if (leftStyle === -2880) {
            swipeController.style.transition = 'none';
            swipeController.style.left = '0px';
        } else if (leftStyle === 0) {
            swipeController.style.transition = 'left .5s ease';
            swipeController.style.left = (leftStyle - 960) + 'px';
            clearButton(swipeButton);
            swipeButton[1].setAttribute('class', 'swp-btn sel');
        } else {
            swipeController.style.left = (leftStyle - 960) + 'px';
            clearButton(swipeButton);
            if (leftStyle === -960) {
                swipeButton[2].setAttribute('class', 'swp-btn sel');
            } else {
                swipeButton[0].setAttribute('class', 'swp-btn sel');
            }
        }
    },
    2000
);

function clearButton(buttons) {
    for (let button of buttons) {
        button.setAttribute('class', 'swp-btn');
    }
}