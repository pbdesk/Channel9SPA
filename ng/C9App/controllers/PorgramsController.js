(function () {
    'use strict';


    var controllerId = 'ProgramsController';

    angular.module(C9AppName).controller(controllerId, ['$rootScope', '$route', ProgramsController]);

    function ProgramsController($rootScope, $route) {
        
        var vm = this;

        vm.L1Title = $rootScope.CurrentL1;


        if (vm.L1Title === 'Shows') {
            vm.data = $rootScope.shows.items;
        }
        else if (vm.L1Title === 'Series') {
            vm.data = $rootScope.series.items;
            
        }
    
        vm.L1Nav = L1Nav;
        vm.L2Nav = L2Nav;

   
        //#region Internal Methods 
        function L1Nav(selectedOption) {
            $rootScope.CurrentL1 = selectedOption;
            if ($rootScope.CurrentL1 !== 'Recent') {
                $route.reload();
            }
        }

        function L2Nav(selectedL2Option) {
            $rootScope.CurrentL2 = selectedL2Option;
        }
               

        //#endregion
    }
})();
