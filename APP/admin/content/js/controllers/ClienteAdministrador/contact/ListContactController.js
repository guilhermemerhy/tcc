(function(){
    'use strict';
    
    angular.module('tcc').controller('PS_ListContactController', PS_ListContactController);
    
    PS_ListContactController.$inject = ['$rootScope','$state', 'ContactFactory', 'SETTINGS', '$stateParams'];
    
    function PS_ListContactController($rootScope, $state, ContactFactory, SETTINGS, $stateParams){
        var vm = this;
        vm.contact = [];
        vm.sortType = 'companyName';
		vm.sortReverse = false;
	    vm.searchText = '';
        
        vm.btnNew = New;
        vm.btnEditar = Edit;
        

        ListContact();

        
        function ListContact(){
            if(SETTINGS.USERID != null){
                ContactFactory.GetByUserId(SETTINGS.USERID)
                    .then(success)
                    .catch(fail);
                    
                function success(data){
                    
                        vm.contact = data.data;                                           
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
        }
        
        function New(){
            $state.go("ClienteAdministrador.contactCreate");
        }
        
        function Edit(id)
        {
            $state.go("ClienteAdministrador.contactEdit", {contactId:id});
        }
        
    }
})();