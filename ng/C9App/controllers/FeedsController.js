/// <reference path="../../../../Scripts/_references.js" />

(function () {
    'use strict';

    var controllerId = 'FeedsController';
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', '$route','GoogleFeedsFactory',  FeedsController]);

    function FeedsController($rootScope, $route, GoogleFeedsFactory, $routeParams) {

        var vm = this;

        vm.CurrentProgramTypeName = $rootScope.CurrentProgramTypeName
        var c9Object = {};
        if ($rootScope.CurrentProgramTypeName === 'Shows' || $rootScope.CurrentProgramTypeName == 'Series') {
            c9Object = $rootScope.CurrentProgramObj;
            vm.Title = c9Object.title;
        }
        else if ($rootScope.CurrentProgramTypeName == 'Recent') {
            c9Object = $rootScope.recent;
            vm.Title = 'Latest on Channel9';
        }
        else {
            c9Object = null;
        }

        if (c9Object != null) {
            GoogleFeedsFactory.GetFeeds(c9Object.rssUrl, c9Object.itemCount, 'c9').then(
                function (result) {
                    vm.Data = result.feed;
                },
                function (error) {
                    //error
                    alert("error");
                }
                );
        }

         vm.NavigateTo = NavigateTo;

        //#region Internal Methods        
        function NavigateTo(strProgramType,  objProgram) {
            $rootScope.CurrentProgramTypeName = strProgramType;
            if (objProgram != null) {
                $rootScope.CurrentProgramObj = objProgram;
            }
            if ($rootScope.CurrentProgramTypeName === 'Recent') {
                $route.reload();
            }
        }
        //#endregion



        vm.L2Nav = L2Nav;     
        vm.L1Nav = L1Nav;

        //#region Internal Methods
        function L1Nav(selectedOption) {
            $rootScope.CurrentL1 = selectedOption;
            if (selectedOption === 'Recent') {
                $route.reload();
            }
            
        }

        function L2Nav(item) {
            $rootScope.CurrentItem = item;
        }

        

        //#endregion
    }
})();
