
const $ = _ => document.querySelector(_)

/* texture from https://opengameart.org/content/isometric-landscape */
const texture = new Image()
texture.src = "textures/01_130x66_130x230.png"
// texture.src = "textures/01_130x66_130x230 copy.png"
texture.onload = _ => init()

let map = [];

// null = any
/**
tl  tr
 \ /
  x
 / \
bl  br
**/
let openPaths = [];
// [tl, tr, br, bl]
openPaths[0]  = [0,0,0,0];
openPaths[1]  = [0,0,0,0];
openPaths[2]  = [1,0,1,0];
openPaths[2]  = [1,0,1,0];
openPaths[3]  = [0,1,0,1];
openPaths[4]  = [0,1,0,1];
openPaths[5]  = [1,0,1,0];
openPaths[6]  = [0,1,0,1];
openPaths[7]  = [1,0,1,0];
openPaths[8]  = [1,1,1,1];
openPaths[9]  = [1,1,1,1];
openPaths[10] = [0,1,0,1];
openPaths[11] = [1,0,1,0];
openPaths[12] = [1,0,1,0];
openPaths[13] = [1,0,1,0];
openPaths[14] = [0,1,0,1];
openPaths[15] = [0,1,0,1];
openPaths[16] = [0,1,0,0];
openPaths[17] = [0,0,1,0];
openPaths[18] = [1,0,0,0];
openPaths[19] = [0,0,0,1];
openPaths[20] = [0,1,0.5,1];
openPaths[21] = [0.5,1,0,1];
openPaths[22] = [1,0.5,1,0];
openPaths[23] = [1,0,1,0.5];
openPaths[24] = [0,0.5,0,0.5];
openPaths[25] = [0.5,0,0.5,0];
openPaths[26] = [0,0.5,0.5,0];
openPaths[27] = [0.5,0,0,0.5];
openPaths[28] = [0,0,0.5,0.5];
openPaths[29] = [0.5,0.5,0,0];
openPaths[30] = [0,0,0.5,0];
openPaths[31] = [0.5,0,0,0];
openPaths[32] = [0,0.5,0,0];
openPaths[33] = [0,0,0,0.5];
openPaths[34] = [0,0,0,1];
openPaths[35] = [0,1,0,0];
openPaths[36] = [0,0,1,0];
openPaths[37] = [1,0,0,0];
openPaths[38] = [0,1,1,0];
openPaths[39] = [1,0,0,1];
openPaths[40] = [1,1,0,0];
openPaths[41] = [0,0,1,1];
openPaths[42] = [0,0,0,0];
openPaths[43] = [0,0,0,0];
openPaths[44] = [0,0,0,0];
openPaths[45] = [0,0,0,0];
openPaths[46] = [0,0,0,0];
openPaths[47] = [0,0,0,0];
openPaths[48] = [0,2,0,0];
openPaths[49] = [0,2,0,2];
openPaths[50] = [0,0,0,2];
openPaths[51] = [0,0,2,0];
openPaths[52] = [2,0,2,0];
openPaths[53] = [2,0,0,0];
openPaths[54] = [0,0,0,0];
openPaths[55] = [0,0,0,0];
openPaths[56] = [0,0,0,0];
openPaths[57] = [0,0,0,0];
openPaths[58] = [0,0,0,0];
openPaths[59] = [0,0,0,0];
openPaths[60] = [0,0,0,0];
openPaths[61] = [0,0,0,0];
openPaths[62] = [0,0,0,0];
openPaths[63] = [0,0,0,0];
openPaths[64] = [0,0,0,0];
openPaths[65] = [0,0,0,0];
openPaths[66] = [0,0,0,0];
openPaths[67] = [0,0,0,0];
openPaths[68] = [0,0,0,0];
openPaths[69] = [0,0,0,0];
openPaths[70] = [0,0,0,0];
openPaths[71] = [0,0,0,0];


let first = 8;

class Tile {
    constructor(num) {
        this.num = num;
        this.openPath = openPaths[num];
    }

    get row() {
        return Math.floor(this.num/12);
    }

    get column() {
        return this.num % 12;
    }
}

class Map {
    constructor() {
        this.canvas = $("#bg");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.delta = 0;
        this.map = [];
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.bg = this.canvas.getContext("2d");
        this.ntiles = 20;
        this.firstI=-10;
        this.firstJ=-10;
        this.lastI=this.ntiles;
        this.lastJ=this.ntiles;
        this.tileWidth = 128;
        this.tileHeight = 64;
        this.bg.translate(this.canvasWidth/2,0);
    }

    draw() {
        // Store the current transformation matrix
        this.bg.save();
        this.bg.setTransform(1, 0, 0, 1, 0, 0);
        this.bg.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        this.bg.restore();

        for(let i = this.firstI; i < this.lastI; i++){
            for(let j = this.firstJ; j < this.lastJ; j++){
                if (!this.map[i]) {
                    this.map[i] = [];
                }
                if (!this.map[i][j]) {
                    this.map[i][j] = this.getTile(i,j);
                }
                this.drawImageTile(this.bg,i,j,this.map[i][j]);
            }
        }
    }

    getTile(i, j) {
        let toTheTopLeft = this.map[i][j-1];
        if (!this.map[i-1]) {
            this.map[i-1]= [];
        }
        let toTheTopRight = this.map[i-1][j];
        if (toTheTopLeft === undefined) { toTheTopLeft = new Tile(2); }
        if (toTheTopRight === undefined) {toTheTopRight = new Tile(0); }

        let candidates = [];

        if (!toTheTopLeft.openPath || !toTheTopRight.openPath) {
        }
        let br = toTheTopLeft.openPath[2];
        let bl = toTheTopRight.openPath[3];
        openPaths.forEach((tile, index) => {
            if (br === tile[0] && bl === tile[1]) {
                candidates.push(index);
            }
        });

        if (!candidates.length) {
            candidates.push(0);
        }
        const num = candidates[between(0, candidates.length)];
        return new Tile(num);
    }

    // check x-1 for one back (right)
    // check y-1 for one left
    drawImageTile (c,i,j,tile) {
        c.save();
        c.translate(+this.delta+(j-i) * this.tileWidth/2,-(this.delta/2)+(i+j)*this.tileHeight/2);
        c.drawImage(texture,tile.column * 130,tile.row * 230,130,230,-65,-130,130,230);
        c.restore();
    }
}

const init = () => {
    map = new Map();
	map.draw();
	window.requestAnimationFrame(redraw);
    function redraw() {
        // track delta better with time
        map.delta += 1;
        if (map.delta%50===0) {
            map.lastI+=1;
        }
        map.draw();
        window.requestAnimationFrame(redraw);
    }
}



/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}


