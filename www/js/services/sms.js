"use strict";
define(['app'], function(app) {
  app.factory('sms', ['$q', '$rootScope', function($q, $rootScope) {
    var api = $q.defer();
    
    if (navigator.mozSms) {
      api.resolve(navigator.mozSms);
    }
    else {
      require([ 'js/services/sms_mock.js' ], function(mock) {
        $rootScope.$apply(function() {
          api.resolve(mock);
        });
      });
    }
    
    return api.promise;
  }]);
});