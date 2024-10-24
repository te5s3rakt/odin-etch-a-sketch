const screenButtons = document.querySelectorAll('button.screen-adjust');

const screenSize = document.querySelector('#screen-size');

const screenArea = document.querySelector('.screen');

const pixelBehavior = document.querySelector('.pixel-behavior');

function setCoordinates(pixel) {
    const selectedPixel = document.getElementById(pixel.id);
    return selectedPixel.id.split(',').map(Number);
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

let lastCoordinates, currCoordinates;

function animateKnobs() {
    if (lastCoordinates == undefined) return;

    const lastX = lastCoordinates[0];
    const lastY = lastCoordinates[1];

    const currX = currCoordinates[0];
    const currY = currCoordinates[1];

    if (currX > lastX) rotateKnob('#left-knob', true);
    if (currX < lastX) rotateKnob('#left-knob', false);

    if (currY > lastY) rotateKnob('#right-knob', true);
    if (currY < lastY) rotateKnob('#right-knob', false);
};

function generateRandomColor() {
    function randomValue() {return Math.floor(Math.random() * 256)};
    
    return 'rgb(' + randomValue() + ',' + randomValue() + ',' + randomValue() + ')';
};

function generateRainbowString(string) {
    const chars = string.split('');
    const fragment = document.createDocumentFragment();
    
    chars.forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.color = generateRandomColor();
        fragment.appendChild(letterSpan);
    });
    
    return fragment.childNodes;
};

function changePixelBehavior() {
    const current = pixelBehavior.id;

    while (pixelBehavior.firstChild) pixelBehavior.removeChild(pixelBehavior.firstChild);

    if (current == 'classic') {
        const fancyLetters = Array.from(generateRainbowString('WACKY'));
        pixelBehavior.id = 'wacky';
        fancyLetters.forEach(node => {pixelBehavior.appendChild(node)});
    };

    if (current == 'wacky') {
        pixelBehavior.id = 'classic';
        pixelBehavior.textContent = 'CLASSIC';
    };
};

function changePixelColor(pixel) {
    const magneticDustColor = 'rgb(43, 43, 43)';

    const pixelIsClassic = pixelBehavior.id == 'classic' ? true : false;

    const maxX = parseInt(screenSize.textContent) - 1;
    const maxY = (parseInt(screenSize.textContent) * 3 / 4) - 1;

    const currX = currCoordinates[0];
    const currY = currCoordinates[1];

    const pixelIsTopLeft = currX == 0 && currY == 0;
    const pixelIsTopRight = currX == maxX && currY == 0;
    const pixelIsBottomRight = currX == maxX && currY == maxY;
    const pixelIsBottomLeft = currX == 0 && currY == maxY;
    const pixelIsTop = currY == 0 && currX !== 0 && currX !== maxX;
    const pixelIsRight = currX == maxX && currY !== 0 && currY !== maxY;
    const pixelIsBottom = currY == maxY && currX !== 0 && currX !== maxX;
    const pixelIsLeft = currX == 0 && currY !== 0 && currY !== maxY;

    const boxShadow = {
        top: '0 5px 5px -5px black inset',
        right: '-5px 0 5px -5px black inset',
        bottom: '0 -5px 5px -5px black inset',
        left: '5px 0 5px -5px black inset'
    };

    if (pixelIsTopLeft) pixel.style.boxShadow = boxShadow.top + ', ' + boxShadow.left;
    if (pixelIsTopRight) pixel.style.boxShadow = boxShadow.top + ', ' + boxShadow.right;
    if (pixelIsBottomRight) pixel.style.boxShadow = boxShadow.bottom + ', ' + boxShadow.right;
    if (pixelIsBottomLeft) pixel.style.boxShadow = boxShadow.bottom + ', ' + boxShadow.left;

    if (pixelIsTop) pixel.style.boxShadow = boxShadow.top;
    if (pixelIsRight) pixel.style.boxShadow = boxShadow.right;
    if (pixelIsBottom) pixel.style.boxShadow = boxShadow.bottom;
    if (pixelIsLeft) pixel.style.boxShadow = boxShadow.left;

    if (pixelIsClassic) {
        pixel.style.background = magneticDustColor;
    } else {
        pixel.style.background = generateRandomColor();
    }
};

function renderScreen() {
    let renderWidth = parseInt(screenSize.textContent);
    let renderHeight = parseInt(screenSize.textContent) * 3 / 4;

    const pixelMargin = parseFloat(window.getComputedStyle(document.querySelector('.pixel')).margin);

    while (screenArea.firstChild) screenArea.removeChild(screenArea.firstChild);

    for (let y = 0; y < renderHeight; y++) {

        for (let x = 0; x < renderWidth; x++) {
            const pixel = document.createElement('div');
            
            pixel.classList.add('pixel');
            pixel.id = x + ',' + y;

            pixel.style.width = 'calc(' + (1 / renderWidth * 100) + '% - ' + pixelMargin * 2 + 'px)';
            pixel.style.height = 'calc(' + (1 / renderHeight * 100) + '% - ' + pixelMargin * 2 + 'px)';
            
            // this is to make the toy feel like an old p.o.s you found in the garage lol
                if (Math.random() <= 0.05) {
                    pixel.style.backgroundColor = 'rgba(43, 43, 43, ' + Math.random() / 10 +')';
                };
            //

            pixel.addEventListener('mouseout', () => {
                lastCoordinates = setCoordinates(pixel);
            });

            pixel.addEventListener('mouseover', () => {
                currCoordinates = setCoordinates(pixel);
                animateKnobs();
            });

            pixel.addEventListener('mouseover', () => { changePixelColor(pixel) }, { once: true });

            screenArea.appendChild(pixel);
        };
    };
};

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

screenButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeScreenSize(button);
        });
    });

pixelBehavior.addEventListener('click', () => {
    changePixelBehavior();
    renderScreen();
});

renderScreen();