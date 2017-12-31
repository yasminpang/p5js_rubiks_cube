class Sticker
{
    constructor(dimension, pos){
        this.dimension = dimension;
        this.pos = pos;
    }
    
    display(color)
    {
        push();
        if(this.pos == "right")
        {
            rotateY(PI/2);
        }
        if(this.pos == "left")
        {
            rotateY(-PI/2);
        }
        if(this.pos == "up")
        {
            rotateX(PI/2);
        }
        if(this.pos == "down")
        {
            rotateX(-PI/2);
        }
        if(this.pos == "back")
        {
            rotateY(PI);
        }

        fill(color.red, color.green, color.blue);
        translate(0, 0, this.dimension / 2)
        plane(this.dimension - 5, this.dimension - 5);
        pop();
    }
}