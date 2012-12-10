var RADIUS = 300;

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
  var radians = rad(p * 360);
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius
  };
}

/**
 * Draw the seconds
 */
function drawSeconds(seconds) {
  var coords = coordinates(seconds / 60);
  console.log('x = %d, y = %d', coords.x, coords.y);
}

/**
 * Draw the minute
 */
function drawMinute(minute) {
  var coords = coordinates(minute / 60);
  console.log('x = %d, y = %d', coords.x, coords.y);
}

/**
 * Draw the hours
 */
function drawHour(hour) {
  var coords = coordinates(hour / 24);
  console.log('x = %d, y = %d', coords.x, coords.y);
}

/**
 * The loop
 */
function loop() {
  var date = new Date();
  drawHour(date.getHours());
  drawMinute(date.getMinutes());
  drawSeconds(date.getSeconds());
  console.log()
}

setInterval(loop, 1000);
