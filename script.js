
let grid = document.querySelector("#grid");
let size = 16;
let color = "black";
let mode = "hover";
let mouseDown = 0;

createGrid();



function createGrid() {

    let width = grid.clientWidth; //gets grid's width excluding border 

    // calculate new cell size based on number of cells

    grid.setAttribute("style", `grid-template-columns:repeat(auto-fill,${width / size}px); grid-template-rows:repeat(auto-fill,${width / size}px);`);

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.backgroundColor = "rgb(238, 238, 238)";
        div.value = ""; // value is used to record wether cursor has already been on a given cell
        div.addEventListener("mouseover", (e) => {
            if (mode == "hover" || mode == "drag" && mouseDown == 1) {
                e.target.classList.remove("rainbow");
                if (color == "white") {
                    e.target.setAttribute("style", `background-color:rgb(238, 238, 238);`);
                } else if (color == "black") {

                    //this code words by giving a value of "visited" to each cell that has been touched by the cursor
                    //then it extracts the background color of a cell and decreases it each time the cell is stepped on

                    let intensity;

                    intensity = window.getComputedStyle(e.target).getPropertyValue("background-color");

                    //this line gets the R value of the RGB color, since for shades of black R, G and B values are the same
                    intensity = intensity.replace(/[^\d,]/g, "").split(",")[0];

                    if (e.target.value != "visited") {
                        e.target.value = "visited";
                        intensity = 210;
                    } else if (intensity > 0) {
                        intensity -= 30;
                    } else {
                        intensity = 0;
                    }

                    e.target.setAttribute("style", `background-color:rgb(${intensity}, ${intensity}, ${intensity});`);

                } else {
                    e.target.classList.add("rainbow");
                    e.target.setAttribute("style", `background-color:rgb(${getRandomInt(50, 255)}, ${getRandomInt(50, 255)}, ${getRandomInt(50, 255)});`);
                }

            }
        });
        grid.appendChild(div);
    }

}

function emptyGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function resetGrid() {
    emptyGrid();
    createGrid();
}


let buttonDivs = ["colors", "sizes"];

buttonDivs.forEach(function (divName) {
    let sizesDiv = document.querySelector(`#${divName}`);
    let sizeButtons = sizesDiv.querySelectorAll("button");
    sizeButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            sizeButtons.forEach(function (button) {
                button.classList.remove("active");
            });
            e.target.classList.add("active");
            if (divName == "colors") {
                color = e.target.value;
            } else {
                size = e.target.value;
                resetGrid();
            }
        });
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// setting events for remaining buttons

let resetButton = document.querySelector('button[value = "reset"]');
resetButton.addEventListener("click", () => {
    resetGrid();
})

let modeButton = document.querySelector('button[value = "mode"]');
modeButton.addEventListener("click", function (e) {
    if (e.target.textContent == "Mode: hover") {
        e.target.textContent = "Mode: drag";
        mode = "drag";
    } else {
        e.target.textContent = "Mode: hover"
        mode = "hover";
    }
});

grid.addEventListener("pointerdown", function () {
    mouseDown = 1;
});

grid.addEventListener("pointerup", function () {
    mouseDown = 0;
});

let saveButton = document.querySelector("button[value ='save'");

saveButton.addEventListener("click", function () {
    var t = document.getElementById('canvas');
    var c = t.getContext('2d');
    const container = document.getElementsByClassName('cell');
    var iter = 0;
    const w = t.width / size;
    const h = t.height / size;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            c.fillStyle = container[iter].style.backgroundColor;
            console.log(container[iter].style.backgroundColor);
            let x = j * 600 / size;
            let y = i * 600 / size;
            c.fillRect(x, y, w, h);
            iter++;
        }
    }
    window.open(document.getElementById('canvas').toDataURL());
});