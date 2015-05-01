# Introduction #

Changelog 2.3

# Details #

# Changelog 2.3 #

## Enhancements ##

_Core_

  * Changed: prevent collisions if core is loaded multiple times

  * Changed: validate and onChange event runs on scrolling animation end providing a more fluid user experience (#36)

  * Changed: user defined event handlers does not override preset event handlers

  * Added: onShow gets an additional valueText parameter

  * Added: onAnimStart event, which is fired at scrolling animation start, and receives the wheel index, animation time, and the mobiscroll instance as parameters

  * Added: shorthand form for presets: $('.selector').mobiscroll().date(). To add a shorthand for your own preset, just add the following line in your preset code: $.mobiscroll.presetShort('mypresetname')

  * Added: highlight selected entry on tap

_Select preset_

  * Changed: make it work with late validation

_List preset_

  * Changed: make it work with late validation

_Themes_

  * Changed: prevent collisions if themes are loaded multiple times

## Bugfixes ##

_Core_

  * Fixed: don't do tap ahead, if moving wheel was stopped with a tap

  * Fixed: setValue method was not working correctly (#43)

  * Fixed: if close was canceled (onClose returned false), the value was still set

_Datetime preset_

  * Fixed: closing tag for the short day name and short month name span was incorrectly added

_Select preset_

  * Fixed: onChange, onSelect, onCancel events received the disabled value, if the user scrolled to a disabled option, event though on the UI was not selectable (#40)

_Rating preset_

  * Fixed: stars were not aligned to middle in Firefox and IE