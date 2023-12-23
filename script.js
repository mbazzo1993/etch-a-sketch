/**
 * GLOBAL VARIABLES
 */

const STARTING_DIM = 16;
const DARKENING_DECREMENT = 26
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
        if (elemColorSettingBlack.checked) event.target.style.backgroundColor = 'rgb(0,0,0)';
        
        if (elemColorSettingRandom.checked) {
            event.target.style.backgroundColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
        }

        if (elemColorSettingDarkening.checked) {
            
            if(event.target.style.backgroundColor) { // in case color is undefined
                let rVal, gVal, bVal;
                [rVal, gVal, bVal] = event.target.style.backgroundColor.split("(")[1].split(")")[0].split(", ");
    
                if (parseInt(rVal) + parseInt(gVal) + parseInt(bVal) !== 0) { // if not black
                    let rValNew = Math.max(0,parseInt(rVal)-DARKENING_DECREMENT);
                    let gValNew = Math.max(0,parseInt(gVal)-DARKENING_DECREMENT);
                    let bValNew = Math.max(0,parseInt(bVal)-DARKENING_DECREMENT);
                    event.target.style.backgroundColor = `rgb(${rValNew},${gValNew},${bValNew})`;
                }
            } else {
                event.target.style.backgroundColor = `rgb(${255 - DARKENING_DECREMENT},${255 - DARKENING_DECREMENT},${255 - DARKENING_DECREMENT})`;
            }
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