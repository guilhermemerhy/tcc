(function(){
    'use strict';
    
    angular.module('tcc').controller('AD_CreateUserController', AD_CreateUserController);
    
    AD_CreateUserController.$inject = ['$scope', 'UserFactory', '$state'];
    
    function AD_CreateUserController($scope, UserFactory, $state){
         
        $scope.btnSave = Save;
        $scope.btnCancel = Cancel;
        
        
        function Save(){
            UserFactory.create($scope.model)
                .then(success)
                .catch(fail);
                
            function success(data){
                toastr.success(data,"Sucesso");
                $state.go("admin.user");
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function Cancel(){
            $state.go("admin.user");
        }
    }
})();