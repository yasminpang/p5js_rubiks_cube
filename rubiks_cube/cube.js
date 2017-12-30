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

    var nextPosition = {
        right : ["up", "back", "down", "front"],
        left  : ["up", "front", "down", "back"],
        up    : ["front", "left", "back", "right"],
        down  : ["front", "right", "back", "left"],
        front : ["up", "right", "down", "left"],
        back  : ["up", "left", "down", "right"]
    }



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

            var i=0;
            //Set corners next color
            for (i=0; i<8; i++)
            {
                //If the corner is in the face to rotate
                if(corners[i].position[face])
                {
                    //Find the next corner in the specified face rotation
                    // and set the next colors of this corner
                    var nextCorner = findNextCorner(corners[i], face, direction);
                    for (p in corners[i].position)
                    {
                        var pos = corners[i].position[p];
                        if(pos)
                        {
                            if(pos === face)
                            {
                               nextCorner.nextColor[pos] = corners[i].color[pos];
                            }
                            else
                            {
                                nextCorner.nextColor[findNextPosition(pos, face, direction)] = corners[i].color[pos];
                            }
                        }
                        
                    }

                }
            }
                
        }
    }

    findNextCorner = function(corner, face, direction)
    {
        //return;
        var arrayNextCornerPosition = [
            findNextPosition(corner.position.right, face, direction),
            findNextPosition(corner.position.left, face, direction),
            findNextPosition(corner.position.up, face, direction),
            findNextPosition(corner.position.down, face, direction),
            findNextPosition(corner.position.front, face, direction),
            findNextPosition(corner.position.back, face, direction),
        ];
        var nextCornerPosition = {        
            right : null,
            left : null,
            up : null,
            down : null,
            front : null,
            back : null
        };

        for (i=0; i<6; i++)
        {
            if(arrayNextCornerPosition[i]){
                nextCornerPosition[arrayNextCornerPosition[i]] = arrayNextCornerPosition[i]; 
            }
        }

        for (i=0; i<8 ; i++)
        {
            if( corners[i].position.right === nextCornerPosition.right &&
                corners[i].position.left === nextCornerPosition.left && 
                corners[i].position.up === nextCornerPosition.up &&
                corners[i].position.down === nextCornerPosition.down &&
                corners[i].position.front === nextCornerPosition.front &&
                corners[i].position.back === nextCornerPosition.back )
            {
                return corners[i];
            }
        }
    }

    findNextPosition = function(p, face, direction)
    {
        if (!p)
        {
            return null;
        }

        if( p === face)
        {
            return p;
        }

        for(i=0; i<4; i++ )
        {
            if(nextPosition[face][i] === p)
            {
                if( (i + direction) > 3)
                {
                    return nextPosition[face][0];
                }
                else if ( (i + direction) < 0 )
                {
                    return nextPosition[face][3];
                }
                else
                {
                    return nextPosition[face][i+direction];
                }
            }
        }
    }

    this.move = function(direction)
    {
        if(faceToRotate === "" && move_cube === "")
        {
            move_cube = direction;
            cube_angle = 0;
        }
    }

    this.display = function(){
        if (faceToRotate != "" )
        {
            rotationAngle += 0.18;
          if(rotationAngle > PI/2)
          {
            executeFaceRotation();
            rotationAngle = 0;
            faceToRotate = "";
            //direction = 1;
          }
        }
        
        if(move_cube != ""){
            cube_angle += 0.18;
            if(cube_angle > PI/2 )
            {
              executeCubeMove();
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

    executeFaceRotation = function()
    {
        //Execute corners rotation
        for(i=0; i<8; i++)
        {
            for (key in corners[i].color)
            {
                if(corners[i].nextColor[key])
                {
                    //console.log(corners[i].nextColor);
                    corners[i].color[key] = corners[i].nextColor[key];
                }
            }
        }
    }

    executeCubeMove = function()
    {
        
        switch (move_cube)
        {
            case "up":
                executeFaceRotation("right", 1);
                executeFaceRotation("left", -1);
                executeFaceRotation("v_middle_FB", 1);
                break;
            case "down":
                executeFaceRotation("right", -1);
                executeFaceRotation("left", 1);
                executeFaceRotation("v_middle_FB", -1);
                break;
            case "right":
                executeFaceRotation("up", -1);
                executeFaceRotation("down", 1);
                executeFaceRotation("h_middle_RL", -1);
                break;            
            case "left":
                executeFaceRotation("up", 1);
                executeFaceRotation("down", -1);
                executeFaceRotation("h_middle_RL", 1);
                break;            
        }
    }
}