(function () {
    'use strict';


    var controllerId = 'DashboardController';
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', DashboardController]);

    function DashboardController($rootScope) {

        var vm = this;

        vm.Shows = jQuery.grep($rootScope.shows.items, function (n, i) { return (i < 3); });
        vm.Series = jQuery.grep($rootScope.series.items, function (n, i) { return (i < 3); });

        vm.NavigateTo = NavigateTo;

        //#region Internal Methods        
        function NavigateTo(strProgramType, objProgram) {
            $rootScope.CurrentProgramTypeName = strProgramType;
            if (objProgram != null) {
                $rootScope.CurrentProgramObj = objProgram;
            }
        }
        //#endregion
    }
})();
