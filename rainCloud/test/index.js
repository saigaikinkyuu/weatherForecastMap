var elColored = document.getElementById('image');
var color = window.getComputedStyle(elColored, '').color;
console.log(color);  // => "rgb(255, 0, 0)"
