class Cubie
{
    constructor(dimension, pos){
        this.dimension = dimension;
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
    
        this.stickers = {
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
        let arrayLength = pos.length;
        for (let i = 0; i < arrayLength; i++) {
            this.position[pos[i]] = pos[i]; //test
            this.stickers[pos[i]] = new Sticker(dimension, pos[i]);
            this.color[pos[i]] = pos[i];
            this.translate[pos[i]] = dimension;
        }
        
        this.translateX = this.translate.right - this.translate.left;
        this.translateY = this.translate.down - this.translate.up;
        this.translateZ = this.translate.front - this.translate.back;
    
    }


    //display the corner
    display()
    {
        push();
        translate(this.translateX, this.translateY, this.translateZ);
        
        //draw black box
        fill(40, 40, 40);
        box(this.dimension - 3, this.dimension - 3, this.dimension - 3);

        //draw faces of the corner 
        for (var key in this.stickers) {
            // skip loop if the property is from prototype
            if (!this.stickers.hasOwnProperty(key)) continue;
        
            if(this.stickers[key]){
                var obj = this.stickers[key];
                obj.display(colors[this.color[key]]);
            }
        }
        pop();
    }
}