# Introduction #

Changelog 2.2

# Details #

# Changelog 2.2 #

## Enhancements ##

### Core ###

  * Added: move the wheel to the selected value on tap

  * Added: selected values now have a 'dw-sel' css class

  * Added: support for Windows Phone 8

### Datetime preset ###

  * Added: month and day names are wrapped in <span> and <span> to allow more styling</li></ul>

### Select preset ###

### List preset ###

  * Added: a new preset which transforms ul/ol html lists into a scroller

### Animation plugin ###

  * Added: Internet Explorer 10 support

### Themes ###

  * Added: Windows Phone theme

## Bugfixes ##

### Core ###

  * Fixed: onClose received null as valueText parameter

  * Fixed: button flickering during animation on Chrome

  * Fixed: options were not correctly updated 'on the fly' (by using the 'option' method on an existing instance) - [Issue 112](https://code.google.com/p/mobiscroll/issues/detail?id=112) on Google Code

  * Fixed: wheel could not be stopped on the correct place if another wheel was scrolled before the animation finished

  * Fixed: +/- buttons didn't reappear in mixed mode, if a wheel was changed (e.g. with group select preset)

### Datetime preset ###

  * Fixed: If input had no value, default date/datetime was the time when the control was initialized, not when it was shown

### Select preset ###

  * Fixed: setValue did not set correctly the second wheel, if optgroup was not the original