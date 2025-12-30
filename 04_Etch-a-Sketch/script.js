const defaultCells = 16;
const defaultColor = 'black';
const maxWidth = 960;
const container = document.querySelector('.container');

let mode = 'default';
let currColor = 'black';



let createGrid = (cellsPerSide) => {
    const container = document.querySelector('.container');
    container.innerHTML='';
    mode = 'default';
    // let width = (maxWidth-(cellsPerSide+1))/cellsPerSide;
    let width = (maxWidth)/cellsPerSide;
    for (let i = 0; i < cellsPerSide; i++){
        for (let j = 0; j < cellsPerSide; j++){
            const cell = document.createElement('div');
            cell.style.width = `${width}px`;
            cell.style.height = `${width}px`;
            cell.className = 'cell';
            
            // cell.style.borderTop = "1px solid black";
            // cell.style.borderLeft = "1px solid black";
            


            // if (j == cellsPerSide-1){
            //     cell.style.borderRight = "1px solid black";
            // }
            // if (i == cellsPerSide-1){
            //     cell.style.borderBottom = "1px solid black";
            // }

            container.appendChild(cell);
        }
        
    }
}

let reset = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor='white';
        cell.dataset.opacity='0';
    })
    mode = 'default';
}

function main(){
    createGrid(defaultCells);
    const size = document.querySelector('.grid.button');
    let side = defaultCells;
    size.addEventListener('click', (e) => {
        do {
            side = parseInt(window.prompt("Please select the number of squares per side (Max 100):"));
        } while (!(side > 0 && side <= 100));
        createGrid(side);
        
    });

    const defaultB = document.querySelector('.default.button');
    defaultB.addEventListener('click', (e) => {
        mode = 'default';
    });
    const rainbowB = document.querySelector('.rainbow.button');
    rainbowB.addEventListener('click', (e) => {
        mode = 'rainbowMode';
    });
    const shaderB = document.querySelector('.shading.button');
    shaderB.addEventListener('click', (e) => {
        mode = 'shaderMode';
    });
    const resetB = document.querySelector('.clear.button');
    resetB.addEventListener('click', (e) => {
        reset();
    });

    
    container.addEventListener('mouseover', (e) => {
        if (!e.target.classList.contains('cell')) return; // only color cells and prevent all the cells from being colored
        if (mode === 'default'){
            e.target.style.backgroundColor = 'black';
        } else if (mode === 'rainbowMode'){
            const randomColor = `rgb(${Math.floor(Math.random()*256)},
                                                ${Math.floor(Math.random()*256)},
                                                ${Math.floor(Math.random()*256)})`;
            e.target.style.backgroundColor = randomColor;
        } else if (mode === 'shaderMode'){
            let currOpacity = Number(e.target.dataset.opacity) || 0;
            if (currOpacity < 1){
                currOpacity += 0.1;
            }
            e.target.dataset.opacity = currOpacity;
            e.target.style.backgroundColor = `rgba(0,0,0,${currOpacity})`;

        } else {
            return;
        }
    });

    
}

main();


