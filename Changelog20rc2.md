# Introduction #

Changelog 2.0rc2

# Details #

# Changelog 2.0rc2 #

## Removed ##

  * Removed: _ampm_ option is now removed, see the new _timeWheels_ option instead

  * Removed: _seconds_ option is now removed, see the new _timeWheels_ option instead

## Changes ##

  * Changed: _preset_ option no longer defaults to 'date', **it must be explicitly specified!**

  * Changed: _wheels_ option no defaults to empty array ([.md](.md)) instead of null

  * Changed: valid scroller items now have the class "dw-v" instead of "valid"

  * Changed: in 2.0rc1 days not in month were styled as disabled, like items out of the min/max range. From now on days not in month now have the class "dw-h" which, by default has a hidden style in css.

## Bugfixes ##

  * Fixed: Inline mode bug with jQuery Mobile, if it was not on the initial page ([Issue 87](https://code.google.com/p/mobiscroll/issues/detail?id=87))

  * Fixed: Select preset was not working in inline mode

## Enhancements ##

  * Added: _headerText_ can accept a function, which must return a string

  * Added: Day of week can be displayed on the scrollers. Use 'D' (short names) or 'DD' (long names) in the _dateOrder_ options. Sample _dateOrder_ value: 'mmD ddy' will produce '05', 'Thu 03', '2012' on the day, month and year wheels. ([Issue 65](https://code.google.com/p/mobiscroll/issues/detail?id=65))

  * Added: _separator_ option used by the datetime preset to specify the separator between date and time parts. Default is ' '. ([Issue 86](https://code.google.com/p/mobiscroll/issues/detail?id=86))

  * Added: _readonly_ option, if true, the scroller appears, but cannot be scrolled. Useful if you want to display a nice clock.

  * Added: _timeWheels_ option to show, hide, and format the time related wheels on the scroller. Default is 'hhiiA'. For the hour wheel use 'h', 'hh', 'H', 'HH', for minutes wheel 'i' or 'ii', for seconds wheel 's' or 'ss', for am/pm wheel 'A' or 'a'. E.g. for 24 hour time format with seconds and leading zeroes use 'HHiiss'. ([Issue 85](https://code.google.com/p/mobiscroll/issues/detail?id=85))

  * Added: support for HTML5 date/datetime/datetime-local/month/time input types. If mobiscroll is attached to such an input, the format is forced to follow standards specifications. In the popup header the value is formatted according to the date and timeformat specified by the user. ([Issue 70](https://code.google.com/p/mobiscroll/issues/detail?id=70))