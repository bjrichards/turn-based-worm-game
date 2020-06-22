/*******************************************************************************
* Title: Game Grid Manager                                                     *
* Desc: Controls a grid and its contents                                       *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 21, 2020                                                    *
* Last Updated: June 21, 2020                                                  *
********************************************************************************/


//////////////////////////////////////////////////////////////////////////////////////
// @Name:   GameGrid                                                                //
// @Type:   class                                                                   //
// @Desc:   the grid object for the canvas (used for tiles)                         //
// @param:  <int> vertical_count:   number of tiles vertically                      //
//          <int> horizontal_count: number of tiles horizontally                    //
//          <int> cell_height:      height of cell                                  //
//          <int> cell_width:       width of cell                                   //
//          <int> xpos:             leftmost position of the datagrid               //
//          <int> ypos:             topmost position of the datagrid                //
//          <int> color:            grayscale color value between 0 and 255         //
// @Functions:                                                                      //
//          draw()                                                                  //
//              returnType: none                                                    //
//          getXPos()                                                               //
//              returnType: int                                                     //
//          getYPos()                                                               //
//              returnType: int                                                     //
// @Variables:                                                                      //
//          <int>   ver_count:          number of tiles vertically                  //
//          <int>   hor_count:          number of tiles horizontally                //
//          <int>   cell_height:        height of individual cell                   //
//          <int>   cell_width:         width of individual cell                    //
//          <int>   x_pos:              leftmost position of the datagrid           //
//          <int>   y_pos:              topmost position of the datagrid            //
//          <int>   color:              grayscale color value betwween 0 and 255    //
//          <bool>  view_outlines:      whether or not grid cell outlines should    //
//                                      be drawn                                    //
//          <bool>  view_vertical_line: whether or not the vertical split line      //
//                                      should be drawn                             //
//////////////////////////////////////////////////////////////////////////////////////
class GameGrid
{
    constructor(vertical_count, horizontal_count, cell_height, cell_width, xpos, ypos, color)
    {
        this.ver_count = vertical_count;
        this.hor_count = horizontal_count;
        this.cell_height = cell_height;
        this.cell_width = cell_width;
        this.x_pos = xpos;
        this.y_pos = ypos;
        this.color = color;

        this.view_outlines = false;
        this.view_vertical_line = true;
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
                    quad(this.x_pos+i*this.cell_width, this.y_pos+j*this.cell_height,
                        this.x_pos+i*this.cell_width + this.cell_width, this.y_pos+j*this.cell_height,
                        this.x_pos+i*this.cell_width + this.cell_width, this.y_pos+j*this.cell_height + this.cell_height,
                        this.x_pos+i*this.cell_width, this.y_pos+j*this.cell_height + this.cell_height);
                }
            }
        }
    }

    drawVerticalCenterLine()
    {
        for (var i = 0; i < this.hor_count; i++)
            {
                for (var j = 0; j < this.ver_count; j++)
                {
                    // Draw center vertical line in canvas
                    if (i == (this.hor_count/2) )
                    {
                        stroke(0);
                        strokeWeight(4);
                        line(this.x_pos+i*this.cell_width, this.y_pos+j*this.cell_height,
                            this.x_pos+i*this.cell_width, this.y_pos+j*this.cell_height + this.cell_height)
                        stroke(255);
                        strokeWeight(1);
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
        return (hor_tile * this.cell_width + this.x_pos)
    }


    // @Name:   getYPos
    // @Type:   function
    // @Desc:   returns the top y position of a tile
    // @param:  <int> ver_tile: the vertical tile between 0 - this.hor_count to return the position of 
    // @return: <int>: top y position of tile within canvas
    getYPos(ver_tile)
    {
        return (ver_tile * this.cell_height + this.y_pos)
    }


    // @Name:   getTileHorFromXPos
    // @Type:   function
    // @Desc:   returns the horizontal tile position (0-...) based on an x position given
    // @param:  <float> pos: a float position on a datagrid 
    // @return: <int>: the integer number of the horizontal position of the tile the provided
    //                  pos is on
    getTileHorFromXPos(pos)
    {
        for (var i = 0; i < this.hor_count; i++)
        {
            if (pos <= (this.x_pos + i * (this.cell_width) + this.cell_width) && pos > (this.x_pos + i * (this.cell_width)))
            {
                return i;
            }
        }
        return;     
    }


    // @Name:   getTileVertFromXPos
    // @Type:   function
    // @Desc:   returns the vertical tile position (0-...) based on an y position given
    // @param:  <float> pos: a float position on a datagrid 
    // @return: <int>: the integer number of the vertical position of the tile the provided
    //                  pos is on
    getTileVertFromYPos(pos)
    {
        for (var i = 0; i < this.ver_count; i++)
        {
            if (pos <= (this.y_pos + i * (this.cell_height) + this.cell_height) && pos > (this.y_pos + i * (this.cell_height)))
            {
                return i;
            }
        }
        return;
    }
}