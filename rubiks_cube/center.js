center = function(dimension, pos)
{
    var color;
    this.pos = pos;
    var translateX = 0;
    var translateY = 0;
    var translateZ = 0;

    switch(pos) {
        case "right":
            translateX = dimension;
            color = rightColor;
            break;
        case "left":
            translateX = -dimension;
            color = leftColor;
            break;
        case "up":
            translateY = -dimension;
            color = upColor;
            break;
        case "down":
            translateY = dimension;
            color = downColor;
            break;
        case "front":
            translateZ = dimension;
            color = frontColor;
            break;
        case "back":
            translateZ = -dimension;
            color = backColor;
            break;
    }

    this.face = new face(dimension, pos, color);

    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        this.face.display();
        pop();
    }
}