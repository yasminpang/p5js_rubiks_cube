var myCube;
var faceToRotate = "";
var angle = 0;
var direction = 1;

function setup() {
  // put setup code here
  createCanvas(600, 400, WEBGL);
  myCube = new cube(45);
}

function draw() {
  // put drawing code here
  background(210);
  noStroke();
  camera(150, -150, 150, 0, 0, 0, 0, 1, 0);

  //rotateY(frameCount * 0.01);
  //rotateX(frameCount * 0.01);

  myCube.display(faceToRotate, direction * angle);
  if (faceToRotate != "" )
  {
    angle += PI / 70;
    if(angle > PI/2)
    {
      myCube.executeRotation(faceToRotate, direction)
      angle = 0;
      faceToRotate = "";
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    faceToRotate = "up";
    direction = 1;

  } else if (keyCode === RIGHT_ARROW) {
    faceToRotate = "up";
    direction = -1;
  }
  console.log(keyCode);
}