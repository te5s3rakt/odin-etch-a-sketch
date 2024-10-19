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

screenButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeScreenSize(button);
        });
    });

function changeScreenSize (button) {
    const upperLimit = 100;
    const lowerLimit = 16;
    const screenSizeStep = 4;

    const screenSize = document.querySelector('#screen-size');
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

