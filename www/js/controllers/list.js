"use strict";
define(['app'], function(app) {
  app.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'sms', 
    function($scope, $routeParams, $location, smsPromise) {
      $scope.days = [];
      
      smsPromise.then(function(sms) {
        var cursor = sms.getThreads();
        cursor.onsuccess = function() {
          if (cursor.result) {
            var ts = new Date(+cursor.result.timestamp);
            ts.setHours(0, 0, 0, 0);
            
            var day = $scope.days.filter(function(d) { return d.ts === ts.getTime(); })[0];
            if (day) {
              day.messages.push(cursor.result);
            }
            else {
              $scope.days.push({
                ts: ts.getTime(),
                date: ts,
                messages: [ cursor.result ]
              });
            }
            
            $scope.$apply();
            cursor.continue();
          }
        };
        cursor.onerror = function() {
          console.error('getThreads failed', cursor.error);
        };
      });
    }]);
  });
