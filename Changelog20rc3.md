# Introduction #

Changelog 2.0rc3

# Details #

# Changelog 2.0rc3 #

## Bugfixes ##

  * Fixed: In clickpick mode minus button had plus button behavior

  * Fixed: In inline mode getValue always returned the initial values

  * Fixed: min/max attributes were incorrectly parsed when using HTML5 time input

## Enhancements ##

  * Added: _invalid_ option for the datetime preset to set dates unselectable. There are three properties to specify dates, all can be used separate or combined. _dates_ is be an array of dates to disable exact dates on the scroller. _daysOfWeek_ is an array with values from 0 to 6, _daysOfMonth_ is an array which accepts numbers (e.g. every month's 2nd day) or a string in 'x/y' format (e.g. 12/24 means every year's 24th December is disabled). A sample configuration: ` invalid: { dates: [new Date(2012,5,4), new Date(2012,5,13)], daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] } `

  * Added: The select preset automatically disables elements on the scroller if they were disabled in the original html select element

