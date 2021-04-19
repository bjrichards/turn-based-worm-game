/*******************************************************************************
* Title: Tile                                                                  *
* Desc: Holds the information about individual tiles                           *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: April 19, 2021                                                   *
* Last Updated: April 19 2021                                                  *
********************************************************************************/


//////////////////////////////////////////////////////////////////////////////////
// @Name:   Tile                                                                //
// @Type:   class                                                               //
// @Desc:   information on individual tiles                                     //
// @param:  <int> tile_id:      unique identifier                               //
//          <string>            tile_name:      name of the tile                //
//          <bool>              overwriteable:  if tile can be replaced with    //
//                                              another tile                    //
//          <image>             tile_image:     image used to represent tile    //
//          <string>            tile_type:      whether it is a buildable tile  //
//                                              or ui tile                      //
// @Functions:                                                                  //
// @Variables:                                                                  //
//          <int> tile_id:      unique identifier                               //
//          <string>            tile_name:      name of the tile                //
//          <bool>              overwriteable:  if tile can be replaced with    //
//                                              another tile                    //
//          <image>             tile_image:     image used to represent tile    //
//          <string>            tile_type:      whether it is a buildable tile  //
//                                              or ui tile                      //
//////////////////////////////////////////////////////////////////////////////////
class Tile
{
    constructor(tile_id, tile_name, overwriteable, tile_image, tile_type)
    {
        this.tile_id = tile_id;
        this.tile_name = tile_name;
        this.overwriteable = overwriteable;
        this.tile_image = tile_image;
        this.tile_type = tile_type;
    }
}