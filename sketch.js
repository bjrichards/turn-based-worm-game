/*******************************************************************************
* Title: Project Magic Worms?                                                  *
* Desc: In-browser turn-based multiplayer game where each player takes turn    *
*           damaging eachother or building up their defenses                   *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 18, 2020                                                    *
* Last Updated: June 19, 2020                                                  *
********************************************************************************/

// Global variables
let player_1;           // Temp calling of player 1
let cell_width = 26;    // Width of each cell
let cell_height = 26;   // height of each cell
let canvas_width = 832; // width of canvas
let canvas_height = 832;// height of canvas
let ground_0;           // Temp calling of img object
let grass_0;            // Temp calling of img object

// @Name:   preload
// @Type:   function
// @Desc:   loads the images before game start
// @param:  none
// @return: none
function preload() {
  ground_0 = loadImage('img/ground_tile_0.png');
  grass_0 = loadImage('img/grass_tile_0.png');
}

// @Name:   setup
// @Type:   function
// @Desc:   initial setup before first frame of game
// @param:  none
// @return: none
function setup() {
    createCanvas(canvas_width, canvas_height);
    game_grid = new GameGrid(canvas_width/cell_width, canvas_height/cell_height, cell_width, cell_height, 200);
    for (var i = 0; i < 25; i++)
    {
        image(grass_0, game_grid.getXPos(i), game_grid.getYPos(23));
    }
    for (var i = 0; i < 25; i++)
    {
        image(ground_0, game_grid.getXPos(i), game_grid.getYPos(24));
    }
    player_1 = new Player(250, 250, new Rectangle(100, 50), 100);
}

// @Name:   draw
// @Type:   function
// @Desc:   draws the images to the canvas
// @param:  none
// @return: none
function draw() {
    background(230);
    game_grid.draw();
    for (var i = 0; i < canvas_width/cell_width; i++)
    {
        image(grass_0, game_grid.getXPos(i), game_grid.getYPos(canvas_height/cell_height-2));
    }
    for (var i = 0; i < canvas_width/cell_width; i++)
    {
        image(ground_0, game_grid.getXPos(i), game_grid.getYPos(canvas_height/cell_height-1));
    }
    // player_1.draw();
}

// @Name:   keyPressed
// @Type:   function
// @Desc:   checks for which key was pressed and changes values accordingly
// @param:  none
// @return: none
function keyPressed()
{
    // If g is pressed
    if (keyCode == '71')
    {
        console.log("Grid is shown");
        game_grid.view_outlines = false;
    }
}

// @Name:   keyReleased
// @Type:   function
// @Desc:   checks for which key as released and changes values accordingly
// @param:  none
// @return: none
function keyReleased()
{
    // If g is released
    if (keyCode == '71')
    {
        console.log("Grid is hidden");
        game_grid.view_outlines = true;
    }
}

// @Name:   Rectangle
// @Type:   class
// @Desc:   primitive shape
// @param:  <int>   height: height of rectangle
//          <int>   width: width of rectangle
// @return: none
class Rectangle 
{
    constructor(height, width) 
    {
        this.height = height;
        this.width = width;
    }

    draw(pos_x, pos_y)
    {
        quad(pos_x, pos_y, pos_x + this.width, pos_y, pos_x + this.width, pos_y+ this.height, pos_x, pos_y + this.height );
    }
}

//////////////////////////////////////////////////////////////////////////////////
// @Name:   Player                                                              //
// @Type:   class                                                               //
// @Desc:   object containing player information                                //
// @param:  <int>   x:      x tile pos the player is in                         //
//          <int>   y:      y tile pos the player is in                         //
//          <shape> shape:  the shape object the player is represented by       //
//          <int>   color: grayscale color value between 0 and 255              //
// @Functions:                                                                  //
//          draw()                                                              //
//              returnType: none                                                //
// @Variables:                                                                  //
//          <int>   pos_x:  x tile pos the player is in                         //
//          <int>   pos_y:  y tile pos the player is in                         //
//          <shape> shape:  shape object the player is represented by           //
//          <int>   color: grayscale color value betwewen 0 and 255             //
//////////////////////////////////////////////////////////////////////////////////
class Player
{
    constructor(x, y, shape, color)
    {
        this.pos_x = x;
        this.pos_y = y;
        this.shape = shape;
        this.color = color;
    }

    // @Name:   draw
    // @Type:   function
    // @Desc:   draws the object to the canvas
    // @param:  none
    // @return: none
    draw()
    {
        fill(this.color);
        this.shape.draw(this.pos_x, this.pos_y);
    }
}

//////////////////////////////////////////////////////////////////////////////////
// @Name:   GameGrid                                                            //
// @Type:   class                                                               //
// @Desc:   the grid object for the canvas (used for tiles)                     //
// @param:  <int> vertical_count:   number of tiles vertically                  //
//          <int> horizontal_count: number of tiles horizontally                //
//          <int> cell_height:      height of cell                              //
//          <int> cell_width:       width of cell                               //
//          <int> color:            grayscale color value between 0 and 255     //
// @Functions:                                                                  //
//          draw()                                                              //
//              returnType: none                                                //
//          getXPos()                                                           //
//              returnType: int                                                 //
//          getYPos()                                                           //
//              returnType: int                                                 //
// @Variables:                                                                  //
//          <int> ver_count:    number of tiles vertically                      //
//          <int> hor_count:    number of tiles horizontally                    //
//          <int> cell_height:  height of individual cell                       //
//          <int> cell_width:   width of individual cell                        //
//          <int> color:        grayscale color value betwween 0 and 255        //
//////////////////////////////////////////////////////////////////////////////////
class GameGrid
{
    constructor(vertical_count, horizontal_count, cell_height, cell_width, color)
    {
        this.ver_count = vertical_count;
        this.hor_count = horizontal_count;
        this.cell_height = cell_height;
        this.cell_width = cell_width;
        this.color = color;

        this.view_outlines = true;
    }

    // @Name:   draw
    // @Type:   function
    // @Desc:   draws the grid to the canvas
    // @param:  none
    // @return: none
    draw()
    {
        if (this.view_outlines)
        {
            noFill();
            stroke(255);

            // Draw the quads of each cell
            for (var i = 0; i < this.hor_count; i++)
            {
                for (var j = 0; j < this.ver_count; j++)
                {
                    quad(i*this.cell_width, j*this.cell_height,
                        i*this.cell_width + this.cell_width, j*this.cell_height,
                        i*this.cell_width + this.cell_width, j*this.cell_height + this.cell_height,
                        i*this.cell_width, j*this.cell_height + this.cell_height);
                    
                    // Draw center vertical line in canvas
                    if (i == (this.hor_count/2) )
                    {
                        stroke(0);
                        strokeWeight(4);
                        line(i*this.cell_width, j*this.cell_height,
                            i*this.cell_width, j*this.cell_height + this.cell_height)
                        stroke(255);
                        strokeWeight(1);
                    }

                }
            }
        }
    }

    // @Name:   getXPos
    // @Type:   function
    // @Desc:   returns the left x position of a tile
    // @param:  <int> hor_tile: the horizontal tile between 0 - this.hor_count to return the position of 
    // @return: <int>: left x position of tile within canvas   
    getXPos(hor_tile)
    {
        return (hor_tile * this.cell_width)
    }

    // @Name:   getYPos
    // @Type:   function
    // @Desc:   returns the top y position of a tile
    // @param:  <int> ver_tile: the vertical tile between 0 - this.hor_count to return the position of 
    // @return: <int>: top y position of tile within canvas
    getYPos(ver_tile)
    {
        return (ver_tile * this.cell_height)
    }
}