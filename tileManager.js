/*******************************************************************************
* Title: Tile Manager                                                          *
* Desc: Manages the tile placements and game grid for its grid                 *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 21, 2020                                                    *
* Last Updated: January 9th, 2023                                              *
********************************************************************************/


//////////////////////////////////////////////////////////////////////////////////////
// @Name:   Tile Manager                                                            //
// @Type:   class                                                                   //
// @Desc:   the manager for tiles used in the game                                  //
//                                                                                  //
// @param:                                                                          //
//          <<string:image> map> tile_images:        mapping of image objects       //
//          <<string:Tile> map>  tile_types:         info of available tiles        //
//          <GameGrid>           game_grid:          grid object used for game map  //
//                                                      section of canvas           //
//          <GameGrid>           ui_grid:            grid object used for ui        //
//                                                      section of the canvas       //
//          <<int:string>> map>  game_value_mapping: map of each cell's image for   //
//                                                      the game_grid               //
//          <<int:string>> map>  ui_value_mapping:   map of each cell's image for   //
//                                                      the ui_grid                 //
// @Functions:                                                                      //
//          draw():                                                                 //
//              params:     none                                                    //
//              returnType: none                                                    //
//          addPlacedTile():                                                        //
//              params:     none                                                    //
//              returnType: none                                                    //
//                                                                                  //
// @Variables:                                                                      //
//          <<string:image> map> tile_images:        mapping of image objects       //
//          <<string:Tile> map>  tile_types:         info of available tiles        //
//          <GameGrid>           game_grid:          grid object used for game map  //
//                                                      section of canvas           //
//          <GameGrid>           ui_grid:            grid object used for ui        //
//                                                      section of the canvas       //
//          <<int:string>> map>  game_value_mapping: map of each cell's image for   //
//                                                      the game_grid               //
//          <<int:string>> map>  ui_value_mapping:   map of each cell's image for   //
//                                                      the ui_grid                 //
//          <string>             chosen_block:       block that would be placed on  //
//                                                      game_grid once clicked      //
//////////////////////////////////////////////////////////////////////////////////////
class TileManager {
    constructor(tile_images, tile_types, game_grid, ui_grid, game_value_mapping, ui_value_mapping) {
        this.tile_images = tile_images;
        this.tile_types = tile_types;
        this.game_grid = game_grid;
        this.ui_grid = ui_grid;
        this.game_value_mapping = game_value_mapping;
        this.ui_value_mapping = ui_value_mapping;
        this.chosen_block = "wood_0";
    }


    // @Name:   draw
    // @Type:   function
    // @Desc:   draws the game tiles to the canvas
    // @param:  none
    // @return: none
    draw() {
        // Game Grid
        for (var i = 0; i < this.game_grid.ver_count; i++) {
            for (var j = 0; j < this.game_grid.hor_count; j++) {
                var specific_value_mapping = this.game_value_mapping[i][j];
                if (specific_value_mapping != "empty") {
                    image(this.tile_images[specific_value_mapping],
                        this.game_grid.getXPos(j),
                        this.game_grid.getYPos(i),
                        40, 40);
                }
            }
        }

        // UI Grid
        for (var i = 0; i < this.ui_grid.ver_count; i++) {
            for (var j = 0; j < this.ui_grid.hor_count; j++) {
                var specific_value_mapping = this.ui_value_mapping[i][j];
                if (specific_value_mapping != "empty") {
                    image(this.tile_images[specific_value_mapping],
                        this.ui_grid.getXPos(j),
                        this.ui_grid.getYPos(i),
                        50, 50);
                }
            }
        }

        if (this.game_grid.view_outlines) {
            this.game_grid.draw();
        }

        if (this.game_grid.view_vertical_line) {
            this.game_grid.drawVerticalCenterLine();
        }

        // UI Grid
        if (this.ui_grid.view_outlines) {
            this.ui_grid.draw();
        }

        // Draw any tile under the mouse that is meant to be drawn
        if (!(this.game_grid.getTileHorFromXPos(input_manager.GetMouseX()) === undefined) && !(this.game_grid.getTileVertFromYPos(input_manager.GetMouseY()) === undefined)) {
            image(this.tile_images[this.chosen_block],
                this.game_grid.getXPos(this.game_grid.getTileHorFromXPos(input_manager.GetMouseX())),
                this.game_grid.getYPos(this.game_grid.getTileVertFromYPos(input_manager.GetMouseY())),
                40, 40);
        }
        else if (!(this.ui_grid.getTileHorFromXPos(input_manager.GetMouseX()) === undefined) && !(this.ui_grid.getTileVertFromYPos(input_manager.GetMouseY()) === undefined)) {
            image(this.tile_images["highlight_0"],
                this.ui_grid.getXPos(this.ui_grid.getTileHorFromXPos(input_manager.GetMouseX())),
                this.ui_grid.getYPos(this.ui_grid.getTileVertFromYPos(input_manager.GetMouseY())),
                50, 50);
        }
    }


    // @Name:   addPlacedTile
    // @Type:   function
    // @Desc:   adds tile to game board or chooses selected tile to place depending on mouse position
    // @param:  none
    // @return: none
    addPlacedTile() {
        if (!(this.game_grid.getTileHorFromXPos(input_manager.GetMouseX()) === undefined) && !(this.game_grid.getTileVertFromYPos(input_manager.GetMouseY()) === undefined)) {
            var mouse_y = this.game_grid.getTileVertFromYPos(input_manager.GetMouseY())
            var mouse_x = this.game_grid.getTileHorFromXPos(input_manager.GetMouseX())
            if (this.tile_types[this.game_value_mapping[mouse_y][mouse_x]].isOverwriteable() == 1) {
                this.game_value_mapping[mouse_y][mouse_x] = this.chosen_block;
            }
        }
        else if (!(this.ui_grid.getTileHorFromXPos(input_manager.GetMouseX()) === undefined) && !(this.ui_grid.getTileVertFromYPos(input_manager.GetMouseY()) === undefined)) {
            this.chosen_block = this.ui_value_mapping[this.ui_grid.getTileVertFromYPos(input_manager.GetMouseY())][this.ui_grid.getTileHorFromXPos(input_manager.GetMouseX())];
        }
    }
}