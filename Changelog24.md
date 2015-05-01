# Introduction #

Changelog 2.4

# Details #

# Changelog 2.4 #

## Enhancements ##

_Core_

  * Changed: Use div-s instead of ul-s and li-s

  * Changed: Don't scroll the wheels if validate function returns false

  * Added: 'btn' parameter to the onClose event, 'set' or 'cancel' is passed depending on which button triggered the close

_Measurement presets_

  * Added: if step > 1, fraction wheel is not generated

  * Added: fraction wheel is infinite

_Themes_

  * Added: 'jqmBorder' option to the jQueryMobile theme to change the swatch of the border


## Bugfixes ##

_Core_

  * Fixed: Also disable button elements when showing modal popup

_Rating preset_

  * Fixed: parseValue returned incorrect value

  * Fixed: value was incorrectly set if elements were generated from a select element

_Themes_

  * Fixed: onCancel event was not fired if scroller was hidden by clicking on the overlay (#58)