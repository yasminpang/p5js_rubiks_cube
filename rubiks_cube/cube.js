cube = function (dimension)
{
    this.r = dimension;

    var up_face = [];
    var down_face = [];
    var right_face = [];
    var left_face = [];
    var front_face = [];
    var back_face = [];
    var vertical_middle_RL = [];
    var vertical_middle_FB = [];
    var horizontal_middle = [];

    var corner_RDF = new corner(this.r, ["right", "down", "front"]);
    var corner_RDB = new corner(this.r, ["right", "down", "back"]);
    var corner_RUF = new corner(this.r, ["right", "up", "front"]);
    var corner_RUB = new corner(this.r, ["right", "up", "back"]);
    var corner_LDF = new corner(this.r, ["left", "down", "front"]);
    var corner_LDB = new corner(this.r, ["left", "down", "back"]);
    var corner_LUF = new corner(this.r, ["left", "up", "front"]);
    var corner_LUB = new corner(this.r, ["left", "up", "back"]);

    var side_RU = new side(this.r, ["right", "up"]);
    var side_RD = new side(this.r, ["right", "down"]);
    var side_RF = new side(this.r, ["right", "front"]);
    var side_RB = new side(this.r, ["right", "back"]);
    var side_LD = new side(this.r, ["left", "down"]);
    var side_LU = new side(this.r, ["left", "up"]);
    var side_LF = new side(this.r, ["left", "front"]);
    var side_LB = new side(this.r, ["left", "back"]);
    var side_DF = new side(this.r, ["down", "front"]);
    var side_DB = new side(this.r, ["down", "back"]);
    var side_UF = new side(this.r, ["up", "front"]);
    var side_UB = new side(this.r, ["up", "back"]);

    var center_R = new center(this.r, "right");     
    var center_L = new center(this.r, "left");
    var center_U = new center(this.r, "up");
    var center_D = new center(this.r, "down");
    var center_F = new center(this.r, "front");
    var center_B = new center(this.r, "back");

    //array_corner.push(corner_RDF, corner_RDB, corner_RUF, corner_RUB, corner_LDF, corner_LDB, corner_LUF, corner_LUB);
    right_face.push( corner_RUF, 
                corner_RUB, 
                corner_RDB, 
                corner_RDF,
                side_RU,
                side_RB,
                side_RD,
                side_RF,
                center_R);
    left_face.push( corner_LUF, 
        corner_LDF, 
        corner_LDB, 
        corner_LUB,
        side_LU,
        side_LF,
        side_LD,
        side_LB,
        center_L);
    up_face.push( corner_RUF, 
        corner_LUF, 
        corner_LUB, 
        corner_RUB,
        side_RU,
        side_UF,
        side_LU,
        side_UB,
        center_U);
    down_face.push( corner_RDF, 
        corner_RDB, 
        corner_LDB, 
        corner_LDF,
        side_RD,
        side_DB,
        side_LD,
        side_DF,
        center_D);
    front_face.push( corner_RDF, 
            corner_LDF, 
            corner_LUF, 
            corner_RUF,
            side_UF,
            side_RF,
            side_DF,
            side_LF,
            center_F);
    back_face.push( corner_RDB, 
                corner_RUB, 
                corner_LUB, 
                corner_LDB,
                side_UB,
                side_LB,
                side_DB,
                side_RB,
                center_B);
    vertical_middle_RL.push(side_RU, side_LU, side_LD, side_RD, center_R, center_U, center_L, center_D);
    vertical_middle_FB.push(side_UF, side_UB, side_DB, side_DF, center_F, center_U, center_B, center_D);
    horizontal_middle.push(side_RF, side_RB, side_LB, side_LF, center_F, center_R, center_B, center_L);
    
    var display_face = function(face){
        for(i=0; i<face.length; i++){
            face[i].display();
        }
    }
                        

    this.display = function(faceToRotate, angle){
        switch(faceToRotate)
        {
            case "right":
                push();
                rotateX(angle);
                display_face(right_face)
                pop();
                display_face(left_face);
                display_face(vertical_middle_FB);
                break;
            case "left":
                push();
                rotateX(-angle);
                display_face(left_face)
                pop();
                display_face(right_face);
                display_face(vertical_middle_FB);
                break;
            case "down":
                push();
                rotateY(angle);
                display_face(down_face)
                pop();
                display_face(up_face);
                display_face(horizontal_middle);
                break;
            case "up":
                push();
                rotateY(-angle);
                display_face(up_face)
                pop();
                display_face(down_face);
                display_face(horizontal_middle);
                break;
            case "front":
                push();
                rotateZ(angle);
                display_face(front_face)
                pop();
                display_face(back_face);
                display_face(vertical_middle_RL);
                break;
            case "back":
                push();
                rotateZ(-angle);
                display_face(back_face)
                pop();
                display_face(front_face);
                display_face(vertical_middle_RL);
                break;
            default :
                display_face(right_face);
                display_face(left_face);
                display_face(vertical_middle_FB);
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
    
    this.executeRotation = function(faceToRotate, direction)
    {
        //console.log(faceToRotate + " | " + clockwise);
        //var temp;
        switch (faceToRotate)
        {
            case "right":
                //Rotate corners color
                swap_color([corner_RUB.face.up, corner_RUF.face.front, corner_RDF.face.down, corner_RDB.face.back], direction);
                swap_color([corner_RUB.face.back, corner_RUF.face.up, corner_RDF.face.front, corner_RDB.face.down], direction);
                swap_color([corner_RUB.face.right, corner_RUF.face.right, corner_RDF.face.right, corner_RDB.face.right], direction);

                //rotate sides color
                swap_color([side_RU.face.up, side_RF.face.front, side_RD.face.down, side_RB.face.back], direction);
                swap_color([side_RU.face.right, side_RF.face.right, side_RD.face.right, side_RB.face.right], direction);
                break;
            case "left":
                //Rotate corners color
                swap_color([corner_LDF.face.front, corner_LUF.face.up, corner_LUB.face.back, corner_LDB.face.down], direction);
                swap_color([corner_LDF.face.down, corner_LUF.face.front, corner_LUB.face.up, corner_LDB.face.back], direction);
                swap_color([corner_LDF.face.left, corner_LUF.face.left, corner_LUB.face.left, corner_LDB.face.left], direction);

                //rotate sides color
                swap_color([side_LU.face.up, side_LB.face.back, side_LD.face.down, side_LF.face.front], direction);
                swap_color([side_LU.face.left, side_LB.face.left, side_LD.face.left, side_LF.face.left], direction);
                break;
            case "up":
                //corners
                swap_color([corner_LUF.face.front, corner_RUF.face.right, corner_RUB.face.back, corner_LUB.face.left], direction);
                swap_color([corner_LUF.face.left, corner_RUF.face.front, corner_RUB.face.right, corner_LUB.face.back], direction);
                swap_color([corner_LUF.face.up, corner_RUF.face.up, corner_RUB.face.up, corner_LUB.face.up], direction);
                //sides
                swap_color([side_UF.face.front, side_RU.face.right, side_UB.face.back, side_LU.face.left], direction);
                swap_color([side_UF.face.up, side_RU.face.up, side_UB.face.up, side_LU.face.up], direction);
                break;
            case "down":
                //corners
                swap_color([corner_RDF.face.front, corner_LDF.face.left, corner_LDB.face.back, corner_RDB.face.right], direction);
                swap_color([corner_RDF.face.right, corner_LDF.face.front, corner_LDB.face.left, corner_RDB.face.back], direction);
                swap_color([corner_RDF.face.down, corner_LDF.face.down, corner_LDB.face.down, corner_RDB.face.down], direction);
                //sides
                swap_color([side_DF.face.front, side_LD.face.left, side_DB.face.back, side_RD.face.right], direction);
                swap_color([side_DF.face.down, side_LD.face.down, side_DB.face.down, side_RD.face.down], direction);
                break;
            case "front":
                //corners
                swap_color([corner_RUF.face.up, corner_LUF.face.left, corner_LDF.face.down, corner_RDF.face.right], direction);
                swap_color([corner_RUF.face.right, corner_LUF.face.up, corner_LDF.face.left, corner_RDF.face.down], direction);
                swap_color([corner_RUF.face.front, corner_LUF.face.front, corner_LDF.face.front, corner_RDF.face.front], direction);
                //sides
                swap_color([side_RF.face.right, side_UF.face.up, side_LF.face.left, side_DF.face.down], direction);
                swap_color([side_RF.face.front, side_UF.face.front, side_LF.face.front, side_DF.face.front], direction);
                break;
            case "back":
                //corners
                swap_color([corner_RUB.face.right, corner_RDB.face.down, corner_LDB.face.left, corner_LUB.face.up], direction);
                swap_color([corner_RUB.face.up, corner_RDB.face.right, corner_LDB.face.down, corner_LUB.face.left], direction);
                swap_color([corner_RUB.face.back, corner_RDB.face.back, corner_LDB.face.back, corner_LUB.face.back], direction);
                //sides
                swap_color([side_UB.face.up, side_RB.face.right, side_DB.face.down, side_LB.face.left], direction);
                swap_color([side_UB.face.back, side_RB.face.back, side_DB.face.back, side_LB.face.back], direction);
                break;
            case "v_middle_FB":
                swap_color([center_U, center_F, center_D, center_B], direction);
                swap_color([side_UF.face.up, side_DF.face.front, side_DB.face.down, side_UB.face.back], direction);
                swap_color([side_UF.face.front, side_DF.face.down, side_DB.face.back, side_UB.face.up], direction);
                break;
            case "h_middle_RL":
                swap_color([center_F, center_R, center_B, center_L], direction);
                swap_color([side_RF.face.right, side_RB.face.back, side_LB.face.left, side_LF.face.front], direction);
                swap_color([side_RF.face.front, side_RB.face.right, side_LB.face.back, side_LF.face.left], direction);
                break;
        }
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