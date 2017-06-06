(function(){
    'use strict';
    
    angular.module('tcc').controller('DetailsController', DetailsController);
    
    DetailsController.$inject = ['$rootScope','$state', 'SETTINGS', '$stateParams', 'NgMap'];
    
    function DetailsController($rootScope, $state, SETTINGS, $stateParams, NgMap){
        var vm = this;


        if($rootScope.details.length == 0){
            $state.go("home"); 
        }
        else
        {
            vm.details = $rootScope.details;
            vm.state = $rootScope.details[0].state;
            vm.city = $rootScope.details[0].city;
            vm.segment = $rootScope.details[0].segment.name;
                       
            vm.btnDetails = btnDetails;
            vm.modal = [];

            vm.visualizacao = ChangeVisualizacao;
            vm.exibirTodos = true;
            vm.filtro = 1;
     

            vm.positions = [];
            for(var i = 0; i < $rootScope.details.length; i++){
                var dados = $rootScope.details[i];
                vm.positions.push({pos:[dados.latitude, dados.longitude],id:i});
            }   


             var bounds = new google.maps.LatLngBounds();
                for (var i=0; i< $rootScope.details.length; i++) {
                     var dados = $rootScope.details[i];
                    var latlng = new google.maps.LatLng(dados.latitude, dados.longitude);
                    bounds.extend(latlng);
             }

              NgMap.getMap().then(function(map) {
                     vm.map = map;
                     vm.map.setCenter(bounds.getCenter());
                     vm.map.fitBounds(bounds);
                });


              vm.showDetail = function(e, id) {
                vm.marker = $rootScope.details[id];               
                vm.map.showInfoWindow('foo', this);
            };
          
        }

         function btnDetails(index){

            vm.modal = $rootScope.details[index].contacts[0];
                                                                                                                                                               
            $('#modalCreate').modal('show');
        }

        function ChangeVisualizacao(valor){

            if(valor == 1)
                vm.exibirTodos = true;
            else
                vm.exibirTodos = false;
        }
    }
})();