const swipeController = document.getElementById('swp-imgs-id');
const swipeButtons = document.getElementsByClassName('swp-btn');

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