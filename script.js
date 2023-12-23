/**
 * GLOBAL VARIABLES
 */

const STARTING_DIM = 16;
let currentDIM = STARTING_DIM;
let elemCanvas = document.getElementById('canvas');
let elemInput = document.getElementById('input');

/**
 * ADD EVENT LISTENERS
 */

addEventListener('DOMContentLoaded', setUpCanvas);

elemCanvas.addEventListener('mouseover', (event) => {
    if(event.target.id !== 'canvas') {
        event.target.classList.add('pixel-colored');
    }
});

elemInput.addEventListener('input', (event) => {
    if(event.target.id === 'grid-size') {
        currentDIM = event.target.value;
        clearCanvas();
        setUpCanvas();
    }
});

/**
 * SUPPORTING FUNCTIONS
 */

function clearCanvas() {
    while (elemCanvas.lastElementChild) {
        elemCanvas.removeChild(elemCanvas.lastElementChild);
    }
}

function setUpCanvas() {

    for (let i = 0; i < currentDIM; i++) {
        let newCol = document.createElement('div');
        newCol.width = `${elemCanvas.width / currentDIM}%`;
        newCol.heigth = `100%`;
        newCol.classList.add("canvas-col");
        elemCanvas.appendChild(newCol);

        for (let j = 0; j < currentDIM; j++) {
            let newPixel = document.createElement('div');
            newPixel.width = `100%`;
            newPixel.heigth = `100%`;
            newPixel.classList.add("pixel");
            newCol.appendChild(newPixel);
        }
    }
}