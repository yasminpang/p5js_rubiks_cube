cube = function (dimension)
{
    //this.r = dimension;

    var corners = [];
    var sides = [];
    var centers = [];

    var faceToRotate = "";
    var rotationAngle = 0;
    var rotationDirection = 1;

    var move_cube = "";
    var cube_angle = 0;



    corners.push( new corner(dimension, ["right", "down", "front"]));
    corners.push( new corner(dimension, ["right", "down", "back"]));
    corners.push( new corner(dimension, ["right", "up", "front"]));
    corners.push( new corner(dimension, ["right", "up", "back"]));
    corners.push( new corner(dimension, ["left", "down", "front"]));
    corners.push( new corner(dimension, ["left", "down", "back"]));
    corners.push( new corner(dimension, ["left", "up", "front"]));
    corners.push( new corner(dimension, ["left", "up", "back"]));

    /*
    sides.push( new side(dimension, ["right", "up"]) );
    sides.push( new side(dimension, ["right", "down"]) );
    sides.push( new side(dimension, ["right", "front"]) );
    sides.push( new side(dimension, ["right", "back"]) );
    sides.push( new side(dimension, ["left", "down"]) );
    sides.push( new side(dimension, ["left", "up"]) );
    sides.push( new side(dimension, ["left", "front"]) );
    sides.push( new side(dimension, ["left", "back"]) );
    sides.push( new side(dimension, ["down", "front"]) );
    sides.push( new side(dimension, ["down", "back"]) );
    sides.push( new side(dimension, ["up", "front"]) );
    sides.push( new side(dimension, ["up", "back"]) );

    centers.push( new center(dimension, "right") );     
    centers.push( new center(dimension, "left") );
    centers.push( new center(dimension, "up") );
    centers.push( new center(dimension, "down") );
    centers.push( new center(dimension, "front") );
    centers.push( new center(dimension, "back") );
    */

    this.rotate = function(face, direction){
        if(faceToRotate === "" && move_cube === "")
        {
            faceToRotate = face;
            rotationAngle = 0;
            rotationDirection = direction;
        }
    }

    this.display = function(){
        if (faceToRotate != "" )
        {
            rotationAngle += 0.18;
          if(rotationAngle > PI/2)
          {
            executeRotation(faceToRotate, rotationAngle)
            rotationAngle = 0;
            faceToRotate = "";
            //direction = 1;
          }
        }
        
        if(move_cube != ""){
            cube_angle += 0.18;
            if(cube_angle > PI/2 )
            {
              move(move_cube);
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
        
        //display corners
        for (i=0; i<8; i++)
        {
            if(corners[i].position[faceToRotate])
            {
                push();
                rotateFaceAxe();
                corners[i].display();
                pop();
            }
            else
            {
                corners[i].display();
            }
        }

    }

    function rotateFaceAxe()
    {
        switch(faceToRotate)
        {
            case "right":
                rotateX(rotationAngle * rotationDirection);
                break;
            case "left":
                rotateX(-rotationAngle * rotationDirection);
                break;
            case "up":
                rotateY(-rotationAngle * rotationDirection);
                break;
            case "down":
                rotateY(rotationAngle * rotationDirection);
                break;
            case "front":
                rotateZ(rotationAngle * rotationDirection);
                break;
            case "back":
                rotateZ(-rotationAngle * rotationDirection);
                break;
        }
    }

    function swap_color(array_to_swap, direction)
    {
        var temp;
        if(direction === 1)
        {
            temp = array_to_swap[0].color;
            for(i=0; i<3; i++){
                array_to_swap[i].color = array_to_swap[i+1].color;
            }
            array_to_swap[3].color = temp;
        }
        else
        {
            temp = array_to_swap[3].color;
            for(i=3; i>0; i--){
                array_to_swap[i].color = array_to_swap[i-1].color;
            }
            array_to_swap[0].color = temp;

        }
    }
    
    executeRotation = function(faceToRotate, direction)
    {
        //console.log(faceToRotate + " | " + clockwise);
        //var temp;
    }

    this.move = function(direction)
    {
        console.log(direction);
        switch (direction)
        {
            case "up":
                this.executeRotation("right", 1);
                this.executeRotation("left", -1);
                this.executeRotation("v_middle_FB", 1);
                break;
            case "down":
                this.executeRotation("right", -1);
                this.executeRotation("left", 1);
                this.executeRotation("v_middle_FB", -1);
                break;
            case "right":
                this.executeRotation("up", -1);
                this.executeRotation("down", 1);
                this.executeRotation("h_middle_RL", -1);
                break;            
            case "left":
                this.executeRotation("up", 1);
                this.executeRotation("down", -1);
                this.executeRotation("h_middle_RL", 1);
                break;            
        }
    }
}