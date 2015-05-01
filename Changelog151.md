# Introduction #

Changelog 1.5.1

# Details #

# Changelog 1.5.1 #

## Bugfixes ##

  * Fixed: Date validation was not called on show ([Issue 29](https://code.google.com/p/mobiscroll/issues/detail?id=29), [Issue 32](https://code.google.com/p/mobiscroll/issues/detail?id=32))

  * Fixed: Destroy didn't set correctly the original readonly state of the input element. ([Issue 31](https://code.google.com/p/mobiscroll/issues/detail?id=31))

  * Fixed: Input element is not set to readonly if showOnFocus is false

  * Fixed: Disabled state of form inputs was not correctly reset after hiding the scroller.

  * Fixed: Don't show scroller if disabled and show is called programatically.

## Enhancements ##

  * Added: if the onClose handler returns false, close is now prevented.

  * Added: onCancel event handler.

## Notes ##

  * From now we are using .prop to set readonly/disabled states. This means thet jQuery >= 1.6 is required.