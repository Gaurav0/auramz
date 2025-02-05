// Trilobytes - Star Knightess Aura UI menu/
// TLB_SKAUIMenu.js
//=============================================================================

window.Imported = window.Imported || {};
window.Imported.TLB_SKAUIMenu = true;

window.TLB = window.TLB || {};
TLB.SKAMenu = TLB.SKAMenu || {};

/*:
 * @target MZ
 * @base TLB_GradientTextExtensions
 * @orderAfter TLB_GradientTextExtensions
 * @plugindesc This plugin modifies the main menu of Star Knightess
 * Aura to reflect the prototypes by Yoroiookami. It is a commissioned work.
 * @url https://gitgud.io/auragamedev/auramz
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is an ad hoc plugin which modifies the base Scene_Menu to match a
 * prototype specified by the client.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 * PORTRAIT SETTINGS
 *
 * Portraits are set up as follows:
 *   Actor ID - The ID of the actor.
 *   Filename - The image to use for the portrait.
 *   Status Menu X Offset - The X offset of the portrait on the status menu.
 *   Status Menu Y Offset - The Y offset of the portrait on the status menu.
 *   Status Menu Scale - The decimal scale percentage of the portrait.
 *   Bust Source X - The X coordinate on the portrat image to start the main
 *                   menu bust slice from.
 *   Bust Source Y - The Y coordinate on the portrait image to start the main
 *                   menu bust slice from.
 *
 * All other parameters are explained in their respective description field.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Change Portrait: Change an actor's portrait image.
 * Args:
 *   Actor ID - The ID of the actor whose portrait will be changed.
 *   Filename - The image to change the portrait to.
 *   Status Menu X Offset - The X offset of the portrait on the status menu.
 *   Status Menu Y Offset - The Y offset of the portrait on the status menu.
 *   Status Menu Scale - The decimal scale percentage of the portrait.
 *   Bust Source X - The X coordinate on the portrat image to start the main
 *                   menu bust slice from.
 *   Bust Source Y - The Y coordinate on the portrait image to start the main
 *                   menu bust slice from.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * There shouldn't be any compatibility issues with non-menu plugins.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * Copyright 2022 Auradev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * ============================================================================
 *
 * @param showConditions
 * @text Show Conditions
 *
 * @param showDay
 * @parent showConditions
 * @text Show Day Condition
 * @desc The condition that must be met for day to be displayed.
 * @default true
 *
 * @param mainmenu
 * @text Main Menu Settings
 *
 * @param mainmenu_frontimage
 * @parent mainmenu
 * @text Front Image
 * @desc Image to use as the background overlay.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_BG_FRONT
 *
 * @param mainmenu_backgroundopacity
 * @parent mainmenu
 * @text Background Opacity
 * @desc Opacity of the backround image.
 * @type number
 * @max 255
 * @default 192
 *
 * @param mainmenu_commands
 * @parent mainmenu
 * @text Commands
 *
 * @param mainmenu_commands_disabled
 * @parent mainmenu_commands
 * @text Disabled
 *
 * @param mainmenu_commands_disabled_inactive_image
 * @parent mainmenu_commands_disabled
 * @text Inactive Image
 * @desc Image to use for a disabled and inactive command.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_SELECT_EMPTY_DISABLED
 *
 * @param mainmenu_commands_disabled_inactive_gradient
 * @parent mainmenu_commands_disabled
 * @text Inactive Gradient
 * @desc Gradient to use for a disabled and inactive command.
 * @default ["#32303d", "#232129", "#32303d"]
 *
 * @param mainmenu_commands_disabled_active_image
 * @parent mainmenu_commands_disabled
 * @text Active Image
 * @desc Image to use for a disabled and active command.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_SELECT_EMPTY_DISABLED_ACTIVE
 *
 * @param mainmenu_commands_disabled_active_gradient
 * @parent mainmenu_commands_disabled
 * @text Active Gradient
 * @desc Gradient to use for a disabled and active command.
 * @default ["#2c2d3e", "#373751", "#2c2d3e"]
 *
 * @param mainmenu_commands_inactive
 * @parent mainmenu_commands
 * @text Inactive
 *
 * @param mainmenu_commands_inactive_image
 * @parent mainmenu_commands_inactive
 * @text Inactive Image
 * @desc Image to use when a command is inactive.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_SELECT_EMPTY_INACTIVE
 *
 * @param mainmenu_commands_inactive_gradient
 * @parent mainmenu_commands_inactive
 * @text Gradient
 * @desc Gradient to use for an enabled and inactive command.
 * @default ["#7e7281", "#a397a7", "#7e7281"]
 *
 * @param mainmenu_commands_active
 * @parent mainmenu_commands
 * @text Active
 *
 * @param mainmenu_commands_active_image
 * @parent mainmenu_commands_active
 * @text Active Image
 * @desc Image to use when a command is active.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_SELECT_EMPTY_ACTIVE
 *
 * @param mainmenu_commands_active_gradient
 * @parent mainmenu_commands_active
 * @text Gradient
 * @desc Gradient to use for an active enabled command.
 * @default ["#ab8845", "#d8b976", "#ab8845"]
 *
 * @param mainmenu_commands_fontsize
 * @parent mainmenu_commands
 * @text Font Size
 * @desc Font size to use for commands.
 * @type number
 * @default 30
 *
 * @param mainmenu_commands_xoffset
 * @parent mainmenu_commands
 * @text X Offset
 * @desc Text X coordinate offset in relation to empty command image.
 * @type number
 * @max 1280
 * @min -1280
 * @default -10
 *
 * @param mainmenu_commands_yoffset
 * @parent mainmenu_commands
 * @text Y Offset
 * @desc Text Y coordinate offset in relation to empty command image.
 * @type number
 * @max 720
 * @min -720
 * @default 0
 *
 * @param mainmenu_commands_rotation
 * @parent mainmenu_commands
 * @text Rotation
 * @desc Text rotation in relation to empty command image.
 * @type number
 * @decimals 2
 * @max 1
 * @min -1
 * @default -0.03
 *
 * @param mainmenu_commands_itemheight
 * @parent mainmenu_commands
 * @text Item height
 * @desc Height of each command item.
 * @type number
 * @default 63
 *
 * @param mainmenu_status
 * @parent mainmenu
 * @text Status Window
 *
 * @param mainmenu_status_backgroundimage
 * @parent mainmenu_status
 * @text Background Image
 * @desc Image to use for status background.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_BG_ALTER
 *
 * @param mainmenu_status_yoffset
 * @parent mainmenu_status
 * @text Y Offset
 * @desc The Y offset for each subsequent status block.
 * @type number
 * @max 720
 * @min -720
 * @default 15
 *
 * @param mainmenu_status_maxcols
 * @parent mainmenu_status
 * @text Max Cols
 * @desc Maximum number of columns (party members) to show.
 * @type number
 * @min 1
 * @default 4
 *
 * @param mainmenu_status_name
 * @parent mainmenu_status
 * @text Name
 *
 * @param mainmenu_status_name_gradient
 * @parent mainmenu_status_name
 * @text Gradient
 * @desc Gradient to use for the actor name.
 * @default ["#da9f56", "#bc6f59"]
 *
 * @param mainmenu_status_name_fontsize
 * @parent mainmenu_status_name
 * @text Font Size
 * @desc Font size to use for names.
 * @type number
 * @default 36
 *
 * @param mainmenu_status_name_xoffset
 * @parent mainmenu_status_name
 * @text X Offset
 * @desc X coordinate offset of name in relation to parent.
 * @type number
 * @max 1280
 * @min -1280
 * @default 1
 *
 * @param mainmenu_status_name_yoffset
 * @parent mainmenu_status_name
 * @text Y Offset
 * @desc Y coordinate offset of name in relation to parent.
 * @type number
 * @max 720
 * @min -720
 * @default 8
 *
 * @param mainmenu_status_bust
 * @parent mainmenu_status
 * @text Bust
 *
 * @param mainmenu_status_bust_width
 * @parent mainmenu_status_bust
 * @text Width
 * @desc Width of the available bust area.
 * @type number
 * @max 1280
 * @default 212
 *
 * @param mainmenu_status_bust_height
 * @parent mainmenu_status_bust
 * @text Height
 * @desc Height of the available bust area.
 * @type number
 * @max 720
 * @default 330
 *
 * @param mainmenu_status_bust_xoffset
 * @parent mainmenu_status_bust
 * @text X Offset
 * @desc X coordinate offset of the bust in relation to its parent.
 * @type number
 * @max 1280
 * @min -1280
 * @default 8
 *
 * @param mainmenu_status_bust_yoffset
 * @parent mainmenu_status_bust
 * @text Y Offset
 * @desc Y coordinate offset of the bust in relation to its parent.
 * @type number
 * @max 720
 * @min -720
 * @default 60
 *
 * @param mainmenu_status_bust_scale
 * @parent mainmenu_status_bust
 * @text Bust Scale
 * @desc The decimal percentage for scaling the bust slice area.
 * @type number
 * @decimals 2
 * @max 1
 * @default 1
 *
 * @param mainmenu_status_bust_opacity
 * @parent mainmenu_status_bust
 * @text Opacity
 * @desc Initial opacity of busts.
 * @type number
 * @max 255
 * @default 180
 *
 * @param mainmenu_status_shadow
 * @parent mainmenu_status
 * @text Shadow
 *
 * @param mainmenu_status_shadow_image
 * @parent mainmenu_status_shadow
 * @text Shadow Image
 * @desc Image to use for inactive shadow.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_SHADOW
 *
 * @param mainmenu_status_shadow_xoffset
 * @parent mainmenu_status_shadow
 * @text X Offset
 * @desc X coordinate offset of shadow in relation to its parent.
 * @type number
 * @max 1280
 * @max -1280
 * @default 7
 *
 * @param mainmenu_status_shadow_yoffset
 * @parent mainmenu_status_shadow
 * @text Y Offset
 * @desc Y coordinate offset of shadow in relation to its parent.
 * @type number
 * @max 720
 * @min -720
 * @default 55
 *
 * @param mainmenu_status_shadow_opacity
 * @parent mainmenu_status_shadow
 * @text Shadow Opacity
 * @desc Opacity of the shadow image.
 * @type number
 * @max 255
 * @default 255
 *
 * @param mainmenu_status_shadow_bustopacity
 * @parent mainmenu_status_shadow
 * @text Bust Opacity
 * @desc Opacity of bust when in shadow.
 * @type number
 * @max 255
 * @default 180
 *
 * @param mainmenu_status_light
 * @parent mainmenu_status
 * @text Light
 *
 * @param mainmenu_status_light_image
 * @parent mainmenu_status_light
 * @text Light Image
 * @desc Image to use for active highlight.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_LIGHT
 *
 * @param mainmenu_status_light_opacity
 * @parent mainmenu_status_light
 * @text Light Opacity
 * @desc Opacity of the highlight image.
 * @type number
 * @max 255
 * @default 80
 *
 * @param mainmenu_status_light_bustopacity
 * @parent mainmenu_status_light
 * @text Bust Opacity
 * @desc Opacity of bust when highlighted.
 * @type number
 * @max 255
 * @default 255
 *
 * @param mainmenu_status_level
 * @parent mainmenu_status
 * @text Level
 *
 * @param mainmenu_status_level_image
 * @parent mainmenu_status_level
 * @text Image
 * @desc Image to use for level circle.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_LEVEL
 *
 * @param mainmenu_status_level_xoffset
 * @parent mainmenu_status_level
 * @text X Offset
 * @desc X coordinate offset of level circle in relation to its parent.
 * @type number
 * @max 1280
 * @min -1280
 * @default 178
 *
 * @param mainmenu_status_level_yoffset
 * @parent mainmenu_status_level
 * @text Y Offset
 * @desc Y coordinate offset of level circle in relation to its parent.
 * @type number
 * @max 720
 * @min -720
 * @default 35
 *
 * @param mainmenu_status_level_label_gradient
 * @parent mainmenu_status_level
 * @text Label Gradient
 * @desc Gradient to use for the label.
 * @default ["#7f6a72", "#6b585f", "#7f6a72"]
 *
 * @param mainmenu_status_level_label_fontsize
 * @parent mainmenu_status_level
 * @text Label Font sizeToContent
 * @desc Font size to use for level label.
 * @type number
 * @default 42
 *
 * @param mainmenu_status_level_label_xoffset
 * @parent mainmenu_status_level
 * @text Label X Offset
 * @desc X coordinate offset of level label in relation to the circle.
 * @type number
 * @max 1280
 * @min -1280
 * @default 178
 *
 * @param mainmenu_status_level_label_yoffset
 * @parent mainmenu_status_level
 * @text Label Y Offset
 * @desc Y coordinate offset of level label in relation to the circle.
 * @type number
 * @max 720
 * @min -720
 * @default 45
 *
 * @param mainmenu_status_bonus_party
 * @text Bonus Party
 *
 * @param mainmenu_status_bonus_party_icon
 * @parent mainmenu_status_bonus_party
 * @text Bonus Party Icon
 * @desc The filename for the bonus party icon.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_BONUS_PARTY_ICON
 *
 * @param mainmenu_status_bonus_party_xoffset
 * @parent mainmenu_status_bonus_party
 * @text X Offset
 * @desc X coordinate offset of bonus party icon from origin
 * @type number
 * @max 1280
 * @min -1280
 * @default 1226
 *
 * @param mainmenu_status_bonus_party_yoffset
 * @parent mainmenu_status_bonus_party
 * @text Y Offset
 * @desc Y coordinate offset of bonus party icon from origin
 * @type number
 * @max 720
 * @min -720
 * @default 554
 *
 * @param mainmenu_corruptiongauge
 * @parent mainmenu
 * @text Corruption Gauge
 *
 * @param mainmenu_corruptiongauge_barbackground
 * @parent mainmenu_corruptiongauge
 * @text Bar Background
 * @desc Image to use for the background of the bar.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/CORRUPTION_BAR_BG
 *
 * @param mainmenu_corruptiongauge_icon
 * @parent mainmenu_corruptiongauge
 * @text Icon
 * @desc Image to use for the corruption icon.
 * @type file
 * @dir img/menu/
 * @default Status_Menu/STATUS_MENU_CORRUPTION_ICON
 *
 * @param mainmenu_corruptiongauge_xoffset
 * @parent mainmenu_corruptiongauge
 * @text X Offset
 * @desc X offset of gauge in relation to its parent element.
 * @type number
 * @max 1280
 * @min -1280
 * @default 1049
 *
 * @param mainmenu_corruptiongauge_yoffset
 * @parent mainmenu_corruptiongauge
 * @text Y Offset
 * @desc Y offset of gauge in relation to its parent element.
 * @type number
 * @max 720
 * @min -720
 * @default 671
 *
 * @param mainmenu_corruptiongauge_icon_xoffset
 * @parent mainmenu_corruptiongauge
 * @text Icon X Offset
 * @desc X offset of the icon in relation to its parent element.
 * @type number
 * @max 1280
 * @min -1280
 * @default -26
 *
 * @param mainmenu_corruptiongauge_icon_yoffset
 * @parent mainmenu_corruptiongauge
 * @text Icon Y Offset
 * @desc Y offset of the icon in relation to its parent element.
 * @type number
 * @max 720
 * @min -720
 * @default -14
 *
 * @param mainmenu_corruptiongauge_label_xoffset
 * @parent mainmenu_corruptiongauge
 * @text Label X Offset
 * @desc X offset of the label in relation to its parent element.
 * @type number
 * @max 1280
 * @min -1280
 * @default 23
 *
 * @param mainmenu_corruptiongauge_label_yoffset
 * @parent mainmenu_corruptiongauge
 * @text Label Y Offset
 * @desc Y offset of the label in relation to its parent element.
 * @type number
 * @max 720
 * @min -720
 * @default -18
 *
 * @param mainmenu_corruptiongauge_label_gapwidth
 * @parent mainmenu_corruptiongauge
 * @text Label Gap Width
 * @desc Width of the gap between label and value.
 * @type number
 * @max 1280
 * @default 122
 *
 * @param mainmenu_corruptiongauge_label_fontsize
 * @parent mainmenu_corruptiongauge
 * @text Label Font Size
 * @desc Font size to use for the label.
 * @type number
 * @default 18
 *
 * @param mainmenu_corruptiongauge_label_gradient
 * @parent mainmenu_corruptiongauge
 * @text Label Gradient
 * @desc Gradient to use for corruption label
 * @default ["#d9c5dd", "#eee5f1", "#d9c4de"]
 *
 * @param mainmenu_status_overlay
 * @parent mainmenu_status
 * @text Overlay
 *
 * @param mainmenu_status_overlay_main_image
 * @parent mainmenu_status_overlay
 * @text Main Character Overlay Image
 * @desc Image to use for the character who has WP.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_OVERLAY_S
 *
 * @param mainmenu_status_overlay_image
 * @parent mainmenu_status_overlay
 * @text Overlay Image
 * @desc Image to use for non-WP party member overlay.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_OVERLAY
 *
 * @param mainmenu_status_overlay_xoffset
 * @parent mainmenu_status_overlay
 * @text X Offset
 * @desc X coordinate offset of overlay in relation to its parent.
 * @type number
 * @max 1280
 * @min -1280
 * @default -1
 *
 * @param mainmenu_status_overlay_yoffset_main
 * @parent mainmenu_status_overlay
 * @text WP Y Offset
 * @desc Y coordinate offset of overlay in relation to its parent on a WP character.
 * @type number
 * @max 720
 * @min -720
 * @default 365
 *
 * @param mainmenu_status_overlay_yoffset_regular
 * @parent mainmenu_status_overlay
 * @text Non-WP Y Offset
 * @desc Y coordinate offset of overlay in relation to its parent on a non-WP character.
 * @type number
 * @max 720
 * @min -720
 * @default 390
 *
 * @param mainmenu_wpgauge
 * @parent mainmenu_status_overlay
 * @text WP Gauge
 *
 * @param mainmenu_wpgauge_lights_image
 * @parent mainmenu_wpgauge
 * @text Lights Image
 * @desc Image to use for the WP lights.
 * @type file
 * @dir img/menu/
 * @default Main_Menu/MAIN_ACTOR_WP_LIGHTS
 *
 * @param mainmenu_wpgauge_lights_xoffset
 * @parent mainmenu_wpgauge
 * @text Lights X Offset
 * @desc X coordinate offset of the lights in relation to their parent.
 * @type number
 * @max 720
 * @min -720
 * @default 4
 *
 * @param mainmenu_wpgauge_lights_yoffset
 * @parent mainmenu_wpgauge
 * @text Lights Y Offset
 * @desc Y coordinate offset of the lights in relation to their parent.
 * @type number
 * @max 720
 * @min -720
 * @default 373
 *
 * @param mainmenu_wpgauge_xoffset
 * @parent mainmenu_wpgauge
 * @text X Offset
 * @desc X offset of gauge in relation to its parent element.
 * @type number
 * @max 1280
 * @min -1280
 * @default 0
 *
 * @param mainmenu_wpgauge_yoffset
 * @parent mainmenu_wpgauge
 * @text Y Offset
 * @desc Y offset of gauge in relation to its parent element.
 * @type number
 * @max 720
 * @min -720
 * @default 371
 *
 * @param mainmenu_wpgauge_label_xoffset
 * @parent mainmenu_wpgauge
 * @text Label X Offset
 * @desc X coordinate offset of the label in relation to the overlay.
 * @type number
 * @max 1280
 * @min -1280
 * @default 12
 *
 * @param mainmenu_wpgauge_label_yoffset
 * @parent mainmenu_wpgauge
 * @text Label Y Offset
 * @desc Y coordinate offset of the label in relation to the overlay.
 * @type number
 * @max 720
 * @min -720
 * @default 26
 *
 * @param mainmenu_wpgauge_label_gapwidth
 * @parent mainmenu_wpgauge
 * @text Label Gap Width
 * @desc Width of the gap between the label and the value.
 * @type number
 * @max 1280
 * @default 190
 *
 * @param mainmenu_hpmpgauge
 * @parent mainmenu_status_overlay
 * @text HP/MP Gauge
 *
 * @param mainmenu_hpmpgauge_xoffset
 * @parent mainmenu_hpmpgauge
 * @text X Offset
 * @desc X offset of gauge in relation to its parent element.
 * @type number
 * @max 1280
 * @min -1280
 * @default 13
 *
 * @param mainmenu_hpmpgauge_yoffset
 * @parent mainmenu_hpmpgauge
 * @text Y Offset
 * @desc Y offset of gauge in relation to its parent element.
 * @type number
 * @max 720
 * @min -720
 * @default 28
 *
 * @param mainmenu_hpmpgauge_fontsize
 * @parent mainmenu_hpmpgauge
 * @text Font Size
 * @desc Font size to use for labels.
 * @type number
 * @default 18
 *
 * @param mainmenu_hpmpgauge_label_xoffset
 * @parent mainmenu_hpmpgauge
 * @text Label X Offset
 * @desc X coordinate offset for the label.
 * @type number
 * @max 1280
 * @min -1280
 * @default 8
 *
 * @param mainmenu_hpmpgauge_label_yoffset
 * @parent mainmenu_hpmpgauge
 * @text Label Y Offset
 * @desc Y coordinate offset for the label.
 * @type number
 * @max 720
 * @min -720
 * @default 394
 *
 * @param mainmenu_hpmpgauge_label_gapwidth
 * @parent mainmenu_hpmpgauge
 * @text Gap Width
 * @desc Width of the gap between label and right side of value.
 * @type number
 * @max 1280
 * @default 195
 *
 * @param mainmenu_hpmpgauge_gapheight
 * @parent mainmenu_hpmpgauge
 * @text Gap Height
 * @desc Gap between gauges.
 * @type number
 * @max 720
 * @default 32
 *
 * @param mainmenu_gold
 * @parent mainmenu
 * @text Gold display
 *
 * @param mainmenu_gold_iconx
 * @parent mainmenu_gold
 * @text Icon X
 * @desc X coordinate of the icon.
 * @type number
 * @max 1280
 * @default 837
 *
 * @param mainmenu_gold_icony
 * @parent mainmenu_gold
 * @text Icon Y
 * @desc Y coordinate of the icon.
 * @type number
 * @max 720
 * @default 670
 *
 * @param mainmenu_gold_value_offsetx
 * @parent mainmenu_gold
 * @text Label Offset X
 * @desc X offset of label in relation to icon.
 * @type number
 * @max 1280
 * @min -1280
 * @default -86
 *
 * @param mainmenu_gold_value_offsety
 * @parent mainmenu_gold
 * @text Label Offset Y
 * @desc Y offset of label in relation to icon.
 * @type number
 * @max 720
 * @min -720
 * @default -4
 *
 * @param mainmenu_day
 * @parent mainmenu
 * @text Day display
 *
 * @param mainmenu_day_posx
 * @parent mainmenu_day
 * @text X Position
 * @desc X position of the day label.
 * @type number
 * @max 1280
 * @default 888
 *
 * @param mainmenu_day_posy
 * @parent mainmenu_day
 * @text Y Position
 * @desc Y position of the day label.
 * @type number
 * @max 720
 * @default 663
 *
 * @param mainmenu_day_fontsize
 * @parent mainmenu_day
 * @text Font Size
 * @desc Size of font to use for day label.
 * @type number
 * @default 30
 *
 * @param mainmenu_day_fontsize_value
 * @parent mainmenu_day
 * @text Value Font Size
 * @desc Size of font to use for day value.
 * @type number
 * @default 42
 *
 * @param mainmenu_day_gradient
 * @parent mainmenu_day
 * @text Gradient
 * @desc Gradient to use for day display.
 * @default ["#806a72", "#6b575e", "#7f6b73"]
 *
 * @param mainmenu_day_valuevar
 * @parent mainmenu_day
 * @text Value Variable
 * @desc ID of variable to use for day number.
 * @type number
 * @default 31
 *
 * @param mainmenu_day_xoffset
 * @parent mainmenu_day
 * @text X Offset
 * @desc X coordinate offset between label and value.
 * @type number
 * @max 1280
 * @min -1280
 * @default 56
 *
 * @param mainmenu_day_yoffset
 * @parent mainmenu_day
 * @text Y Offset
 * @desc Y coordinate offset between label and value.
 * @type number
 * @max 720
 * @min -720
 * @default -2
 *
 */

 //----------------------------------------------------------------------------
 //
 // Parameters conversion
 //
 //----------------------------------------------------------------------------

window.parameters = PluginManager.parameters('TLB_SKAUIMenu');
TLB.Param = TLB.Param || {};
TLB.Param.SKAUIM = TLB.Param.SKAUIM || {};

TLB.SKABase.parseParameters(parameters, TLB.Param.SKAUIM);

//-----------------------------------------------------------------------------
//
// Scene_Menu (existing class)
// Inherits from Scene_MenuBase
//
// New function: createSprites
// New function: createGoldDisplay
// New function: createDayDisplay
// New function: createCorruptionDisplay
// New function: deselectPendingSprite
// Overwrite: create
// Alias: start
// Alias: createCommandWindow
// Overwrite: commandWindowRect
// Overwrite: createStatusWindow
// Overwrite: statusWindowRect
// Alias: commandPersonal
// Overwrite: onFormationOk
// Overwrite: onFormationCancel
// Override: createBackground (from Scene_MenuBase)
// Override: mainCommandWidth (from Scene_Base)
//
//-----------------------------------------------------------------------------

Scene_Menu.prototype.createSprites = function() {
	const params = TLB.Param.SKAUIM;
	this._goldSprite = new Sprite();
	this.addChild(this._goldSprite);
	if (eval(TLB.Param.SKAUIB.showCorruption)) {
		this._corruptionBackground = new Sprite();
		this._corruptionGauge = new Sprite_SKAGauge("corruption");
		this._corruptionGauge.setup(null, "corruption");
		this._corruptionBackground.addChild(this._corruptionGauge);
		this._corruptionBorder = new Sprite();
		this._corruptionBackground.addChild(this._corruptionBorder);
		this._corruptionIcon = new Sprite();
		this._corruptionBackground.addChild(this._corruptionIcon);
		this.addChild(this._corruptionBackground);
	}
	if ($gameParty.size() > 4) {
		const bonusSprite = new Sprite();
		bonusSprite.bitmap = ImageManager.loadMenu(params.mainmenu_status_bonus_party_icon);
		bonusSprite.move(params.mainmenu_status_bonus_party_xoffset, params.mainmenu_status_bonus_party_yoffset);
		this.addChild(bonusSprite);
	}
};

Scene_Menu.prototype.createGoldDisplay = function() {
	const params = TLB.Param.SKAUIM;
	const bParams = TLB.Param.SKAUIB;
	const image = bParams.gold_icon;
	const posX = params.mainmenu_gold_iconx;
	const posY = params.mainmenu_gold_icony;
	const labelX = posX + params.mainmenu_gold_value_offsetx;
	const labelY = posY + params.mainmenu_gold_value_offsety;
	const fontSize = bParams.gold_fontsize;
	const gradient = bParams.gold_gradient;
	const outlineGradient = bParams.textoutlinegradient;
	this._goldSprite.bitmap = ImageManager.loadMenu(image);
	this._goldSprite.x = posX;
	this._goldSprite.y = posY;
	const bmp = this._drawingLayer.bitmap;
	bmp.fontFace = 'franklin-gothic-demi-cond';
	bmp.fontSize = fontSize;
	const textOptions = {
		bitmap: bmp,
		outlineThickness: 2,
		outlineGradient: outlineGradient,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 2,
		shadowOpacity: 0.75
	};
	Window_Base.prototype.drawGradientText.call(this._statusWindow, TLB.SKABase.goldAsString(), gradient, labelX, labelY, 88, "right", textOptions);
};

Scene_Menu.prototype.createDayDisplay = function() {
	const params = TLB.Param.SKAUIM;
	const xPos = params.mainmenu_day_posx;
	const yPos = params.mainmenu_day_posy;
	const fontSize = params.mainmenu_day_fontsize;
	const valueSize = params.mainmenu_day_fontsize_value;
	const gradient = params.mainmenu_day_gradient;
	const dayVar = params.mainmenu_day_valuevar;
	const valueX = xPos + params.mainmenu_day_xoffset;
	const valueY = yPos + params.mainmenu_day_yoffset;
	const bmp = this._drawingLayer.bitmap;
	bmp.fontFace = 'franklin-gothic-med-cond';
	bmp.fontSize = fontSize;
	const textOptions = {
		bitmap: bmp,
		bold: true,
		dropShadow: true,
		dropShadowX: 1,
		dropShadowY: 1,
		shadowOpacity: 0.75
	};
	bmp.letterSpacing = 1;
	Window_Base.prototype.drawGradientText.call(this._statusWindow, "DAY", gradient, xPos, yPos, 50, "left", textOptions);
	bmp.fontSize = valueSize;
	Window_Base.prototype.drawGradientText.call(this._statusWindow, $gameVariables.value(dayVar), gradient, valueX, valueY, 64, "right", textOptions);
	bmp.resetLetterSpacing();
};

Scene_Menu.prototype.createCorruptionDisplay = function() {
	const params = TLB.Param.SKAUIM;
	const bgImage = params.mainmenu_corruptiongauge_barbackground;
	const borderImage = TLB.Param.SKAUIB.corruptiongauge_barborder;
	const iconImage = params.mainmenu_corruptiongauge_icon;
	const xPos = params.mainmenu_corruptiongauge_xoffset;
	const yPos = params.mainmenu_corruptiongauge_yoffset;
	const iconX = params.mainmenu_corruptiongauge_icon_xoffset;
	const iconY = params.mainmenu_corruptiongauge_icon_yoffset;
	const labelX = xPos + params.mainmenu_corruptiongauge_label_xoffset;
	const labelY = yPos + params.mainmenu_corruptiongauge_label_yoffset;
	const gapWidth = params.mainmenu_corruptiongauge_label_gapwidth;
	const valueX = labelX + gapWidth;
	const valueY = labelY - 1;
	const fontSize = params.mainmenu_corruptiongauge_label_fontsize;
	const gradient = params.mainmenu_corruptiongauge_label_gradient;
	const outlineGradient = TLB.Param.SKAUIB.textoutlinegradient;
	this._corruptionBackground.bitmap = ImageManager.loadMenu(bgImage);
	this._corruptionBackground.x = xPos;
	this._corruptionBackground.y = yPos;
	this._corruptionGauge.y += 0;
	this._corruptionBorder.bitmap = ImageManager.loadMenu(borderImage);
	this._corruptionIcon.bitmap = ImageManager.loadMenu(iconImage);
	this._corruptionIcon.position.set(iconX, iconY);
	const bmp = this._drawingLayer.bitmap;
	bmp.fontFace = 'franklin-gothic-med';
	bmp.fontSize = fontSize;
	const textOptions = {
		bitmap: bmp,
		outlineThickness: 3,
		outlineGradient: outlineGradient,
		dropShadow: true,
		dropShadowX: 0,
		dropShadowY: 2,
		shadowOpacity: 0.75
	};
	bmp.letterSpacing = 1;
	const winClass = Window_Base.prototype;
	winClass.drawGradientText.call(this._statusWindow, "CORRUPTION", gradient, labelX, labelY, 110, "left", { ...textOptions });
	bmp.fontSize = 16;
	const currentVar = TLB.Param.SKAB.currentCorruptionVar;
	const maxVar = TLB.Param.SKAB.maxCorruptionVar;
	const currentValue = $gameVariables.value(currentVar);
	const maxValue = $gameVariables.value(maxVar);
	winClass.drawGradientText.call(this._statusWindow, maxValue, gradient, valueX, valueY, 52, "right", textOptions);
	let textWidth = Math.ceil(bmp.measureTextWidth(`${winClass.applySpacing(maxValue)}`));
	bmp.fontFace = 'fuckboi-sans';
	winClass.drawGradientText.call(this._statusWindow, "/", gradient, valueX, valueY, 52 - textWidth, "right", textOptions);
	bmp.fontFace = 'franklin-gothic-med';
	bmp.fontSize = 13;
	textWidth += Math.ceil(bmp.measureTextWidth(winClass.applySpacing("  ")));
	bmp.fontSize = 16;
	winClass.drawGradientText.call(this._statusWindow, currentValue, gradient, valueX, valueY, 52 - textWidth, "right", textOptions);
	bmp.resetLetterSpacing();
};

Scene_Menu.prototype.deselectPendingSprite = function(pendingIndex) {
	const params = TLB.Param.SKAUIM;
	const image = params.mainmenu_status_shadow_image;
	const opacity = params.mainmenu_status_shadow_opacity;
	const bustOpacity = params.mainmenu_status_shadow_bustopacity;
	const index = pendingIndex - this._statusWindow._startingIndex;
	if (index >= 0 && index <= 3) {
		const sprite = this._statusWindow._bgSprites[index];
		const shadow = sprite.getChildByName("Shadow");
		const bust = sprite.getChildByName("Bust");
		shadow.bitmap = ImageManager.loadMenu(image);
		shadow.opacity = opacity;
		bust.opacity = bustOpacity;
	}
};

// Don't need the gold window since it's being displayed elsewhere
Scene_Menu.prototype.create = function() {
	const params = TLB.Param.SKAUIM;
	Scene_MenuBase.prototype.create.call(this);
	const images = [params.mainmenu_status_bonus_party_icon, TLB.Param.SKAUIB.gold_icon, params.mainmenu_corruptiongauge_barbackground, TLB.Param.SKAUIB.corruptiongauge_barborder, params.mainmenu_corruptiongauge_icon, params.mainmenu_status_shadow_image, TLB.Param.SKAUIB.menu_backgroundimage, params.mainmenu_frontimage];
	TLB.SKAUIBase.loadImages(images);
	this.createCommandWindow();
	this.createStatusWindow();
};

TLB.SKAMenu.Scene_Menu_start = Scene_Menu.prototype.start;
Scene_Menu.prototype.start = function() {
	TLB.SKAMenu.Scene_Menu_start.call(this);
	const params = TLB.Param.SKAUIM;
	this.createSprites();
	this._drawingLayer = new Sprite();
	this._drawingLayer.bitmap = new Bitmap(Graphics.width, Graphics.height);
	this.addChild(this._drawingLayer);
	if (eval(TLB.Param.SKAUIB.showGold)) this.createGoldDisplay();
	if (eval(params.showDay)) this.createDayDisplay();
	if (eval(TLB.Param.SKAUIB.showCorruption)) this.createCorruptionDisplay();
};

Scene_Menu.prototype.commandWindowRect = function() {
	const ww = this.mainCommandWidth();
	const wh = this.mainAreaHeight();
	const wx = -218;
	const wy = this.mainAreaTop() + 14;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_SKAMenuStatus(rect);
    this.addWindow(this._statusWindow);
};

Scene_Menu.prototype.statusWindowRect = function() {
    const ww = Graphics.boxWidth - this.mainCommandWidth() + 490;
    const wh = this.mainAreaHeight();
    const wx = this._commandWindow.width - 235;
    const wy = this.mainAreaTop() + 32;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.onFormationOk = function() {
    const index = this._statusWindow.index();
    const pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
		this.deselectPendingSprite(pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_Menu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
		this.deselectPendingSprite(this._statusWindow.pendingIndex());
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    }
};

Scene_Menu.prototype.createBackground = function() {
	const params = TLB.Param.SKAUIB;
	this._backgroundSprite2 = new Sprite();
	let image = params.menu_backgroundimage;
	const opacity = TLB.Param.SKAUIM.mainmenu_backgroundopacity;
	this._backgroundSprite2.bitmap = ImageManager.loadMenu(image);
	this._backgroundSprite2.opacity = opacity;
	this.addChild(this._backgroundSprite2);
	this._backgroundSprite3 = new Sprite();
	image = TLB.Param.SKAUIM.mainmenu_frontimage;
	this._backgroundSprite3.bitmap = ImageManager.loadMenu(image);
	this.addChild(this._backgroundSprite3);
};

Scene_Menu.prototype.mainCommandWidth = function() {
	return 315;
};

//-----------------------------------------------------------------------------
//
// Window_MenuCommand (existing class)
// Inherits from Window_Command
//
// Overwrite: initialize(rect)
// Alias: addOriginalCommands
// Override: drawItem (from Window_Command)
// Override: itemHeight (from Window_Selectable)
// Override: select (from Window_Selectable)
// Override: drawItemBackground(index) (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
//
//-----------------------------------------------------------------------------

Window_MenuCommand.prototype.initialize = function(rect) {
	const params = TLB.Param.SKAUIM;
	this._commandBackSprites = [];
	Window_Command.prototype.initialize.call(this, rect);
	for (let i = 0; i < this._list.length; i++) {
		const rect = this.itemRect(i);
		this._commandBackSprites.push(new Sprite());
		let image;
		if (this.isCommandEnabled(i)) image = params.mainmenu_commands_inactive_image;
		else image = params.mainmenu_commands_disabled_inactive_image;
		this._commandBackSprites[i].bitmap = ImageManager.loadMenu(image);
		this._commandBackSprites[i].y = rect.y;
		this.addChildAt(this._commandBackSprites[i], i);
	}
	this.opacity = 0;
	this.cursorVisible = false;
	this.selectLast();
	this._canRepeat = false;
	this.refresh();
};

Window_MenuCommand.prototype.drawItem = function(index) {
	const params = TLB.Param.SKAUIM;
	let gradient;
	let image;
	const rect = this.itemRect(index);
	const posX = params.mainmenu_commands_xoffset;
	const posY = rect.y + params.mainmenu_commands_yoffset;
	this.contents.clearRect(rect.x + posX, posY, this.contents.width, rect.height);
	if (index === this.index()) {
		if (this.isCommandEnabled(index)) {
			gradient = params.mainmenu_commands_active_gradient;
			image = params.mainmenu_commands_active_image;
		} else {
			gradient = params.mainmenu_commands_disabled_active_gradient;
			image = params.mainmenu_commands_disabled_active_image;
		}
	} else if (this.isCommandEnabled(index)) {
		gradient = params.mainmenu_commands_inactive_gradient;
		image = params.mainmenu_commands_inactive_image;
	} else {
		gradient = params.mainmenu_commands_disabled_inactive_gradient;
		image = params.mainmenu_commands_disabled_inactive_image;
	}
	const sprite = this._commandBackSprites[index];
	if (sprite && TLB.SKABase.convertToFilename(sprite.bitmap._url) !== image) sprite.bitmap = ImageManager.loadMenu(image);
	this.contents.fontFace = 'franklin-gothic-med-cond';
	this.contents.fontSize = params.mainmenu_commands_fontsize;
	this.drawGradientText(this.commandName(index).toUpperCase(), gradient, rect.x - posX, posY, this.contents.width, "center", { dropShadow: true, dropShadowX: 2, dropShadowY: 2, bold: true, angle: -0.03 });
};

Window_MenuCommand.prototype.itemHeight = function() {
	return TLB.Param.SKAUIM.mainmenu_commands_itemheight;
};

TLB.SKAMenu.Window_MenuCommand_select = Window_MenuCommand.prototype.select;
Window_MenuCommand.prototype.select = function(index) {
	TLB.SKAMenu.Window_MenuCommand_select.call(this, index);
	this.refresh();
};

Window_MenuCommand.prototype.drawItemBackground = function(index) {
    //
};

Window_MenuCommand.prototype.refreshCursor = function() {
    this.setCursorRect(0, 0, 0, 0);
};

//-----------------------------------------------------------------------------
//
// Window_StatusBase (existing class)
// Inherits from Window_Selectable
//
// Overwrite: initialize(rect)
// New function: loadPortraits
//
//-----------------------------------------------------------------------------

TLB.SKAMenu.Window_StatusBase_initialize = Window_StatusBase.prototype.initialize;
Window_StatusBase.prototype.initialize = function(rect) {
	TLB.SKAMenu.Window_StatusBase_initialize.call(this, rect);
	this.loadPortraits();
};

Window_StatusBase.prototype.loadPortraits = function() {
	const members = $gameParty.members();
	const menuActor = SceneManager._scene._actor;
	if (menuActor && !members.includes(menuActor)) members.push(menuActor);
	for (const actor of members) {
		const portraitName = actor._portraitName || actor.actor().portraitName;
		if (portraitName) ImageManager.loadPortrait(portraitName);
	}
};

//-----------------------------------------------------------------------------
//
// Window_SKAMenuStatus (new class)
// Inherits from Window_MenuStatus
//
// We can't use ES6 class notation for this because the bg sprites need to
// be created before the window tries to refresh, otherwise things won't
// appear properly.
//
// New function: createSprites
// New function: createBackroundSprite(index, x, y)
// New function: createBustSprite(index)
// New function: createShadowSprite(index)
// New function: createLevelSprites(index)
// New function: createOverlaySprites(actor, index)
// New function: drawValue(label, current, max, x, y, maxWidth textOptions)
// New function: drawSKAName (actor index)
// New function: drawSKABust (actor, index)
// New Function: drawSKALevel (actor, index)
// New function: updateSKAOverlay (actor, index)
// Override: initialize(rect) (from Window_MenuStatus)
// Override: numVisibleRows (from Window_MenuStatus)
// Override: drawItemStatus(index) (from Window_MenuStatus)
// Override: maxCols (from Window_Selectable)
// Override: select(index) (from Window_Selectable)
// Override: deselect (from Window_Selectable)
// Override: maxVisibleItems (from Window_Selectable)
// Override: itemRect(index) (from Window_Selectable)
// Override: cursorDown(wrap) (from Window_Selectable)
// Override: cursorUp(wrap) (from Window_Selectable)
// Override: cursorPagedown (from Window_Selectable)
// Override: cursorPageup (from Window_Selectable)
// Override: update (from Window_Selectable)
// Override: hitTest(x, y) (from Window_Selectable)
// Override: drawAllItems (from Window_Selectable)
// OVerride: drawItem(index) (from Window_Selectable)
// Override: drawItemBackground(index) (from Window_Selectable)
// Override: redrawItem(index) (from Window_Selectable)
// Override: refreshCursor (from Window_Selectable)
// Override: processWheelScroll (from Window_Scrollable)
// Override: onTouchScroll (from Window_Scrollable)
// Override: updateArrows (from Window_Scrollable)

function Window_SKAMenuStatus() {
	this.initialize(...arguments);
}

Window_SKAMenuStatus.prototype = Object.create(Window_MenuStatus.prototype);
Window_SKAMenuStatus.prototype.constructor = Window_SKAMenuStatus;

Window_SKAMenuStatus.prototype.createSprites = function() {
	for (let i = 0; i < Math.min($gameParty.size(), 4); i++) {
		const rect = this.itemRect(i);
		const actor = this.actor(i);
		this._bgSprites.push(new Sprite());
		this.createBackgroundSprite(i, rect.x, rect.y);
		this.createBustSprite(i);
		this.createShadowSprite(i);
		this.createLevelSprites(i);
		this.createOverlaySprites(actor, i);
		const drawingLayer = new Sprite();
		drawingLayer.bitmap = new Bitmap(230, 529);
		drawingLayer.name = "drawingLayer";
		drawingLayer.bitmap.clear();
		this._bgSprites[i].addChild(drawingLayer);
		this.addChildAt(this._bgSprites[i], i);
	}
};

Window_SKAMenuStatus.prototype.createBackgroundSprite = function(index, x, y) {
	const params = TLB.Param.SKAUIM;
	const sprite = this._bgSprites[index];
	const image = params.mainmenu_status_backgroundimage;
	const yOffset = params.mainmenu_status_yoffset;
	sprite.bitmap = ImageManager.loadMenu(image);
	sprite.x = x;
	sprite.y = y - (yOffset * index);
};

Window_SKAMenuStatus.prototype.createBustSprite = function(index) {
	const params = TLB.Param.SKAUIM;
	const bust = new Sprite();
	bust.name = "Bust";
	const posX = params.mainmenu_status_bust_xoffset;
	const posY = params.mainmenu_status_bust_yoffset;
	const opacity = params.mainmenu_status_bust_opacity;
	const bmpWidth = params.mainmenu_status_bust_width;
	const bmpHeight = params.mainmenu_status_bust_height;
	bust.bitmap = new Bitmap(bmpWidth, bmpHeight);
	bust.position.set(posX, posY);
	bust.opacity = opacity;
	this._bgSprites[index].addChild(bust);
};

Window_SKAMenuStatus.prototype.createShadowSprite = function(index) {
	const params = TLB.Param.SKAUIM;
	const shadow = new Sprite();
	const image = params.mainmenu_status_shadow_image;
	const posX = params.mainmenu_status_shadow_xoffset;
	const posY = params.mainmenu_status_shadow_yoffset;
	shadow.bitmap = ImageManager.loadMenu(image);
	shadow.position.set(posX, posY);
	shadow.name = "Shadow";
	this._bgSprites[index].addChild(shadow);
};

Window_SKAMenuStatus.prototype.createLevelSprites = function(index) {
	const params = TLB.Param.SKAUIM;
	const levelCircle = new Sprite();
	const image = params.mainmenu_status_level_image;
	const posX = params.mainmenu_status_level_xoffset;
	const posY = params.mainmenu_status_level_yoffset;
	levelCircle.bitmap = ImageManager.loadMenu(image);
	levelCircle.position.set(posX, posY);
	this._bgSprites[index].addChild(levelCircle);
};

Window_SKAMenuStatus.prototype.createOverlaySprites = function(actor, index) {
	const params = TLB.Param.SKAUIM;
	const sprite = this._bgSprites[index];
	const overlay = new Sprite();
	let overlayImage;
	let overlayX;
	let overlayY;
	if (actor.actorId() !== 5 || actor !== $gameParty.leader()) {
		const hpGauge = new Sprite_SKAGauge("hp");
		const xPos = params.mainmenu_hpmpgauge_xoffset;
		const yPos = params.mainmenu_hpmpgauge_yoffset;
		const gapHeight = params.mainmenu_hpmpgauge_gapheight;
		hpGauge.position.set(xPos, yPos);
		hpGauge.name = "hpGauge";
		overlay.addChild(hpGauge);
		const mpGauge = new Sprite_SKAGauge("mp");
		mpGauge.position.set(xPos, yPos + gapHeight);
		mpGauge.name = "mpGauge";
		overlay.addChild(mpGauge);
		if (actor.actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) {
			const gauge = new Sprite_SKAGauge("wp");
			const xPos = params.mainmenu_wpgauge_xoffset;
			const yPos = params.mainmenu_wpgauge_yoffset;
			overlayX = params.mainmenu_status_overlay_xoffset;
			overlayY = params.mainmenu_status_overlay_yoffset_main;
			const lightsX = params.mainmenu_wpgauge_lights_xoffset;
			const lightsY = params.mainmenu_wpgauge_lights_yoffset;
			gauge.position.set(xPos, yPos);
			gauge.name = "wpGauge";
			this._bgSprites[index].addChild(gauge);
			hpGauge.position.y += gapHeight;
			mpGauge.position.y += gapHeight;
			overlayImage = params.mainmenu_status_overlay_main_image;
			const lights = new Sprite();
			const lightsImage = params.mainmenu_wpgauge_lights_image;
			lights.bitmap = ImageManager.loadMenu(lightsImage);
			lights.position.set(lightsX, lightsY);
			lights.name = "lights";
			sprite.addChild(lights);
		} else {
			overlayImage = params.mainmenu_status_overlay_image;
			overlayX = params.mainmenu_status_overlay_xoffset;
			overlayY = params.mainmenu_status_overlay_yoffset_regular;
		}
	} else {
		overlayImage = params.mainmenu_status_overlay_image;
		overlayX = params.mainmenu_status_overlay_xoffset;
		overlayY = params.mainmenu_status_overlay_yoffset_regular;
	}
	overlay.bitmap = ImageManager.loadMenu(overlayImage);
	overlay.position.set(overlayX, overlayY);
	overlay.name = "Overlay";
	sprite.addChild(overlay);
};

Window_SKAMenuStatus.prototype.drawValue = function(label, current, max, x, y, maxWidth, textOptions) {
	const params = TLB.Param.SKAUIM;
	const bmp = textOptions.bitmap;
	let gradient = params.mainmenu_corruptiongauge_label_gradient;
	switch (label) {
		case "HP":
			gradient = [ColorManager.hpGaugeColor2(), ColorManager.hpGaugeColor1()];
			break;
		case "MP":
			gradient = ["#45c5f5", "#4888c8"];
			break;
		case "WP":
			gradient = [TLB.Param.SKAUIB.wpgauge_color2, TLB.Param.SKAUIB.wpgauge_color1];
			break;
	}
	const xOffset = params.mainmenu_hpmpgauge_label_xoffset;
	bmp.fontFace = 'franklin-gothic-med';
	bmp.fontSize = params.mainmenu_hpmpgauge_fontsize;
	this.drawGradientText(label, gradient, x + xOffset, y, maxWidth, "left", textOptions);
	bmp.fontSize = 16;
	this.drawGradientText(max, gradient, x, y, maxWidth, "right", textOptions);
	let textWidth = Math.ceil(bmp.measureTextWidth(this.applySpacing(max, bmp.letterSpacing)));
	bmp.fontFace = 'fuckboi-sans';
	this.drawGradientText("/", gradient, x, y, maxWidth - textWidth, "right", textOptions);
	bmp.fontSize = 12;
	bmp.fontFace = 'franklin-gothic-med';
	textWidth += Math.ceil(bmp.measureTextWidth(this.applySpacing("  ", bmp.letterSpacing)));
	bmp.fontSize = 16;
	this.drawGradientText(current, gradient, x, y, maxWidth - textWidth, "right", textOptions);
};

Window_SKAMenuStatus.prototype.drawSKAName = function(actor, index) {
	const params = TLB.Param.SKAUIM;
	const gradient = params.mainmenu_status_name_gradient;
	const fontSize = params.mainmenu_status_name_fontsize;
	const posX = params.mainmenu_status_name_xoffset;
	const posY = params.mainmenu_status_name_yoffset;
	const bmp = this._bgSprites[index].getChildByName("drawingLayer").bitmap;
	bmp.fontFace = 'franklin-gothic-demi-cond';
	bmp.fontSize = fontSize;
	const textOptions = {
		outlineThickness: 2,
		bitmap: bmp
	}

	this.drawGradientText(actor.name().toUpperCase(), gradient, posX, posY, 228, "center", textOptions);
};

Window_SKAMenuStatus.prototype.drawSKABust = function(actor, index) {
	const params = TLB.Param.SKAUIB;
	const bust = this._bgSprites[index].getChildByName("Bust");
	bust.bitmap.clear();
	let image = null;
	if (actor._portraitName) image = actor._portraitName;
	else if (actor.actor().portraitName) image = actor.actor().portraitName;
	if (image)  {
		const id = actor.actorId();
		const source = ImageManager.loadPortrait(image);
		const sourceX = actor._bustX ? actor._bustX : params.portraitData[id].bustX;
		const sourceY = actor._bustX ? actor._bustY : params.portraitData[id].bustY;
		const scale = TLB.Param.SKAUIM.mainmenu_status_bust_scale;
		const width = 212;
		const height = 330;
		const sliceWidth = width * scale;
		const sliceHeight = height * scale;
		bust.bitmap = new Bitmap(width, height);
		bust.bitmap.blt(source, sourceX, sourceY, sliceWidth, sliceHeight, 0, 0, width, height);
	}
};

Window_SKAMenuStatus.prototype.drawSKALevel = function(actor, index) {
	const params = TLB.Param.SKAUIM;
	const gradient = params.mainmenu_status_level_label_gradient;
	const fontSize = params.mainmenu_status_level_label_fontsize;
	const labelX = params.mainmenu_status_level_label_xoffset;
	const labelY = params.mainmenu_status_level_label_yoffset;
	const bmp = this._bgSprites[index].getChildByName("drawingLayer").bitmap;
	bmp.fontFace = 'franklin-gothic-med-cond';
	bmp.fontSize = fontSize;
	const textOptions = {
		bitmap: bmp,
		dropShadow: true,
		dropShadowX: 1,
		dropShadowY: 1,
		bold: true
	}

	this.drawGradientText(actor.level, gradient, labelX, labelY, 59, "center", textOptions);
};

Window_SKAMenuStatus.prototype.updateSKAOverlay = function(actor, index) {
	const params = TLB.Param.SKAUIM;
	const sprite = this._bgSprites[index];
	const bmp = sprite.getChildByName("drawingLayer").bitmap;
	const overlay = sprite.getChildByName("Overlay");
	const gapWidth = params.mainmenu_hpmpgauge_label_gapwidth;
	const gapHeight = params.mainmenu_hpmpgauge_gapheight;
	const hpGauge = overlay.getChildByName("hpGauge");
	const xPos = params.mainmenu_hpmpgauge_xoffset;
	let yPos = params.mainmenu_hpmpgauge_yoffset + params.mainmenu_hpmpgauge_label_yoffset;
	if (actor.actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) yPos += 7;
	hpGauge.setup(actor, "hp");
	const textOptions = {
		outlineGradient: ["#4f4f4f", "#000000"],
		outlineThickness: 3,
		bold: true,
		bitmap: bmp,
		dropShadowX: 1,
		dropShadowY: 1,

	}
	this.contents.letterSpacing = 1;
	this.drawValue("HP", actor.hp, actor.mhp, xPos, yPos, gapWidth, textOptions);
	const mpGauge = overlay.getChildByName("mpGauge");
	mpGauge.setup(actor, "mp");
	this.drawValue("MP", actor.mp, actor.mmp, xPos, yPos + gapHeight, gapWidth, textOptions);
	this.contents.resetLetterSpacing();
	let overlayImage;
	let overlayY;
	const wpGauge = sprite.getChildByName("wpGauge");
	if (actor.actorId() === 1 && eval(TLB.Param.SKAUIB.showWillpower)) {
		overlayImage = params.mainmenu_status_overlay_main_image;
		overlayY = params.mainmenu_status_overlay_yoffset_main;
		wpGauge.show();
		sprite.getChildByName("lights").show();
		const xPos = params.mainmenu_wpgauge_xoffset + params.mainmenu_wpgauge_label_xoffset;
		const yPos = params.mainmenu_wpgauge_yoffset + params.mainmenu_wpgauge_label_yoffset;
		const currentVarId = TLB.Param.SKAB.currentWpVar;
		const maxVarId = TLB.Param.SKAB.maxWpVar;
		const currentValue = $gameVariables.value(currentVarId);
		const maxValue = $gameVariables.value(maxVarId);
		this.drawValue("WP", currentValue, maxValue, xPos, yPos, gapWidth, textOptions);
		wpGauge.setup(null, "wp");
		hpGauge.position.y = params.mainmenu_hpmpgauge_yoffset + params.mainmenu_hpmpgauge_gapheight;
		mpGauge.position.y = params.mainmenu_hpmpgauge_yoffset + params.mainmenu_hpmpgauge_gapheight * 2;
	} else {
		overlayImage = params.mainmenu_status_overlay_image;
		overlayY = params.mainmenu_status_overlay_yoffset_regular;
		if (wpGauge) {
			wpGauge.hide();
			sprite.getChildByName("lights").hide();
		}
		hpGauge.position.y = params.mainmenu_hpmpgauge_yoffset;
		mpGauge.position.y = params.mainmenu_hpmpgauge_yoffset + params.mainmenu_hpmpgauge_gapheight;
	}
	if (TLB.SKABase.convertToFilename(overlay.bitmap._url) !== overlayImage) overlay.bitmap = ImageManager.loadMenu(overlayImage);
	if (overlay.position.y !== overlayY) overlay.position.y = overlayY;
};

Window_SKAMenuStatus.prototype.initialize = function(rect) {
	Window_StatusBase.prototype.initialize.call(this, rect);
	this._formationMode = false;
	this._pendingIndex = -1;
	this.opacity = 0;
	this._startingIndex = 0;
	this._bgSprites = [];
	this.downArrowVisible = false;
    this.upArrowVisible = false;
	this.createSprites();
	this.refresh();
};

Window_SKAMenuStatus.prototype.numVisibleRows = function() {
	return 1;
};

Window_SKAMenuStatus.prototype.drawItemStatus = function(index) {
	const params = TLB.Param.SKAUIM;
	const sprite = this._bgSprites[index];
	const actor = this.actor(index + this._startingIndex);
	if (index >= this._startingIndex + 3) index -= this._startingIndex;
	const bmp = sprite.getChildByName("drawingLayer").bitmap;
	bmp.clear();
	let image;
	let opacity;
	let bustOpacity;
	if (this.pendingIndex() - this._startingIndex === index) {
		image = params.mainmenu_status_light_image;
		opacity = params.mainmenu_status_light_opacity + 100;
		bustOpacity = params.mainmenu_status_light_bustopacity;
	}
	else if (this.index() - this._startingIndex === index) {
		image = params.mainmenu_status_light_image;
		opacity = params.mainmenu_status_light_opacity;
		bustOpacity = params.mainmenu_status_light_bustopacity;
	} else {
		image = params.mainmenu_status_shadow_image;
		opacity = params.mainmenu_status_shadow_opacity;
		bustOpacity = params.mainmenu_status_shadow_bustopacity;
	}
	const shadow = sprite.getChildByName("Shadow");
	const bust = sprite.getChildByName("Bust");
	const shadowName = TLB.SKABase.convertToFilename(shadow.bitmap._url);
	if (shadowName !== image) shadow.bitmap = ImageManager.loadMenu(image);
	if (shadow.opacity !== opacity) shadow.opacity = opacity;
	if (bust.opacity !== bustOpacity) bust.opacity = bustOpacity;
	this.drawSKAName(actor, index);
	const rect = this.itemRect(index);
	let lastX = rect.x + 25;
	const yOffset = params.mainmenu_status_yoffset;
	const y = 75 - (yOffset * index);
	for (let i = 0; i < 3; ++i) {
		this.placeStateIcon(actor, lastX, y, i);
		lastX += ImageManager.iconWidth;
	}
	this.drawSKABust(actor, index);
	this.drawSKALevel(actor, index);
	if (actor.actorId() !== 5 || actor !== $gameParty.leader()) this.updateSKAOverlay(actor, index);
};

Window_SKAMenuStatus.prototype.maxCols = function() {
	return TLB.Param.SKAUIM.mainmenu_status_maxcols;
};

Window_SKAMenuStatus.prototype.select = function(index) {
    this._index = index;
	if (index >= 0) {
		if (index > this._startingIndex + 3) this._startingIndex = index - 3;
		else if (index < this._startingIndex) this._startingIndex = index;
		this.refresh();
	}
    this.refreshCursor();
    this.callUpdateHelp();
};

Window_SKAMenuStatus.prototype.deselect = function() {
	const params = TLB.Param.SKAUIM;
	const sprite = this._bgSprites[this.index() - this._startingIndex];
	const image = params.mainmenu_status_shadow_image;
	const opacity = params.mainmenu_status_shadow_opacity;
	const bustOpacity = params.mainmenu_status_shadow_bustopacity;
	const shadow = sprite.getChildByName("Shadow");
	const bust = sprite.getChildByName("Bust");
	shadow.bitmap = ImageManager.loadMenu(image);
	shadow.opacity = opacity;
	bust.opacity = bustOpacity;
    Window_Selectable.prototype.deselect.call(this);
};

Window_SKAMenuStatus.prototype.maxVisibleItems = function() {
	return 4;
};

Window_SKAMenuStatus.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2;
    const y = row * itemHeight + rowSpacing / 2;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_SKAMenuStatus.prototype.cursorDown = function(wrap) {
	//
};

Window_SKAMenuStatus.prototype.cursorUp = function(wrap) {
	//
};

Window_SKAMenuStatus.prototype.cursorPagedown = function() {
    this.select(Math.min(this.index() + 4, this.maxItems() - 1));
	this.refresh();
};

Window_SKAMenuStatus.prototype.cursorPageup = function() {
    this.select(Math.max(this.index() - 4, 0));
	this.refresh();
};

Window_SKAMenuStatus.prototype.hitTest = function(x, y) {
    if (this.innerRect.contains(x, y)) {
        const cx = this.origin.x + x - this.padding;
        const cy = this.origin.y + y - this.padding;
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = i;
            if (index < this.maxItems()) {
                const rect = this.itemRect(index);
                if (rect.contains(cx, cy)) {
                    return index + this._startingIndex;
                }
            }
        }
    }
    return -1;
};

Window_SKAMenuStatus.prototype.drawAllItems = function() {
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_SKAMenuStatus.prototype.drawItem = function(index) {
	this.drawItemStatus(index);
};

Window_SKAMenuStatus.prototype.drawItemBackground = function() {
	//
};

Window_SKAMenuStatus.prototype.redrawItem = function(index) {
	const redrawIndex = index - this._startingIndex;
    if (redrawIndex >= 0 && redrawIndex <= 3) {
        this.clearItem(redrawIndex);
        this.drawItem(redrawIndex);
    }
};

Window_SKAMenuStatus.prototype.refreshCursor = function() {
    this.setCursorRect(0, 0, 0, 0);
};

Window_SKAMenuStatus.prototype.processWheelScroll = function() {
    if (this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this.cursorPagedown();
        }
        if (TouchInput.wheelY <= -threshold) {
            this.cursorPageup();
        }
    }
};

Window_SKAMenuStatus.prototype.onTouchScroll = function() {
    const accelX = this._scrollLastTouchX - TouchInput.x;
    if (accelX < -15) this._startingIndex = Math.max(this._startingIndex - 1, 0);
	if (accelX > 15)
		this._startingIndex = Math.min(this._startingIndex + 1, Math.max(this.maxItems() - 4, 0));
	this.refresh();
	let repeatDelay = 30;
	while (repeatDelay > 0) {
		repeatDelay--;
	}
};

Window_SKAMenuStatus.prototype.updateArrows = function() {
    //
};