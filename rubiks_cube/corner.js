corner = function(dimension, pos)
{
    this.pos = pos;

    var translateX = (pos[0] == "right" ? dimension : -dimension);
    var translateY = (pos[1] == "down" ? dimension : -dimension);
    var translateZ = (pos[2] == "front" ? dimension : -dimension);

    this.color1 = (pos[0] == "right" ? rightColor : leftColor);
    this.color2 = (pos[1] == "down" ? downColor : upColor);
    this.color3 = (pos[2] == "front" ? frontColor : backColor);

    this.face1 = new face(dimension, pos[0], this.color1);
    this.face2 = new face(dimension, pos[1], this.color2);
    this.face3 = new face(dimension, pos[2], this.color3);

    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        this.face1.display();
        this.face2.display();
        this.face3.display();
        pop();
    }
}