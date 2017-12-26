side = function(dimension, pos)
{
    this.pos = pos;

    var translateX = 0;
    var translateY = 0;
    var translateZ = 0;
    
    if(pos[0] === "right")
    {
        translateX = dimension;
        this.color1 = rightColor;
        switch (pos[1])
        {
            case "down":
                translateY = dimension;
                this.color2 = downColor;
                break;
            case "up":
                translateY = -dimension;
                this.color2 = upColor;
                break;
            case "front":
                translateZ = dimension;
                this.color2 = frontColor;
                break;
            case "back":
                translateZ = -dimension;
                this.color2 = backColor;
                break;
        }
    }
    else if(pos[0] === "left")
    {
        translateX = -dimension;
        this.color1 = leftColor;
        switch (pos[1])
        {
            case "down":
                translateY = dimension;
                this.color2 = downColor;
                break;
            case "up":
                translateY = -dimension;
                this.color2 = upColor;
                break;
            case "front":
                translateZ = dimension;
                this.color2 = frontColor;
                break;
            case "back":
                translateZ = -dimension;
                this.color2 = backColor;
                break;
        }
    }
    else if(pos[0] === "down")
    {
        translateY = dimension;
        this.color1 = downColor;
        switch (pos[1])
        {
            case "front":
                translateZ = dimension;
                this.color2 = frontColor;
                break;
            case "back":
                translateZ = -dimension;
                this.color2 = backColor;
                break;
        } 
    }
    else if(pos[0] === "up")
    {
        translateY = -dimension;
        this.color1 = upColor;
        switch (pos[1])
        {
            case "front":
                translateZ = dimension;
                this.color2 = frontColor;
                break;
            case "back":
                translateZ = -dimension;
                this.color2 = backColor;
                break;
        } 
    }
    

    this.face1 = new face(dimension, pos[0], this.color1);
    this.face2 = new face(dimension, pos[1], this.color2);

    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        this.face1.display();
        this.face2.display();
        pop();
    }
}