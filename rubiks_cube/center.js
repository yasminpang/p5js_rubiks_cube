center = function(dimension, pos)
{
    this.color = {};
    //this.pos = pos;
    var translateX = 0;
    var translateY = 0;
    var translateZ = 0;

    switch(pos) {
        case "right":
            translateX = dimension;
            this.color = rightColor;
            break;
        case "left":
            translateX = -dimension;
            this.color = leftColor;
            break;
        case "up":
            translateY = -dimension;
            this.color = upColor;
            break;
        case "down":
            translateY = dimension;
            this.color = downColor;
            break;
        case "front":
            translateZ = dimension;
            this.color = frontColor;
            break;
        case "back":
            translateZ = -dimension;
            this.color = backColor;
            break;
    }

    this.face = new face(dimension, pos);

    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        this.face.display(this.color);
        pop();
    }
}