/*******************************************************************************
* Title: Project Magic Worms?                                                  *
* Desc: In-browser turn-based multiplayer game where each player takes turn    *
*           damaging eachother or building up their defenses                   *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 18, 2020                                                    *
* Last Updated: June 21, 2020                                                  *
********************************************************************************/

/*******************
* Global variables *
********************/
let player_1;           // Temp calling of player 1

// Gameplay Grid
let game_grid_cell_width = 40;    // Width of each cell
let game_grid_cell_height = 40;   // height of each cell
let game_grid_width = 20;
let game_grid_height = 20;

// In-Game UI Grid
let ui_grid_cell_width = 50;
let ui_grid_cell_height = 50;
let ui_grid_width = 4;
let ui_grid_height = 16;

// Other
let canvas_width = 1000; // width of canvas
let canvas_height = 800;// height of canvas
let fr = 24;            // framerate

// Managers
let tile_manager;
let input_manager;

// @Name:   preload
// @Type:   function
// @Desc:   loads the images before game start
// @param:  none
// @return: none
function preload() {
    tile_images = loadImages(Tiles);
    tile_types = loadTileTypes(Tiles);
    game_value_map = loadGameMap(tile_images, baseMap, game_grid_height, game_grid_width);
    ui_value_map = loadGameMap(tile_images, baseUI, ui_grid_height, ui_grid_width);
    game_grid = new GameGrid(game_grid_height, game_grid_width, game_grid_cell_width, game_grid_cell_height, 0, 0, 255);
    ui_grid = new GameGrid(ui_grid_height, ui_grid_width, ui_grid_cell_width, ui_grid_cell_height, 800, 0, 0);
    tile_manager = new TileManager(tile_images, tile_types, game_grid, ui_grid, game_value_map, ui_value_map);
    input_manager = new InputManager();
}


// @Name:   setup
// @Type:   function
// @Desc:   initial setup before first frame of game
// @param:  none
// @return: none
function setup() {
    frameRate(fr);
    createCanvas(canvas_width, canvas_height);
    tile_manager.draw();
}


// @Name:   draw
// @Type:   function
// @Desc:   draws the images to the canvas
// @param:  none
// @return: none
function draw() {
    background(0);
    tile_manager.draw();
}


// @Name:   loadImages
// @Type:   function
// @Desc:   loads the images into a P5.js Image object and returns map of them
// @param:  <file_path>             json_file: file path to file to read from
// @return: <<string:Image> map>    image_mapping: map of images by image name
function loadImages(json_file) {
    var image_mapping = [];
    for (var i = 0; i < json_file.length; i++) {
        if (json_file[i].name != "empty") {
            image_mapping[json_file[i].name] = loadImage(json_file[i].image);
        }
    }

    return image_mapping;
}


function loadTileTypes(json_obj) {
    var tile_types = []
    for (var i = 0; i < json_obj.length; i++) {
        if (json_obj[i].name != "empty") {
            var temp = new Tile(json_obj[i].id, json_obj[i].name, json_obj[i].overwritable, json_obj[i].image, null);
            tile_types[json_obj[i].name] = temp;
        }
    }

    return tile_types;
}


// @Name:   keyReleased
// @Type:   function
// @Desc:   Loads a game map file, consisting of tile maps, grid-tile maps, and grid
// @param:  <<string:image> map>    tile_images: map of tile names to P5.js image objects
//          <file_path>             baseMap: file path to file to read in entire map tile data
// @return: <<int:tileType> map>    game_map: map of tile type by tile position
function loadGameMap(tile_images, mappy, rows, columns) {
    var game_map = [];
    var temp = 0;
    for (var i = 0; i < rows; i++) {
        game_map[i] = [];
        for (var j = 0; j < columns; j++) {
            game_map[mappy[temp].rowNumber][mappy[temp].columnNumber] = mappy[temp].tile;
            temp = temp + 1;
        }
    }
    return game_map;
}


// @Name:   Rectangle
// @Type:   class
// @Desc:   primitive shape
// @param:  <int>   height: height of rectangle
//          <int>   width: width of rectangle
// @return: none
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    draw(pos_x, pos_y) {
        quad(pos_x, pos_y, pos_x + this.width, pos_y, pos_x + this.width, pos_y + this.height, pos_x, pos_y + this.height);
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
class Player {
    constructor(x, y, shape, color) {
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
    draw() {
        fill(this.color);
        this.shape.draw(this.pos_x, this.pos_y);
    }
}