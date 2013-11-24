/// <reference path="../../../../Scripts/_references.js" />

(function () {
    'use strict';

    var controllerId = 'FeedsController';
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', '$route', 'GoogleFeedsFactory', FeedsController]);

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
                    if ($rootScope.CurrentProgramTypeName == 'Series') {
                        vm.Data.entries.reverse();
                    }
                },
                function (error) {
                    //error
                    alert("Error loading Channel9 Feeds Via Google Feed API, Please try again...");
                }
                );
        }

        vm.NavigateTo = NavigateTo;

        //#region Internal Methods        
        function NavigateTo(strProgramType, strProgramName, objProgram) {
            $rootScope.CurrentProgramTypeName = strProgramType;
            if (strProgramName != null) {
                $rootScope.CurrentProgramName = strProgramName;
            }
            if (objProgram != null) {
                $rootScope.CurrentProgramItem = objProgram;
                return;
            }
            if ($rootScope.CurrentProgramTypeName === 'Recent') {
                $route.reload();
            }
        }
        //#endregion

    }
})();
