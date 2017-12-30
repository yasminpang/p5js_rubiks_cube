face = function(dimension, pos)
{
    this.display = function(color)
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

        fill(color.red, color.green, color.blue);
        translate(0, 0, dimension / 2)
        plane(dimension - 3, dimension - 3);
        pop();
    }
}