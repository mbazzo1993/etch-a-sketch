/**
 * GLOBAL VARIABLES
 */

const STARTING_DIM = 16;
let currentDIM = STARTING_DIM;
let elemCanvas = document.getElementById('canvas');

/**
 * ADD EVENT LISTENERS
 */

addEventListener('DOMContentLoaded', setUpCanvas);

/**
 * SUPPORTING FUNCTIONS
 */

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