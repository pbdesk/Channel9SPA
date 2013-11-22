(function () {
    'use strict';


    var controllerId = 'ProgramsController';

    angular.module(C9AppName).controller(controllerId, ['$rootScope', '$route', ProgramsController]);

    function ProgramsController($rootScope, $route) {
        
        var vm = this;

        vm.title = $rootScope.CurrentL1;

   
        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        if (vm.title === 'Shows') {
            vm.data = $rootScope.shows.items;
        }
        else if (vm.title === 'Series') {
            vm.data = $rootScope.series.items;
            
        }
    
        vm.L1Nav = L1Nav;
        vm.L2Nav = L2Nav;

        function activate() {
        }

        function L1Nav(selectedOption) {
            $rootScope.CurrentL1 = selectedOption;
            if ($rootScope.CurrentL1 !== 'Recent') {
                $route.reload();
            }
        }

        function L2Nav(selectedL2Option) {
            $rootScope.CurrentL2 = selectedL2Option;
        }
        //#region Internal Methods        

        //#endregion
    }
})();
