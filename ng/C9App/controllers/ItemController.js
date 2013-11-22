

(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'C9ItemController';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', C9ItemController]);

    function C9ItemController($rootScope) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;

        vm.current = $rootScope.CurrentItem;
        
        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.title = 'C9ItemController';

        function activate() {
        }

        //#region Internal Methods        

        //#endregion
    }
})();
