var cube1;

function setup() {
  // put setup code here
  createCanvas(600, 400, WEBGL);
  cube1 = new cube();
}

function draw() {
  // put drawing code here
  background(210);
  noStroke();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cube1.setColor(greenColor, redColor, blackColor, blackColor, blackColor, blackColor);
  cube1.display();
}