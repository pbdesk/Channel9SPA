/// <reference path="../../../../Scripts/_references.js" />

(function () {
    'use strict';

    var controllerId = 'FeedsController';
    angular.module(C9AppName).controller(controllerId,
        ['$rootScope', '$route','GoogleFeedsFactory',  FeedsController]);

    function FeedsController($rootScope, $route, GoogleFeedsFactory, $routeParams) {

        var vm = this;

        vm.L1Title = $rootScope.CurrentL1;


        vm.L2Title = $rootScope.CurrentL2.title;


        var subCatFoundArr = [];
        var c9Object = {};
        if ($rootScope.CurrentL1 === 'Shows' || $rootScope.CurrentL1 == 'Series') {
            c9Object = $rootScope.CurrentL2;
        }
        else if ($rootScope.CurrentL1 == 'Recent') {
            c9Object = $rootScope.recent;
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

        //alert($rootScope.shows.items.length);

        // Bindable properties and functions are placed on vm.
        vm.activate = activate;
        vm.ItemSelected = ItemSelected;
        vm.title = 'C9SubCatController';
     
        vm.L1Nav = L1Nav;
        //vm.L2Nav = L2Nav;

        function activate() {
        }

        function L1Nav(selectedOption) {
            $rootScope.CurrentL1 = selectedOption;
            if (selectedOption === 'Recent') {
                $route.reload();
            }
            
        }

        //function L2Nav(selectedL2Option) {
        //    $rootScope.CurrentL2 = selectedL2Option;
        //}

        function ItemSelected(item) {
            $rootScope.CurrentItem = item;
        }

        //#region Internal Methods        

        //#endregion
    }
})();
