(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_TemplateController', PS_TemplateController);
    
    PS_TemplateController.$inject = ['$scope', '$state', '$rootScope', 'UserFactory','SETTINGS'];
    
    function PS_TemplateController($scope, $state, $rootScope, UserFactory, SETTINGS){
  

        
        $rootScope.timeoutOrderUpdate = 0;       
        $rootScope.company = [];
        $rootScope.segment = [];

        

         Activate();
        
        function Activate(){
            if ($rootScope.user == null) {
                $state.go("account.login");
            } else {
                if(SETTINGS.USERID == null){
                    //$state.go("ClienteAdministrador.dashboard");
                    $state.go('route');
                }

            }
        }
        
       
    }
})();