cube = function ()
{
    this.r = 50;

    this.face1 = new face();
    this.face2 = new face();
    this.face3 = new face();
    this.face4 = new face();
    this.face5 = new face();
    this.face6 = new face();

    this.face1.r = this.r;

    this.setColor = function (color1, color2, color3, color4, color5, color6)
    {
        this.face1.color = color1;
        this.face2.color = color2;
        this.face3.color = color3;
        this.face4.color = color4;
        this.face5.color = color5;
        this.face6.color = color6;
    }

    //this.face1.color = red;

    this.display = function()
    {
        push();
        translate(0, 0, this.r / 2);
        this.face1.display();
        pop();
        push()
        translate(0, 0, -1 * this.r / 2);
        this.face2.display();
        pop();
        push();
        rotateX(PI/2);
        translate(0, 0, this.r / 2);
        this.face3.display();
        pop();
    }
}