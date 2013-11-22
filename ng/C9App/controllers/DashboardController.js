(function () {
    'use strict';


    var controllerId = 'DashboardController';
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', DashboardController]);

    function DashboardController($rootScope) {

        var vm = this;

        vm.MainNav = MainNav;
        vm.Shows = jQuery.grep($rootScope.shows.items, function( n, i ) { return ( i < 3 );});
        vm.Series = jQuery.grep($rootScope.series.items, function( n, i ) { return ( i < 3 );}); 




        //#region Internal Methods        
        function MainNav(selectedOption) {
            $rootScope.CurrentL1 = selectedOption;
        }
        //#endregion
    }
})();
