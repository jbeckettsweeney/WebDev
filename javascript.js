const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

const actCanv = document.getElementById("actual");
const actCtx = actCanv.getContext("2d");

let numberPixels = document.getElementById("inputSize").value;

const button = document.getElementById("submit");
const saveButton = document.getElementById("img");

let img;

canvas.addEventListener("mousedown", function(e) {
    getMousePosition(canvas, e);
});

button.addEventListener("click", function(e) {
    numberPixels = document.getElementById("inputSize").value;
    actCtx.canvas.width = numberPixels;
    actCtx.canvas.height = numberPixels;
    grid();
});

saveButton.addEventListener("click", function(e) {
    img = actCanv.toDataURL("image/png");
});

function drawRect(x, y, size) {
    canvasSize = canvas.width;
    pixelSize = (canvasSize / numberPixels);
    color = document.getElementById("colorPicker").value;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    
    actCtx.fillStyle = color;
    actCtx.fillRect(x/pixelSize, y/pixelSize, 1, 1)
}

function grid() {
    canvasSize = canvas.width;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    pixelSize = (canvasSize / numberPixels);
    for(i = 0; i <= canvasSize - pixelSize; i+=pixelSize) {
        for(j = 0; j <= canvasSize - pixelSize; j+=pixelSize) {
            drawRect(i, j, Math.round(pixelSize));
        }
    }
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    activate(x, y);
}

function activate(x, y) {
    canvasSize = canvas.width;
    pixelSize = Math.round(canvasSize / numberPixels);
    overX = x % pixelSize;
    overY = y % pixelSize;
    
    coordX = parseInt(x - overX);
    coordY = parseInt(y - overY);
    
    drawRect(coordX, coordY, pixelSize)
}

grid();