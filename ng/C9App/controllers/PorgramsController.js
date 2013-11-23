(function () {
    'use strict';


    var controllerId = 'ProgramsController';

    angular.module(C9AppName).controller(controllerId, ['$rootScope', '$route', ProgramsController]);

    function ProgramsController($rootScope, $route) {
        
        var vm = this;

        vm.Title = $rootScope.CurrentProgramTypeName;


        if (vm.Title === 'Shows') {
            vm.data = $rootScope.shows.items;
        }
        else if (vm.Title === 'Series') {
            vm.data = $rootScope.series.items;
            
        }


        vm.NavigateTo = NavigateTo;

        //#region Internal Methods        
        function NavigateTo(strProgramType, objProgram) {
            $rootScope.CurrentProgramTypeName = strProgramType;
            if (objProgram != null) {
                $rootScope.CurrentProgramObj = objProgram;
            }
            if ($rootScope.CurrentProgramTypeName !== 'Recent') {
                $route.reload();
            }
        }
        //#endregion

    
       
    }
})();
