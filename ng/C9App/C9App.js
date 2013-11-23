
var C9AppName = 'C9App';
(function () {
    'use strict';

    // Module name is handy for logging
    var id = 'C9App';

    var C9App = angular.module('C9App', ['ngAnimate', 'ngRoute', 'ngSanitize', 'GoogleFeedsApp']);

    //defining routes
    C9App.config(['$routeProvider', function ($routeProvider) {

        var c9AppViewPath = 'ng/C9App/views/';
        $routeProvider
            .when('/', { templateUrl: c9AppViewPath + 'dashboard.html' })
            .when('/c9programs', { templateUrl: c9AppViewPath + 'programs.html' })
            .when('/c9feeds', { templateUrl: c9AppViewPath + 'feeds.html' })
            .when('/c9feeditem', { templateUrl: c9AppViewPath + 'item.html' })
            .otherwise({ redirectTo: '/' });
    }]);
})();