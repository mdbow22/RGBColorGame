var numOfSquares = 6;
var colors = genColors(numOfSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("#head");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click",function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");

        //figure out how many squares
        if(this.textContent === "Easy"){
            numOfSquares = 3;
        } else {
            numOfSquares = 6;
        }
        //ternary operator: this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
        reset();
    })
}

function reset(){
    colors = genColors(numOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }

    header.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
}

resetButton.addEventListener("click",function(){
    reset();
});

//update game header to have color needing guessed
colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    //add click listeners to squares
    squares[i].addEventListener("click",function(){
        //grab color of clicked square
        var clickedColor = this.style.backgroundColor;
        //compare clickedColor to pickedColor
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            header.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?";
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}


//function that changes all boxes to clickedColor
function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function genColors(num){
    //make an array
    var arr = [];
    //add num random colors to arr
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

//Create a random RGB color
function randomColor(){
    //pick a "red" from 0-255
    var red = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var green = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}