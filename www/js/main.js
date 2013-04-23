require.config({
  shim: {
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    }
  },
  paths: {
    jquery: 'components/jquery/jquery',
    angular: 'components/angular/angular',
    app: 'js/app'
  },
  baseUrl: '/'
});

(function() {
  function tryHoldReady() {
    if (!tryHoldReady.executed && window.jQuery) {
      window.jQuery.holdReady(true);
      tryHoldReady.executed = true;
    }
  }
  tryHoldReady();
  require.onResourceLoad = tryHoldReady;
  require([
    // dependencies
    'jquery',
    'angular',

    // application
    'app',
    'js/mobile-nav.js',
    
    // filters
    'js/filters/friendlyday.js',
    
    // services
    'js/services/sms.js',
    
    // controllers
    'js/controllers/list.js',
  ], function() {
    // done loading
    jQuery.holdReady(false);
  });

})();
