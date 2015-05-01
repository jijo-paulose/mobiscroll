# Introduction #

Changelog 2.0rc1

# Details #

# Changelog 2.0rc1 #

## Structural changes ##

Mobiscroll has now a modular structure. The core contains the wheel generation and scrolling logic. The core can be extended by presets.
Presets are basically a collection of predefined settings, which are passed to the core, but may contain other initialization logic, which is executed when the scroller instance is created.

Currently you can include the 'date', 'time', 'datetime' and 'select' presets.

Themes are now also modular, css styles are in separate files for each theme. Themes may have an optional javascript file, where default settings can be set, and an optional init function as well.

## Removed ##

  * Removed: _beforeShow_ event is now removed

  * Removed: _showValue_ option is now removed, use the _headerText_ option instead

  * Removed: _btnClass_ option is now removed, button style can be changed by adding css rules to the .dwb class

## Bugfixes ##

  * Fixed: Android ICS Light skin fix (small +/- appeared above/under arrows)

  * Fixed: _onSelect_ and _onCancel_ events are now called after the popup is closed and all the form elements on the page are re-enabled, making possible to submit the form in these events.

  * Fixed: In custom events **this** refers to the original HTML DOM element instead of the settings object

## Enhancements ##

  * Changed: The visibility of year, month and day wheels is now controlled by _dateOrder_ option, e.g. use **'mmyy'** to display month and year wheels only

  * Added: _display_ option, which can be **'inline'** or **'modal'** (default)

  * Added: _headerText_ option to specify a custom string which appears in the popup header. If the string contains **'{value}'** substring, it is replaced with the formatted value of the scroller. If _headerText_ is set to **false**, the header is hidden.

  * Added: _onShow_ event

  * Added: _delay_ option to specify the speed in milliseconds to change values in clickpick mode with tap & hold, default is **300** ([Issue 68](https://code.google.com/p/mobiscroll/issues/detail?id=68))

  * Added: jQuery Mobile theme, set _theme_ option to **'jqm'**

  * Added: **'select'** preset to enhance a regular HTML select. The original select is hidden, and a dummy input is visible instead. The value of the select is maintained by the preset

  * Added: _minDate_ and _maxDate_ options to specify a range which can be selected. Works for datetime as well.