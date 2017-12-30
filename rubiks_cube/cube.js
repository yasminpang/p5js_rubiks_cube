cube = function (dimension)
{
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

    
    sides.push( new corner(dimension, ["right", "up"]) );
    sides.push( new corner(dimension, ["right", "down"]) );
    sides.push( new corner(dimension, ["right", "front"]) );
    sides.push( new corner(dimension, ["right", "back"]) );
    sides.push( new corner(dimension, ["left", "down"]) );
    sides.push( new corner(dimension, ["left", "up"]) );
    sides.push( new corner(dimension, ["left", "front"]) );
    sides.push( new corner(dimension, ["left", "back"]) );
    sides.push( new corner(dimension, ["down", "front"]) );
    sides.push( new corner(dimension, ["down", "back"]) );
    sides.push( new corner(dimension, ["up", "front"]) );
    sides.push( new corner(dimension, ["up", "back"]) );
    
    centers.push( new corner(dimension, ["right"]) );     
    centers.push( new corner(dimension, ["left"]) );
    centers.push( new corner(dimension, ["up"]) );
    centers.push( new corner(dimension, ["down"]) );
    centers.push( new corner(dimension, ["front"]) );
    centers.push( new corner(dimension, ["back"]) );
 
    this.move = function(direction)
    {
        if(faceToRotate === "" && move_cube === "")
        {
            move_cube = direction;
            cube_angle = 0;

            switch (move_cube)
            {
                case "up":
                    setNextColor("right", 1);
                    setNextColor("left", -1);
                    setMiddleNextColor(["right", "left"], 1);
                    //executeFaceRotation("v_middle_FB", 1);
                    break;
                case "down":
                    setNextColor("right", -1);
                    setNextColor("left", 1);
                    setMiddleNextColor(["right", "left"], -1);
                    //setNextColor("v_middle_FB", -1);
                    break;
                case "right":
                    setNextColor("up", -1);
                    setNextColor("down", 1);
                    setMiddleNextColor(["down", "up"], 1);
                    //setNextColor("h_middle_RL", -1);
                    break;            
                case "left":
                    setNextColor("up", 1);
                    setNextColor("down", -1);
                    setMiddleNextColor(["down", "up"], -1);
                    //setNextColor("h_middle_RL", 1);
                    break;            
            }
            //executeFaceRotation();
                
        }
    }

    this.display = function(){
        if (faceToRotate != "" )
        {
            rotationAngle += 0.1;
          if(rotationAngle > PI/2)
          {
            swapColors();
            rotationAngle = 0;
            faceToRotate = "";
            //direction = 1;
          }
        }
        
        if(move_cube != ""){
            cube_angle += 0.1;
            if(cube_angle > PI/2 )
            {
                swapColors();
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

        //display sides
        for (i=0; i<12; i++)
        {
            if(sides[i].position[faceToRotate])
            {
                push();
                rotateFaceAxe();
                sides[i].display();
                pop();
            }
            else
            {
                sides[i].display();
            }
        }

        //display centers
        for(j=0; j<6; j++){
            if(centers[j].position[faceToRotate]){
                push();
                rotateFaceAxe();
                centers[j].display();
                pop();
            }else{
                centers[j].display();
            }
        }
        
    }

    this.rotate = function(face, direction){
        if(faceToRotate === "" && move_cube === "")
        {
            faceToRotate = face;
            rotationAngle = 0;
            rotationDirection = direction;

            setNextColor(face, direction);
                
        }
    }

    function setMiddleNextColor(middle, direction){
        let i = 0;
        for(i=0; i<12; i++){
            if(!sides[i].position[middle[0]] && !sides[i].position[middle[1]])
            {
                //Find the next side in the specified face rotation
                // and set the next colors of this corner
                var face = middle[0];
                var nextSide = findNextSide(sides[i], face, direction);
                for (p in sides[i].position)
                {
                    var pos = sides[i].position[p];
                    if(pos)
                    {
                        if(pos === face)
                        {
                           nextSide.nextColor[pos] = sides[i].color[pos];
                        }
                        else
                        {
                            nextSide.nextColor[findNextPosition(pos, face, direction)] = sides[i].color[pos];
                        }
                    }
                }
            }
        }

        //centers
        for(i=0; i<6; i++){
            if(!centers[i].position[middle[0]] && !centers[i].position[middle[1]]){
                var face = middle[0];
                var nextCenter = findNextCenter(centers[i], face, direction);
                for (p in centers[i].position)
                {
                    var pos = centers[i].position[p];
                    if(pos)
                    {
                        if(pos === face)
                        {
                            nextCenter.nextColor[pos] = centers[i].color[pos];
                        }
                        else
                        {
                            nextCenter.nextColor[findNextPosition(pos, face, direction)] = centers[i].color[pos];
                        }
                    }
                }
                
            }
        }
    }

    function setNextColor(face, direction){
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

        //set sides next color
        for(i=0; i<12; i++){
            //If the side is in the face to rotate
            if(sides[i].position[face])
            {
                //Find the next side in the specified face rotation
                // and set the next colors of this corner
                var nextSide = findNextSide(sides[i], face, direction);
                for (p in sides[i].position)
                {
                    var pos = sides[i].position[p];
                    if(pos)
                    {
                        if(pos === face)
                        {
                           nextSide.nextColor[pos] = sides[i].color[pos];
                        }
                        else
                        {
                            nextSide.nextColor[findNextPosition(pos, face, direction)] = sides[i].color[pos];
                        }
                    }
                }
            }
        }
    }

    function findNextCorner(corner, face, direction)
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

    function findNextCenter(center, face, direction){
        var arrayNextCenterPosition = [
            findNextPosition(center.position.right, face, direction),
            findNextPosition(center.position.left, face, direction),
            findNextPosition(center.position.up, face, direction),
            findNextPosition(center.position.down, face, direction),
            findNextPosition(center.position.front, face, direction),
            findNextPosition(center.position.back, face, direction),
        ];
        var nextCenterPosition = {        
            right : null,
            left : null,
            up : null,
            down : null,
            front : null,
            back : null
        };

        for (i=0; i<6; i++)
        {
            if(arrayNextCenterPosition[i]){
                nextCenterPosition[arrayNextCenterPosition[i]] = arrayNextCenterPosition[i]; 
            }
        }

        for (i=0; i<6 ; i++)
        {
            if( centers[i].position.right === nextCenterPosition.right &&
                centers[i].position.left === nextCenterPosition.left && 
                centers[i].position.up === nextCenterPosition.up &&
                centers[i].position.down === nextCenterPosition.down &&
                centers[i].position.front === nextCenterPosition.front &&
                centers[i].position.back === nextCenterPosition.back )
            {
                return centers[i];
            }
        }
        
    }

    function findNextSide(side, face, direction){
        var arrayNextSidePosition = [
            findNextPosition(side.position.right, face, direction),
            findNextPosition(side.position.left, face, direction),
            findNextPosition(side.position.up, face, direction),
            findNextPosition(side.position.down, face, direction),
            findNextPosition(side.position.front, face, direction),
            findNextPosition(side.position.back, face, direction),
        ];
        var nextSidePosition = {        
            right : null,
            left : null,
            up : null,
            down : null,
            front : null,
            back : null
        };

        for (i=0; i<6; i++)
        {
            if(arrayNextSidePosition[i]){
                nextSidePosition[arrayNextSidePosition[i]] = arrayNextSidePosition[i]; 
            }
        }

        for (i=0; i<12 ; i++)
        {
            if( sides[i].position.right === nextSidePosition.right &&
                sides[i].position.left === nextSidePosition.left && 
                sides[i].position.up === nextSidePosition.up &&
                sides[i].position.down === nextSidePosition.down &&
                sides[i].position.front === nextSidePosition.front &&
                sides[i].position.back === nextSidePosition.back )
            {
                return sides[i];
            }
        }

    }

    function findNextPosition(p, face, direction)
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

    function swapColors()
    {
        //Swap corners color
        for(i=0; i<8; i++)
        {
            for (key in corners[i].color)
            {
                if(corners[i].nextColor[key])
                {
                    corners[i].color[key] = corners[i].nextColor[key];
                }
            }
        }
        //Swap sides color
        for(i=0; i<12; i++)
        {
            for (key in sides[i].color)
            {
                if(sides[i].nextColor[key])
                {
                    sides[i].color[key] = sides[i].nextColor[key];
                }
            }
        }
        //Swap centers color
        for(i=0; i<6; i++)
        {
            for (key in centers[i].color)
            {
                if(centers[i].nextColor[key])
                {
                    centers[i].color[key] = centers[i].nextColor[key];
                }
            }
        }

    }

}