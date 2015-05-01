# Introduction #

Changelog 2.0.2

# Details #

# Changelog 2.0.2 #

## Enhancements ##

### Core ###

  * Added: animation time is now passed to the validation event (useful, if you want an action to happen only when the wheel stops moving)

  * Added: wheel containers have now numbered classes: 'dwwl0', 'dwwl1', 'dwwl2' etc. to allow different styling for each wheel

### Select preset ###

  * Added: 'invalid' option to set certain values unselectable. This option takes precedence over the disabled options in the original html select element.

  * Added: 'label' option to set the label of the wheel. If not present, the label is taken from the original html select element's label, and falls back to the select element's name attribute, if the label doesn't exist

## Bugfixes ##

### Datetime preset ###

  * Fixed: 'shortYearCutoff' option was not working correctly. (With '+10' value if 2 digits years were used, 12 was converted to 1912 instead of 2012)

  * Fixed: if day was not present on the wheels (e.g. credit card expration), the date object defaulted to today's date, which resulted in incorrect value, if current month had more days as the selected month

  * Fixed: day names were incorrect, if initial validation changed the month from an invalid value to the nearest valid one

### Select preset ###

  * Fixed: 'setValue' and 'getValue' methods overwrote the core methods and were unusable for other presets or custom scrollers

### Zepto js plugin ###

  * Fixed: in 'mixed' mode clicking on the +/- buttons caused a short button blink

### jQuery Mobile Theme ###

  * Fixed: Button appearance with JQM 1.1.1