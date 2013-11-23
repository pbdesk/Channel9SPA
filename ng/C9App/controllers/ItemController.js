

(function () {
    'use strict';

    var controllerId = 'ItemController';

    angular.module(C9AppName).controller(controllerId, ['$rootScope', ItemController]);

    function ItemController($rootScope) {
        
        var vm = this;
        vm.CurrentProgramTypeName = $rootScope.CurrentProgramTypeName
        vm.CurrentProgramName = $rootScope.CurrentProgramName
        vm.CurrentProgramItem = $rootScope.CurrentProgramItem;
        
        //#region Internal Methods        

        //#endregion
    }
})();
