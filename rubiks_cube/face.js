face = function(dimension, pos, color)
{
    //position can be 
    //right, left, up, down, front, back 
    this.pos = pos;
    
    //rightColor, leftColor, upColor, downColor, frontColor, backColor
    this.color = color;

    //dimension of the face.
    this.r = dimension;

    this.display = function()
    {
        push();
        if(pos == "right")
        {
            rotateY(PI/2);
        }
        if(pos == "left")
        {
            rotateY(-PI/2);
        }
        if(pos == "up")
        {
            rotateX(PI/2);
        }
        if(pos == "down")
        {
            rotateX(-PI/2);
        }
        if(pos == "back")
        {
            rotateY(PI);
        }

        fill(25, 25, 25);
        box(this.r - 1, this.r - 1, this.r - 1);

        fill(this.color.red, this.color.green, this.color.blue);
        translate(0, 0, this.r / 2)
        plane(this.r - 3, this.r - 3);
        //translate(0, 0, -this.r);
        //plane(this.r, this.r);
        pop();
    }
}