corner = function(dimension, pos)
{
    this.face = {};
    //this.color = {};
    var translateX = 0;
    var translateY = 0;
    var translateZ = 0;

    if(pos[0] === "right")
    {
        translateX = dimension;
        this.face.right = {};
        this.face.right.position = new face(dimension, "right");
        this.face.right.color = rightColor;
    }
    else if(pos[0] === "left")
    {
        translateX = -dimension;
        this.face.left = {};
        this.face.left.position = new face(dimension, "left");
        this.face.left.color = leftColor;
    }
    if(pos[1] === "down")
    {
        translateY = dimension;
        this.face.down = {};
        this.face.down.position = new face(dimension, "down");
        this.face.down.color = downColor;
    }
    else if(pos[1] === "up")
    {
        translateY = -dimension;
        this.face.up = {};
        this.face.up.position = new face(dimension, "up");
        this.face.up.color = upColor;
    }
    if(pos[2] === "front")
    {
        translateZ = dimension;
        this.face.front = {};
        this.face.front.position = new face(dimension, "front");
        this.face.front.color = frontColor;
    }
    else if(pos[2] === "back")
    {
        translateZ = -dimension;
        this.face.back = {};
        this.face.back.position = new face(dimension, "back");
        this.face.back.color = backColor;
    }

    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        for (var key in this.face) {
            // skip loop if the property is from prototype
            if (!this.face.hasOwnProperty(key)) continue;
        
            var obj = this.face[key];
            obj.position.display(obj.color);
        }
        pop();
    }
}