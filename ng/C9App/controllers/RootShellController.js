(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'RootShellController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', '$window', 'C9Configs', RootShellController]);

    function RootShellController($rootScope, $window, C9Configs) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;


        $rootScope.shows = C9Configs.shows;
        $rootScope.series = C9Configs.series;
        $rootScope.recent = C9Configs.recent;

        $window.location = "#/";

    }
})();
