const screenButtons = document.querySelectorAll('button.screen-adjust');
const screenSize = document.querySelector('#screen-size');
const screenArea = document.querySelector('.screen');

screenButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeScreenSize(button);
        });
    });

function changeScreenSize (button) {
    const upperLimit = 100;
    const lowerLimit = 16;
    const screenSizeStep = 4;

    const increaseBtn = document.querySelector('#screen-increase');
    const decreaseBtn = document.querySelector('#screen-decrease');

    let currentSize = parseInt(screenSize.textContent);
    
    if (button.id == 'screen-increase') {
        if (currentSize == upperLimit) return;
        
        let newSize = screenSize.textContent = currentSize + screenSizeStep;

        if (newSize == upperLimit) {
            button.classList.remove('screen-btn-enabled');
            button.classList.add('screen-btn-disabled');
        };

        if (newSize > lowerLimit) {
            decreaseBtn.classList.remove('screen-btn-disabled');
            decreaseBtn.classList.add('screen-btn-enabled');
        };
    };

    if (button.id == 'screen-decrease') {
        if (currentSize == lowerLimit) return;
        
        let newSize = screenSize.textContent = currentSize - screenSizeStep;

        if (newSize == lowerLimit) {
            button.classList.remove('screen-btn-enabled');
            button.classList.add('screen-btn-disabled');
        };

        if (newSize < upperLimit) {
            increaseBtn.classList.remove('screen-btn-disabled');
            increaseBtn.classList.add('screen-btn-enabled');
        };
    };

    renderScreen();
};

function rotateKnob(id, rotateClockwise) {
    const knob = document.querySelector(id);

    const sheetBorder = {
        top: window.getComputedStyle(knob).borderTop,
        right: window.getComputedStyle(knob).borderRight,
        bottom: window.getComputedStyle(knob).borderBottom,
        left: window.getComputedStyle(knob).borderLeft
    };

    const inlineBorder = {
        top: knob.style.borderTop,
        right: knob.style.borderRight,
        bottom: knob.style.borderBottom,
        left: knob.style.borderLeft
    };

    const inlineBordersAreBlank = Object.values(inlineBorder).every(value => value === '');

    let clockwise = (rotateClockwise == undefined || rotateClockwise == true) ? true : false;

    let borderValues, top, right, bottom, left;

    if (inlineBordersAreBlank) {
        top = sheetBorder.top;
        right = sheetBorder.right;
        bottom = sheetBorder.bottom;
        left = sheetBorder.left;
    } else {
        top = inlineBorder.top;
        right = inlineBorder.right;
        bottom = inlineBorder.bottom;
        left = inlineBorder.left;
    };

    borderValues = [
        top.match(/rgba\(\d+, \d+, \d+, ([^)]+)\)/)[1],
        right.match(/rgba\(\d+, \d+, \d+, ([^)]+)\)/)[1],
        bottom.match(/rgba\(\d+, \d+, \d+, ([^)]+)\)/)[1],
        left.match(/rgba\(\d+, \d+, \d+, ([^)]+)\)/)[1]
    ].map(parseFloat);

    if (clockwise) {
        borderValues.unshift(borderValues.pop());
    } else {
        borderValues.push(borderValues.shift());
    };

    knob.style.borderTop = sheetBorder.top.replace(/rgba\((\d+), (\d+), (\d+), ([^)]+)\)/, `rgba($1, $2, $3, ${borderValues[0]})`);
    knob.style.borderRight = sheetBorder.top.replace(/rgba\((\d+), (\d+), (\d+), ([^)]+)\)/, `rgba($1, $2, $3, ${borderValues[1]})`);
    knob.style.borderBottom = sheetBorder.top.replace(/rgba\((\d+), (\d+), (\d+), ([^)]+)\)/, `rgba($1, $2, $3, ${borderValues[2]})`);
    knob.style.borderLeft = sheetBorder.top.replace(/rgba\((\d+), (\d+), (\d+), ([^)]+)\)/, `rgba($1, $2, $3, ${borderValues[3]})`);
};

let lastCoordinates = [0,0];
let currCoordinates = [0,0];

function setCoordinates(pixel) {
    const selectedPixel = document.getElementById(pixel.id);
    return selectedPixel.id.split(',').map(Number);
};

function animateKnobs() {
    const lastX = lastCoordinates[0];
    const lastY = lastCoordinates[1];

    const currX = currCoordinates[0];
    const currY = currCoordinates[1];

    if (currX > lastX) rotateKnob('#left-knob', true);
    if (currX < lastX) rotateKnob('#left-knob', false);

    if (currY > lastY) rotateKnob('#right-knob', true);
    if (currY < lastY) rotateKnob('#right-knob', false);
}

function renderScreen() {
    let renderWidth = parseInt(screenSize.textContent);
    let renderHeight = parseInt(screenSize.textContent) * 3 / 4;

    while (screenArea.firstChild) screenArea.removeChild(screenArea.firstChild);

    for (let x = 0; x < renderWidth; x++) {

        for (let y = 0; y < renderHeight; y++) {
            const pixel = document.createElement('div');
            
            pixel.classList.add('pixel');
            pixel.id = x + ',' + y;

            pixel.style.width = (1 / renderWidth * 100) + '%';
            pixel.style.height = (1 / renderHeight * 100) + '%';

            pixel.addEventListener('mouseout', () => {
                lastCoordinates = setCoordinates(pixel);
            });

            pixel.addEventListener('mouseover', () => {
                currCoordinates = setCoordinates(pixel);
                animateKnobs();
            });

            screenArea.appendChild(pixel);
        };
    };
}

renderScreen();