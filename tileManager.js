/*******************************************************************************
* Title: Tile Manager                                                          *
* Desc: Manages the tile placements and game grid for its grid                 *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 21, 2020                                                    *
* Last Updated: June 21, 2020                                                  *
********************************************************************************/


//////////////////////////////////////////////////////////////////////////////////
// @Name:   Tile Manager                                                        //
// @Type:   class                                                               //
// @Desc:   the manager for tiles used in the game                              //
// @param:  <<string:image> map> tile_images:    mapping of image objects       //
//          <GameGrid>           game_grid:      grid object used for           //
//                                                  canvas-wide grid            //
//          <<int:string>> map>  value_mapping:  map of each cell's image       //
// @Functions:                                                                  //
// @Variables:                                                                  //
//          <<string:image> map> tile_images:    mapping of image objects       //
//          <GameGrid>          game_grid: grid object used for canvas-wide grid//
//          <<int:string>> map>  value_mapping:  map of each cell's image       //
//////////////////////////////////////////////////////////////////////////////////
class TileManager
{
    constructor(tile_images, game_grid, value_mapping)
    {
        this.tile_images = tile_images;
        this.game_grid = game_grid;
        this.value_mapping = value_mapping;
    }


    // @Name:   draw
    // @Type:   function
    // @Desc:   draws the game tiles to the canvas
    // @param:  none
    // @return: none
    draw()
    {
        for (var i = 0; i < this.game_grid.ver_count; i++)
        {
            for (var j = 0; j < this.game_grid.hor_count; j++)
            {
                var specific_value_mapping = this.value_mapping[i];
                
                if (this.value_mapping[i].length == 1)
                {
                    tile_call = 0;
                    specific_value_mapping = value_mapping[i];
                }
                if (specific_value_mapping != "empty")
                {
                    image(this.tile_images[specific_value_mapping], 
                            this.game_grid.getXPos(j), 
                            this.game_grid.getYPos(i),
                            40, 40);
                }
            }
        }
        if (this.game_grid.view_outlines)
        {
            this.game_grid.draw();
        }
        // this.game_grid.draw();
        if (this.game_grid.view_vertical_line)
        {
            this.game_grid.drawVerticalCenterLine();
        }
        // Draw any tile under the mouse that is meant to be drawn
        if (!(this.game_grid.getTileHorFromXPos(input_manager.GetMouseX()) === undefined) && !(this.game_grid.getTileVertFromYPos(input_manager.GetMouseY()) === undefined))
        {
            image(this.tile_images["grass_0"], 
                this.game_grid.getXPos(this.game_grid.getTileHorFromXPos(input_manager.GetMouseX())), 
                this.game_grid.getYPos(this.game_grid.getTileVertFromYPos(input_manager.GetMouseY())),
                40, 40);
        }
    }
}