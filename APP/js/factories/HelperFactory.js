(function(){
    'use strict';

    angular.module('tcc').factory('HelperFactory', HelperFactory);

    HelperFactory.$inject = ['$http', 'SETTINGS','$rootScope'];

    function HelperFactory($http, SETTINGS,$rootScope) {
        return {
            GetSegment: GetSegment,
            sendEmail: sendEmail
        };

         function GetSegment(id){
            return $http.get(SETTINGS.SERVICE_URL + 'api/v1/segment/GetSegment/', $rootScope.header);
        }

        function sendEmail(model){
            return $http.post(SETTINGS.SERVICE_URL + 'api/v1/helper/sendEmail/', model, $rootScope.header);
        }
    }
})();
