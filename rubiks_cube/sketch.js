var myCube;

function setup() {
  // put setup code here
  createCanvas(640, 480, WEBGL);
  myCube = new cube(60);
}

function draw() {
  // put drawing code here
  background(120);
  noStroke();

  rotateX(-PI/6);
  rotateY(-PI/7);

  myCube.display();
}

function keyPressed() {
  switch (keyCode)
  {
    case LEFT_ARROW :
      myCube.move("left");
      break;
    case RIGHT_ARROW:
      myCube.move("right");
      break;
    case UP_ARROW:
      myCube.move("up");
      break;
    case DOWN_ARROW:
      myCube.move("down");
      break;
  }
}

function keyTyped()
{
  var direction;
  if(keyIsDown(SHIFT))
  {
    direction = -1;
  }
  else
  {
    direction = 1;
  }
  if(key === 'r' || key === 'R')
  {
    myCube.rotate("right", direction);
  }
  if(key === 'l' || key === 'L')
  {
    myCube.rotate("left", direction);
  }
  if(key === 'u' || key === 'U')
  {
    myCube.rotate("up", direction);
  }
  if(key === 'd' || key === 'D')
  {
    myCube.rotate("down", direction);
  }
  if(key === 'f' || key === 'F')
  {
    myCube.rotate("front", direction);
  }
  if(key === 'b' || key === 'B')
  {
    myCube.rotate("back", direction);
  }
}
