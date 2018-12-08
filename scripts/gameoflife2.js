let resolution = 5;
let width = window.innerWidth;
let height = window.innerHeight +100;


let grid = new Array(Math.floor(width/resolution));
for(let i = 0; i < grid.length; ++i)
        grid[i] = new Array(Math.floor(height/resolution)).fill(0);
    
let newGrid = new Array(Math.floor(width/resolution));
for(let i = 0; i < newGrid.length; ++i)
        newGrid[i] = new Array(Math.floor(height/resolution)).fill(0);

function nbvoisins(i , j) {
    var nb = 0;
    var im = i-1;
    var ip = i+1;
    var jm = j-1;
    var jp = j+1;
    if(i == 0) im = grid.length-1;
    if(j == 0) jm = grid[0].length-1;
    if(i == grid.length-1) ip = 0;
    if(j == grid[0].length-1) jp = 0;
    nb += grid[ip][j];
    nb += grid[ip][jp];
    nb += grid[ip][jm];
    nb += grid[i][jp];
    nb += grid[i][jm];
    nb += grid[im][j];
    nb += grid[im][jp];
    nb += grid[im][jm];
    
    
    return nb; 
} 

function setup() {
    createCanvas(width, height);
    for(let i = 0 ; i < grid.length; ++i)
        for(let j = 0; j < grid[0].length; ++j)
            grid[i][j] = Math.floor(random(1)+0.5);
      
    grid[0][0] = 1;
    grid[10][10] = 1;
    grid[10][9] = 1;
    grid[10][8] = 1;
}

function draw() {
    background(0, 0,0 ,10);
    
    for(let i = 0 ; i < grid.length; ++i)
        for(let j = 0; j < grid[0].length; ++j)
            {
                nb = nbvoisins(i,j);
                if(nb <= 1) newGrid[i][j] = 0;
                else if(nb >= 4) newGrid[i][j] = 0;
                else if (nb == 3) newGrid[i][j] = 1;
                else if (nb == 2) newGrid[i][j] = grid[i][j];
            }
    
    
    for(let i = 0 ; i < grid.length; ++i)
        for(let j = 0; j < grid[0].length; ++j)
            grid[i][j] = newGrid[i][j];
    
    
    
   
    for(let i = 0 ; i < grid.length; ++i)
        for(let j = 0; j < grid[0].length; ++j){
            if(grid[i][j] == 1) rect(i*resolution, j*resolution, resolution, resolution);}

       
    
}