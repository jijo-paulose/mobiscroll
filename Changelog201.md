# Introduction #

Changelog 2.0.1

# Details #

# Changelog 2.0.1 #

## Bugfixes ##

  * Fixed: HTML5 min/max attributes propagated to other scrollers

  * Fixed: jQuery Mobile 1.0 compatibility ([Issue 95](https://code.google.com/p/mobiscroll/issues/detail?id=95))

  * Fixed: Using values like "1.0", "2.0", etc. on custom wheels caused incorrect behavior because they were converted to numbers and became 1, 2, etc.

  * Fixed: fast scrolling caused value loss, if validation changed another wheel value with animation

  * Fixed: when element was created for 3d testing: document.createElement(mod) - mod was undefined

  * Fixed: setValue and getValue was not working correctly with the select preset

  * Fixed: timeWheels option did not modify the order of the wheels