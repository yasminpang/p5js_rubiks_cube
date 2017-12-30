corner = function(dimension, pos)
{
    this.position = {
        right : null,
        left : null,
        up : null,
        down : null,
        front : null,
        back : null
    };

    this.color = {        
        right : null,
        left : null,
        up : null,
        down : null,
        front : null,
        back : null
    };

    this.nextColor = {
        right : null,
        left : null,
        up : null,
        down : null,
        front : null,
        back : null
    }

    this.face = {
        right : null,
        left : null,
        up : null,
        down : null,
        front : null,
        back : null
    };

    this.translate = {
        right : 0,
        left : 0,
        up : 0,
        down : 0,
        front : 0,
        back : 0
    }

    //Setup positions and colors of faces
    var arrayLength = pos.length;
    for (var i = 0; i < arrayLength; i++) {
        this.position[pos[i]] = pos[i]; //test
        this.face[pos[i]] = new face(dimension, pos[i]);
        this.color[pos[i]] = pos[i];
        this.translate[pos[i]] = dimension;
    }
    
    var translateX = this.translate.right - this.translate.left;
    var translateY = this.translate.down - this.translate.up;
    var translateZ = this.translate.front - this.translate.back;


    //display the corner
    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
        
        //draw black box
        fill(40, 40, 40);
        box(dimension - 3, dimension - 3, dimension - 3);

        //draw faces of the corner 
        for (var key in this.face) {
            // skip loop if the property is from prototype
            if (!this.face.hasOwnProperty(key)) continue;
        
            if(this.face[key]){
                var obj = this.face[key];
                obj.display(colors[this.color[key]]);
            }
        }
        pop();
    }
}