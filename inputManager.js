/*******************************************************************************
* Title: Input Manager                                                         *
* Desc: Controls the input for the game (keyboard + mouse)                     *
* Created by: Braeden Jeffrey Richards                                         *
* Created on: June 20, 2020                                                    *
* Last Updated: June 20, 2020                                                  *
********************************************************************************/


//////////////////////////////////////////////////////////////////////////////////
// @Name:   InputManager                                                        //
// @Type:   class                                                               //
// @Desc:   the grid object for the canvas (used for tiles)                     //
// @param:  <int> vertical_count:   number of tiles vertically                  //
// @Functions:                                                                  //
// @Variables:                                                                  //
//////////////////////////////////////////////////////////////////////////////////
class InputManager
{
    constructor()
    {

    }

    KeyPressed(keyCode)
    {
        // 'g'
        if (keyCode == '71')
        {
            tile_manager.game_grid.view_outlines = !tile_manager.game_grid.view_outlines;
        }
        // 'v'
        else if (keyCode == '86')
        {
            tile_manager.game_grid.view_vertical_line = !tile_manager.game_grid.view_vertical_line;
        }
    }

    KeyReleased(keyCode)
    {

    }

    GetMouseX()
    {
        return mouseX;
    }

    GetMouseY()
    {
        return mouseY;
    }

}


// @Name:   keyPressed
// @Type:   function
// @Desc:   checks for which key was pressed and changes values accordingly
// @param:  none
// @return: none
function keyPressed()
{
    input_manager.KeyPressed(keyCode);
}


// @Name:   keyReleased
// @Type:   function
// @Desc:   checks for which key as released and changes values accordingly
// @param:  none
// @return: none
function keyReleased()
{
    input_manager.KeyReleased(keyCode);
}