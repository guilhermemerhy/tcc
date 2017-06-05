(function(){
    'use strict';
    
    angular.module('tcc').controller('AD_ListUserController', AD_ListUserController);
    
    AD_ListUserController.$inject = ['$scope', 'UserFactory', '$state'];
    
    function AD_ListUserController($scope, UserFactory, $state){

        
        $scope.userData = null;

        
        $scope.btnNew = New;
        $scope.findByEmail = findByEmail;
        $scope.btnDesactivate = desactive;
        $scope.btnActivate = activate;
        $scope.btnTurnSimpleUser = TurnSimpleUser;
        $scope.btnTurnAdmin = TurnAdmin;

        
        getAll();

        function getAll(){
            UserFactory.getAll($scope.email)
                .then(success)
                .catch(fail);

            function success(data){
              
                $scope.userData = data.data;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
   
        function findByEmail(){
            UserFactory.getByEmail($scope.email)
                .then(success)
                .catch(fail);
                
            function success(data){
                if(data == null)
                    toastr.warning('Usuário não encontrado!')
                else
                    $scope.userData = data;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function activate(model){
            UserFactory.activate(model.id)
                .then(success)
                .catch(fail);
                
            function success(data){
                model.isActive = true;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function desactive(model){
            UserFactory.desactivate(model.id)
                .then(success)
                .catch(fail);
                
            function success(data){
                model.isActive  = false;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
         function TurnAdmin(model){
            UserFactory.TurnAdmin(model.id)
                .then(success)
                .catch(fail);
                
            function success(data){
               model.isAdmin = true;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }

          function TurnSimpleUser(model){
            UserFactory.TurnSimpleUser(model.id)
                .then(success)
                .catch(fail);
                
            function success(data){
                model.isAdmin = false;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
       
        function New(){
            $state.go("admin.userCreate");
        }
    }
})();