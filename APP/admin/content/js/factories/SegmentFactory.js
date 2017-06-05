(function(){
    'use strict';
    
    angular.module('tcc').factory('SegmentFactory', SegmentFactory);
    
    SegmentFactory.$inject = ['$http', 'SETTINGS','$rootScope'];
    
    function SegmentFactory($http, SETTINGS,$rootScope) {
        return {
            GetSegment: GetSegment,

        };
        
        function GetSegment(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/segment/GetSegment/', $rootScope.header);
        }

    }
})();