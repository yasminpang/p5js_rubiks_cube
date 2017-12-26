cube = function (dimension)
{
    this.r = dimension;

    var array_corner = [];
    var array_center = [];
    var array_side = [];

    var corner_RDF = new corner(this.r, ["right", "down", "front"]);
    var corner_RDB = new corner(this.r, ["right", "down", "back"]);
    var corner_RUF = new corner(this.r, ["right", "up", "front"]);
    var corner_RUB = new corner(this.r, ["right", "up", "back"]);
    var corner_LDF = new corner(this.r, ["left", "down", "front"]);
    var corner_LDB = new corner(this.r, ["left", "down", "back"]);
    var corner_LUF = new corner(this.r, ["left", "up", "front"]);
    var corner_LUB = new corner(this.r, ["left", "up", "back"]);

    var center_R = new center(this.r, "right");
    var center_L = new center(this.r, "left");
    var center_U = new center(this.r, "up");
    var center_D = new center(this.r, "down");
    var center_F = new center(this.r, "front");
    var center_B = new center(this.r, "back");

    corners = {
        corner_RDF,
        corner_RDB,
        corner_RUF,
        corner_RUB,
        corner_LDF,
        corner_LDB,
        corner_LUF,
        corner_LUB
    };
    centers = {};
    sides = {};


    array_corner.push(corner_RDF, corner_RDB, corner_RUF, corner_RUB, corner_LDF, corner_LDB, corner_LUF, corner_LUB);

    this.display = function(faceToRotate, angle){
        switch(faceToRotate)
        {
            case "right":
                push();
                rotateX(angle);
                center_R.display();
                corner_RDB.display();
                corner_RDF.display();
                corner_RUB.display();
                corner_RUF.display();
                pop();
                center_L.display();
                center_U.display();
                center_D.display();
                center_F.display();
                center_B.display();
                corner_LDB.display();
                corner_LDF.display();
                corner_LUB.display();
                corner_LUF.display();
                break;
            case "left":
                push();
                rotateX(-angle);
                center_L.display();
                corner_LDB.display();
                corner_LDF.display();
                corner_LUB.display();
                corner_LUF.display();
                pop();
                center_R.display();
                center_U.display();
                center_D.display();
                center_F.display();
                center_B.display();
                corner_RDB.display();
                corner_RDF.display();
                corner_RUB.display();
                corner_RUF.display();
                break;
            case "down":
                push();
                rotateY(angle);
                center_D.display();
                corner_RDB.display();
                corner_RDF.display();
                corner_LDB.display();
                corner_LDF.display();
                pop();
                center_R.display();
                center_U.display();
                center_L.display();
                center_F.display();
                center_B.display();
                corner_RUB.display();
                corner_RUF.display();
                corner_LUB.display();
                corner_LUF.display();
                break;
            case "up":
                push();
                rotateY(-angle);
                center_U.display();
                corner_RUB.display();
                corner_RUF.display();
                corner_LUB.display();
                corner_LUF.display();
                pop();
                center_R.display();
                center_D.display();
                center_L.display();
                center_F.display();
                center_B.display();
                corner_RDB.display();
                corner_RDF.display();
                corner_LDB.display();
                corner_LDF.display();
                break;
            case "front":
                push();
                rotateZ(angle);
                center_F.display();
                corner_RDF.display();
                corner_RUF.display();
                corner_LDF.display();
                corner_LUF.display();
                pop();
                center_R.display();
                center_D.display();
                center_L.display();
                center_U.display();
                center_B.display();
                corner_RDB.display();
                corner_RUB.display();
                corner_LDB.display();
                corner_LUB.display();
                break;
            case "back":
                push();
                rotateZ(-angle);
                center_B.display();
                corner_RDB.display();
                corner_RUB.display();
                corner_LDB.display();
                corner_LUB.display();
                pop();
                center_R.display();
                center_D.display();
                center_L.display();
                center_U.display();
                center_F.display();
                corner_RDF.display();
                corner_RUF.display();
                corner_LDF.display();
                corner_LUF.display();
                break;
            default :
                center_B.display();
                center_R.display();
                center_D.display();
                center_L.display();
                center_U.display();
                center_F.display();
                corner_RDB.display();
                corner_RDF.display();
                corner_RUB.display();
                corner_RUF.display();
                corner_LDB.display();
                corner_LDF.display();
                corner_LUB.display();
                corner_LUF.display();
        }
    }

    this.executeRotation = function(faceToRotate, clockwise)
    {

    }

    this.move = function(direction)
    {

    }
}