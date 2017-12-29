var myCube;
var faceToRotate = "";
var angle = 0;
var direction = 1;



// Cube orientation
//up, down, right, left.
move_cube = "";
cube_angle = 0;

function setup() {
  // put setup code here
  createCanvas(600, 400, WEBGL);
  //ortho(-width / 3, width / 3, -height / 2.8, height / 2.8, 0, 500);
  myCube = new cube(60);
}

function draw() {
  // put drawing code here
  background(120);
  noStroke();
  //camera(140, -140, 140, 0, 0, 0, 0, 1, 0);

  rotateX(-PI/6);
  rotateY(-PI/7);

  if (faceToRotate != "" )
  {
    angle += 0.18;
    if(angle > PI/2)
    {
      myCube.executeRotation(faceToRotate, direction)
      angle = 0;
      faceToRotate = "";
      //direction = 1;
    }
  }

  if(move_cube != ""){
    cube_angle += 0.18;
    if(cube_angle > PI/2 )
    {
      myCube.move(move_cube);
      cube_angle = 0;
      move_cube = "";
    }
    if(move_cube === "up"){
      rotateX(cube_angle);
    }
    if(move_cube === "down"){
      rotateX(-cube_angle);
    }
    if(move_cube === "right"){
      rotateY(cube_angle);
    }
    if(move_cube === "left"){
      rotateY(-cube_angle);
    }
  }
  myCube.display(faceToRotate, direction * angle);
}

function keyPressed() {
  
  if(move_cube === "" && faceToRotate === "")
  {
    if (keyCode === LEFT_ARROW) 
    {
      move_cube = "left";
    } 
    else if (keyCode === RIGHT_ARROW) 
    {
      move_cube = "right";
    }
    else if (keyCode === UP_ARROW) 
    {
      move_cube = "up";
    }
    else if (keyCode === DOWN_ARROW) 
    {
      move_cube = "down";
    }
  }
}

function keyTyped()
{
  console.log(key);
  if (faceToRotate === "" && move_cube === "")
  {
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
      faceToRotate = "right";
    }
    if(key === 'l' || key === 'L')
    {
      faceToRotate = "left";
    }
    if(key === 'u' || key === 'U')
    {
      faceToRotate = "up";
    }
    if(key === 'd' || key === 'D')
    {
      faceToRotate = "down";
    }
    if(key === 'f' || key === 'F')
    {
      faceToRotate = "front";
    }
    if(key === 'b' || key === 'B')
    {
      faceToRotate = "back";
    }
  }
}
