/**
 * GLOBAL VARIABLES
 */

const STARTING_DIM = 16;
let currentDIM = STARTING_DIM;
let elemCanvas = document.getElementById('canvas');
let elemInput = document.getElementById('input');
let elemColorSettingBlack = document.getElementById('black');
let elemColorSettingRandom = document.getElementById('random');
let elemColorSettingDarkening = document.getElementById('darkening');
let elemResTxt = document.getElementById('res-txt');

/**
 * ADD EVENT LISTENERS
 */

addEventListener('DOMContentLoaded', setUpCanvas);

elemCanvas.addEventListener('mouseover', (event) => {
    if(event.target.id !== 'canvas') {
        if (elemColorSettingBlack.checked) event.target.style.backgroundColor = 'black';
        if (elemColorSettingRandom.checked) {
            event.target.style.backgroundColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
        }
    }
});

elemInput.addEventListener('input', (event) => {
    if(event.target.id === 'grid-size') {
        currentDIM = event.target.value;
        elemResTxt.textContent = `Current Resolution = ${currentDIM} x ${currentDIM}`
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