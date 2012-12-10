var canvas, ctx;

/** Config **/
var WIDTH = 500;
var HEIGHT = 500;
var RADIUS = 200;
var BLOCK_SIZE = 10;
var COLORS = {
  markers: '#fff',
  hours: '#0f0',
  minutes: '#00f',
  seconds: '#f00'
};
var DRAW_CENTER = true;
/** end config **/

var center = {
  x: WIDTH / 2,
  y: HEIGHT / 2
};

/**
 * Convert degrees to radians
 */
function rad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Get the X and Y coords of a given proportion
 */
function coordinates(p, radius) {
  radius = radius || RADIUS;
  var radians = rad((p * 360 - 90) % 360);
  return {
    x: Math.cos(radians) * radius + center.x,
    y: Math.sin(radians) * radius + center.y
  };
}

/**
 * Clear the canvas
 */
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// draw clock hands
function drawHands() {
  ctx.fillStyle = COLORS.markers;
  if (DRAW_CENTER) ctx.fillRect(center.x - 1, center.y - 1, 2, 2);
  for (var i = 0; i < 60; ++i) {
    var coords = coordinates(i / 60);
    var r = i % 5 === 0 ? 5 : 2;
    ctx.fillRect(coords.x - (r/2), coords.y - (r/2), r, r);
  }
}

/**
 * Draw the seconds
 */
function drawSeconds(date) {
  var seconds = date.getSeconds();
  var coords = coordinates(seconds / 60);
  ctx.fillStyle = COLORS.seconds;
  ctx.fillRect(coords.x - BLOCK_SIZE / 2, coords.y - BLOCK_SIZE / 2, BLOCK_SIZE, BLOCK_SIZE);
}

/**
 * Draw the minute
 */
function drawMinute(date) {
  var minute = date.getMinutes();
  var coords = coordinates(minute / 60);
  ctx.fillStyle = COLORS.minutes;
  ctx.fillRect(coords.x - BLOCK_SIZE / 2, coords.y - BLOCK_SIZE / 2, BLOCK_SIZE, BLOCK_SIZE);
}

/**
 * Draw the hours
 */
function drawHour(date) {
  var hour = date.getHours();
  var coords = coordinates(hour % 12 / 12);
  ctx.fillStyle = COLORS.hours;
  ctx.fillRect(coords.x - BLOCK_SIZE / 2, coords.y - BLOCK_SIZE / 2, BLOCK_SIZE, BLOCK_SIZE);
}

/**
 * The loop
 */
function loop() {
  var date = new Date();
  clearCanvas();
  drawHands();
  drawHour(date);
  drawMinute(date);
  drawSeconds(date);
}

/**
 * Initialize the clock
 */
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  setInterval(loop, 1000);
}

window.onload = init;
