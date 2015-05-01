# Introduction #

Changelog 2.0

# Details #

# Changelog 2.0 #

## Bugfixes ##

  * Fixed: setValue / setDate methods did not animate the scroller if time was specified

  * Fixed: In some cases date validation scrolled the day wheel to empty value

  * Fixed: Datetime preset's setDate and getDate methods were using last created instance's resources ([Issue 93](https://code.google.com/p/mobiscroll/issues/detail?id=93))

  * Fixed: Select options were reordered, if values were numbers

  * Fixed: When using option method to change options on the fly, preset and theme defaults overrode user settings