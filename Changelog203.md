# Introduction #

Changelog 2.0.3

# Details #

# Changelog 2.0.3 #

## Enhancements ##

### Core ###

  * Added: 'lang' option to specify language related default settings and language files

## Bugfixes ##

### Core ###

  * Fixed: 'clickpick' mode worked as 'mixed' in 2.0.2

  * Fixed: 'setValue' was not working only if the related input was also filled

  * Fixed: wheels were misaligned on Firefox with iOS theme and datetime preset

### Datetime preset ###

  * Fixed: Time was incorrectly parsed if at least one of the year/month/day wheels was not generated

  * Fixed: Default year value was not set, if was not between startYear and endYear