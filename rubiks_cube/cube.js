cube = function (dimension)
{
    this.r = dimension;

    var array_corner = [];

    var corner_RDF = new corner(this.r, ["right", "down", "front"]);
    var corner_RDB = new corner(this.r, ["right", "down", "back"]);
    var corner_RUF = new corner(this.r, ["right", "up", "front"]);
    var corner_RUB = new corner(this.r, ["right", "up", "back"]);
    var corner_LDF = new corner(this.r, ["left", "down", "front"]);
    var corner_LDB = new corner(this.r, ["left", "down", "back"]);
    var corner_LUF = new corner(this.r, ["left", "up", "front"]);
    var corner_LUB = new corner(this.r, ["left", "up", "back"]);

    corners = {
        corner_RDF,
        corner_RDB,
        corner_RUF,
        corner_RUB,
        corner_LDF,
        corner_LDB,
        corner_LUF,
        corner_LUB
    }

    array_corner.push(corner_RDF, corner_RDB, corner_RUF, corner_RUB, corner_LDF, corner_LDB, corner_LUF, corner_LUB);

    this.display = function(faceToRotate, angle){
        for(i=0; i<8; i++)
        {
        if(array_corner[i].pos[0] == faceToRotate || array_corner[i].pos[1] == faceToRotate || array_corner[i].pos[2] == faceToRotate)
            {
                push();
                if(faceToRotate == "right")
                {
                    rotateX(angle);
                }
                if(faceToRotate == "left")
                {
                    rotateX(-angle);
                }
                if(faceToRotate == "down")
                {
                    rotateY(angle);
                }
                if(faceToRotate == "up")
                {
                    rotateY(-angle);
                }
                if(faceToRotate == "front")
                {
                    rotateZ(angle);
                }
                if(faceToRotate == "back")
                {
                    rotateZ(-angle);
                }
                array_corner[i].display();
                pop();
            }
            else
            {
                array_corner[i].display();
            }
        }
    }

    this.executeRotation = function(faceToRotate, clockwise)
    {

    }
}