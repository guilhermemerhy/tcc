(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_EditContactController', PS_EditContactController);
    
    PS_EditContactController.$inject = ['$rootScope', '$state', 'ContactFactory', 'CompanyFactory', 'SETTINGS', '$stateParams'];
    
    function PS_EditContactController($rootScope, $state, ContactFactory,CompanyFactory, SETTINGS, $stateParams){
        var vm = this;
        vm.contact = null;
        vm.btnSave = Save;
		vm.btnCancel = Cancel;
        vm.companys = [];
        

         GetById();

         if($rootScope.company.length == 0)
            GetCompany();
        else
            vm.companys = $rootScope.company;
        
        function GetById(){
            if(SETTINGS.USERID != null){
                ContactFactory.getById($stateParams.contactId)
                    .then(success)
                    .catch(fail);
                    
                function success(data){
                    vm.contact = data.data;                    
                }
                
                function fail(error){
                    for(var x = 0; x < error.data.errors.length; x++)
                        toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                }
            }
        }
        
        function GetCompany(){
                    CompanyFactory.GetCompanyByUser(SETTINGS.USERID)
                        .then(success)
                        .catch(fail);
                    
                    function success(data)
                    {
                        vm.companys = data.data;  
                        $rootScope.company = vm.companys;                 
                    }
                    
                    function fail(error){
                            if(error.status == 401){
                                toastr.error("Acesso não autorizado pelo servidor", error.statusText);
                                $state.go("account.logout");        
                            }else
                                for(var x = 0; x < error.data.errors.length; x++)
                                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
                        }
                }
        

        function Save(){
            ContactFactory.edit(vm.contact)
                .then(success)
                .catch(fail);
                
            function success(data){
                toastr.success("Contato modificado","Sucesso");
                $state.go("ClienteAdministrador.contact");
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function Cancel(){
            $state.go("ClienteAdministrador.contact");
        }                      
    }
})();