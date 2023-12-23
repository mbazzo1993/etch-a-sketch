/**
 * GLOBAL VARIABLES
 */

const STARTING_DIM = 16;
const DARKENING_DECREMENT = 26
let currentDim = STARTING_DIM;
const elemCanvas = document.getElementById('canvas');
const elemInput = document.getElementById('input');
const elemColorSettingBlack = document.getElementById('black');
const elemColorSettingRandom = document.getElementById('random');
const elemColorSettingDarkening = document.getElementById('darkening');
const elemColorSettingChoose = document.getElementById('pick-color');
const elemColorSettingInput = document.getElementById('color-setting-input');
const elemRSlider = document.getElementById('r-slide');
const elemGSlider = document.getElementById('g-slide');
const elemBSlider = document.getElementById('b-slide');
const elemColorSliders = document.getElementById('rgb-sliders');
const elemResTxt = document.getElementById('res-txt');
const elemClearBtn = document.getElementById('clear');

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

        if (elemColorSettingChoose.checked) {
            event.target.style.backgroundColor = `rgb(${elemRSlider.value},${elemGSlider.value},${elemBSlider.value})`;
        }


    }
});

elemInput.addEventListener('input', (event) => {
    if(event.target.id === 'grid-size') {
        currentDim = event.target.value;
        elemResTxt.textContent = `Current Resolution = ${currentDim} x ${currentDim}`
        clearCanvas();
        setUpCanvas();
    }
});

elemClearBtn.addEventListener('click', () => {
    clearCanvas();
    setUpCanvas();
});

elemColorSettingInput.addEventListener('click', (event) => {
    if (event.target.value === 'pick-color') {
        elemColorSliders.style.display = 'flex';
    } else if (event.target.name === 'color-setting') { // only hide if other radio selected
        elemColorSliders.style.display = 'none';
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
    for (let i = 0; i < currentDim; i++) {
        let newCol = document.createElement('div');
        newCol.width = `${elemCanvas.width / currentDim}%`;
        newCol.heigth = `100%`;
        newCol.classList.add("canvas-col");
        elemCanvas.appendChild(newCol);

        for (let j = 0; j < currentDim; j++) {
            let newPixel = document.createElement('div');
            newPixel.width = `100%`;
            newPixel.heigth = `100%`;
            newPixel.classList.add("pixel");
            newCol.appendChild(newPixel);
        }
    }
}