# Introduction #

Changelog 1.5


# Details #

# Changelog 1.5 #

## Bugfixes ##

  * Fixed: _setDate_ method incorrectly sets year, when _seconds_ option is **false** ([Issue #17](https://code.google.com/p/mobiscroll/issues/detail?id=#17))

## Enhancements ##

  * Added: _mode_ option, with two possible values: 'scroller' and 'clickpick', where 'scroller' is the default behaviour, while 'clickpick' renders + and - buttons for each wheel. ([Issue #14](https://code.google.com/p/mobiscroll/issues/detail?id=#14), see [Documentation](Documentation.md))

  * Added: new and updated skins: Android, Sense UI, iOS. Set the _theme_ option to 'android', 'sense-ui' and 'ios'

## Notes ##

  * Support for jQuery Mobile 1.0beta1 is now removed (click event was not working). Upgrade to beta2 to use the latest version of MobiScroll.

## Known Issues ##

  * 'Scroller' mode is still not working in Firefox Mobile and IE on WP7

  * When using 'Clickpick' mode, very fast taps causes page zoom on HTC Android.