const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
const header = document.querySelector("h1");

let numSquares = 6; 
let colors = []; 
let pickedColor; 

// Function for random color generation
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function for creating random colors
function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(generateRandomColor());
  }
  return arr;
}

// Function for selecting the correct color
function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Function to change all squares to the correct color
function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
  header.style.backgroundColor = color;
}

// Function for setting squares
function setupSquares() {
  squares.forEach((square, index) => {

    if (colors[index]) {
      square.style.backgroundColor = colors[index];
      square.style.display = "block";

      
      square.addEventListener("click", function () {
        const clickedColor = this.style.backgroundColor;

        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "CORRECT!";
          changeColors(pickedColor);
          resetButton.textContent = "Play Again?";
        } else {
          this.style.backgroundColor = "transparent";
          messageDisplay.textContent = "TRY AGAIN";
        }
      });
    } else {
      square.style.display = "none";
    }
  });
}

// Function to reset the game
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  header.style.backgroundColor = "";
  setupSquares();
}

// Function for setting the difficulty level
function setMode() {
  modeButtons.forEach((button) =>
    button.addEventListener("click", function () {
      modeButtons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
      numSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    })
  );
}

// Initial setting
function init() {
  setMode();
  resetButton.addEventListener("click", reset);
  reset();
}

init();
