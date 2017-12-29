corner = function(dimension, pos)
{
    this.position = {
        right : false,
        left : false,
        up : false,
        down : false,
        front : false,
        back : false
    };

    this.color = {        
        right : null,
        left : null,
        up : null,
        down : null,
        front : null,
        back : null
    };

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

    var arrayLength = pos.length;
    for (var i = 0; i < arrayLength; i++) {
        //alert(myStringArray[i]);
        this.position[pos[i]] = true;
        this.face[pos[i]] = new face(dimension, pos[i]);
        this.color[pos[i]] = pos[i];
        this.translate[pos[i]] = dimension;
    }
    
    var translateX = this.translate.right - this.translate.left;
    var translateY = this.translate.down - this.translate.up;
    var translateZ = this.translate.front - this.translate.back;


    this.display = function()
    {
        push();
        translate(translateX, translateY, translateZ);
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