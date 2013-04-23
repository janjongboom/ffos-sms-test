'use strict';
define(['app'], function(app) {
  app.filter('friendlyday', ['$filter', function($filter) {
    return function(ts) {
      //ts = new Date(ts);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      today = today.getTime();
      var otherDay = ts.getTime();
      var dayDiff = (today - otherDay) / 86400000;

      if (isNaN(dayDiff)) {
        return 'Incorrect date';
      }

      if (dayDiff < 0) {
        // future time
        return $filter('date')(ts, 'shortDate');
      }

      return dayDiff === 0 && 'Today' ||
        dayDiff === 1 && 'Yesterday' ||
        dayDiff < 4 && $filter('date')(ts, 'EEEE') ||
        $filter('date')(ts, 'shortDate');
    };
  }]);
});