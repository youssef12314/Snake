"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);


  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp );

  // start ticking
  tick();
}

function keyDown(event){
  switch(event.key){
  case "ArrowLeft": controls.left=true; break;
  case "ArrowRight": controls.right=true; break;
  case "ArrowUp": controls.up=true; break;
  case "ArrowDown" : controls.down=true; break;

}
}

function keyUp(event){
  switch(event.key){
  case "ArrowLeft": controls.left=false; break;
  case "ArrowRight": controls.right=false; break;
  case "ArrowUp": controls.up=false; break;
  case "ArrowDown" : controls.down=false; break;

}
}

const controls={
  left: false,
  right: false,
  up: false,
  down: false
};

let direction='left';

const apples=[];

function tick() {
  // setup next tick
  setTimeout(tick, 500);


 
 //remove tail
 if (queue.length > 1) {
  const tail = queue.pop();
  writeToCell(tail.row, tail.col, 0);
}



  if (controls.left) {
    direction = "left";
  } else if (controls.right) {
    direction = "right";
  } else if (controls.up){
    direction="up";
  } else if (controls.down){
    direction="down"
  }

  console.log(controls);
  switch(direction){
    case 'left':
      player.col--;
      if(player.col<0){
        player.col=9;
      }
      break;
      case 'right':
        player.col++;
        if(  player.col>9){
          player.col=9;
        }
        break;
        case 'up':
        player.row--;
        if(player.row <0){
          player.row=9
        }
        break;
        case "down":
        player.row++;
        if(player.row>9){
          player.row=0;
        }
        break;
      }


  // 

  //add head to queue
  queue.unshift({ row: player.row, col: player.col });


  checkAppleCollision();
  
  //add player
  writeToCell(player.row, player.col, 1);

  //display apples
  displayApples();

  // display the model in full
  displayBoard();
}




const player={
  row: 5,
  col: 5
}

// ******** MODEL ********
const queue=[
  {
    row:5,
    col:5,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row:5,
    col:7,
  },
];

const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value,) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal", "apple");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
        case 3:
          cells[index].classList.add("apple");
          break;
      }
    }
  }
}

//function to display the apples
function displayApples(){
  for(const apple of apples){
    writeToCell(apple.row,apple.col, 3);
  }
}

//check collission with apples
function checkAppleCollision() {
  for (let i = 0; i < apples.length; i++) {
    const apple = apples[i];
    if (player.row === apple.row && player.col === apple.col) {
      // Remove the eaten apple
      apples.splice(i, 1);
      //updating correspending cell in model array
      writeToCell(apple.row, apple.col,0);
      // Increase the length of the snake
      queue.push({ row: player.row, col: player.col });
      // Generate a new random apple
      generateRandomApple();
      break;
    }
  }
}

//function to generate random apple on grid
function generateRandomApple(){
  const emptyCells=[];
  for(let row=0; row<10; row++){
    for(let col=0; col<10; col++){
      if(readFromCell(row,col)===0){
        emptyCells.push({row,col});
      }
    }
  }

  if (emptyCells.length>0){
    const randomIndex=Math.floor(Math.random()*emptyCells.length);
    const randomCell=emptyCells[randomIndex];
    apples.push({row: randomCell.row, col: randomCell.col});
    writeToCell(randomCell.row, randomCell.col, 3);
  }
}

generateRandomApple();