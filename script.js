// const content = document.querySelector('.content');

// function grid(count) {
//     const grid = document.createElement('div');

//     grid.classList.add('grid');
    
//     for (let i = 0; i < count; i++) {
//         const newCell = document.createElement('div');
//         newCell.classList.add('grid-cell')
//         newCell.textContent = i + 1;
//         grid.appendChild(newCell);
//     };
    
//     return grid;
// };

// content.appendChild(grid(16 * 16));

const screenButtons = document.querySelectorAll('button.screen-adjust');
const screenSize = document.querySelector('#screen-size');

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
};

const screenArea = document.querySelector('.screen');
const leftKnob = document.querySelector('#left-knob');
const rightKnob = document.querySelector('#right-knob');

// const mouseMovementStep = 20;
// let lastX = 0;
// let lastY = 0;

// screenArea.addEventListener('mousemove', (event) => {
//     const currX = event.clientX - screenArea.getBoundingClientRect().left;
//     const currY = event.clientY - screenArea.getBoundingClientRect().top;

//     if (currX - lastX >= mouseMovementStep) {

//         const targetDiv = document.querySelector('#target-div');
//         const classesToRemove = Array.from(targetDiv.classList).filter(className => className.startsWith('knob-turn'));
        
//         classesToRemove.forEach(className => targetDiv.classList.remove(className));
        
//         leftKnob.classList.remove('old-class');
//         leftKnob.classList.add('new-class');
//         lastX = x;
//     };

//     if (currX - lastX <= 0 - mouseMovementStep) {
//         leftKnob.classList.remove('old-class');
//         leftKnob.classList.add('new-class');
//         lastX = x;
//     }
// });

function renderScreen(units) {
    let renderWidth = parseInt(screenSize.textContent);
    let renderHeight = parseInt(screenSize.textContent) * 3 / 4;

    for (let i = 0; i < renderHeight; i++) {
                const newCell = document.createElement('div');
                newCell.classList.add('grid-cell')
                newCell.textContent = i + 1;
                grid.appendChild(newCell);
            };

    const pixel = document.createElement('div');
}

const knobs = document.querySelectorAll('.knob');

knobs.forEach((div) => {
    div.addEventListener('click', () => {
        rotateKnob(div.id);
        });
    });

function rotateKnob(id, direction) {
    const knob = document.querySelector('#' + id);

    const sheetBorder = {
        top: window.getComputedStyle(knob).borderTopColor,
        right: window.getComputedStyle(knob).borderRightColor,
        bottom: window.getComputedStyle(knob).borderBottomColor,
        left: window.getComputedStyle(knob).borderLeftColor
    };

    const inlineBorder = {
        top: knob.style.borderTop,
        right: knob.style.borderRight,
        bottom: knob.style.borderBottom,
        left: knob.style.borderLeft
    };

    const inlineBordersAreBlank = Object.values(inlineBorder).every(value => value === '');

    let clockwise = (direction == undefined) ? true : false;

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

    knob.style.borderTop = '6px dashed rgba(0, 0, 0, ' + borderValues[0] + ')';
    knob.style.borderRight = '6px dashed rgba(0, 0, 0, ' + borderValues[1] + ')';
    knob.style.borderBottom = '6px dashed rgba(0, 0, 0, ' + borderValues[2] + ')';
    knob.style.borderLeft = '6px dashed rgba(0, 0, 0, ' + borderValues[3] + ')';
};