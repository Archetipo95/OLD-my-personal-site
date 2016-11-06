//pick element from html with id == "c"
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//katakana characters (Jappanese)
var vectorChar = "アイウエオカキクケコサシスセソガギグゲゴパピプペポ";
//converting the string into an array of single characters
vectorChar = vectorChar.split("");

var font_size = 16;
//number of columns for the rain
var columns = (c.width) / (font_size);
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++) {
    drops[x] = 1;
}

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    //green text
    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random katakana character to print
        var text = vectorChar[Math.floor(Math.random() * vectorChar.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 60);

//refresh the rain when browser is resized
window.onresize = function () {
    //full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    //number of columns for the rain
    columns = (c.width) / (font_size);
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}