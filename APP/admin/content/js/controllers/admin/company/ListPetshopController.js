(function(){
    'use strict';
    
    angular.module('tcc').controller('AD_ListPetshopController', AD_ListPetshopController);
    
    AD_ListPetshopController.$inject = ['$scope', 'PetshopFactory', '$state','HelperFactory', 'BankFactory'];
    
    function AD_ListPetshopController($scope, PetshopFactory, $state, HelperFactory, BankFactory){
        $scope.banks = [];
        $scope.petshop = null;
        $scope.id = null;
        $scope.map = null;
        $scope.marker = null;
        $scope.showBtnSetAddress = false;
        
        $scope.btnNew = New;
        $scope.findById = FindById;

        
        Activate();        
        function Activate(){
            $scope.map = L.map(document.getElementById("map")).setView(['-9.79567758282973', '-51.37207031249999'], 4);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGh1c2NrZXIiLCJhIjoiY2luMHV3d2d3MGFyMnZxbHVtcGd3NmdraiJ9.FSL-4sHQhIX18dnKKI05hQ', {
                maxZoom: 18,
                attribution: 'IPet',
                id: 'mapbox.streets'
            }).addTo($scope.map);
            
            $scope.map.on('click', function(e){
                GetAddress(e.latlng);
            });
            
            ListBanks();
        }
        
      
        
        function SetAddress(){
            PetshopFactory.setAddress($scope.petshop)
                .success(success)
                .catch(fail);
                
            function success(data){
                toastr.success("Localização atualizada com sucesso.", "Sucesso");
                $scope.showBtnSetAddress = false;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
     
        
        
        function GetAddress(latlng) {
            HelperFactory.getAddressFromCoords(latlng)
                .success(success)
                .catch(fail);
                
            function success(data){
                $scope.petshop.address = data[0];
                $scope.petshop.latitude = data[1];
                $scope.petshop.longitude = data[2];
                
                AddMarker(latlng);
                $scope.showBtnSetAddress = true;
            }
            
            function fail(error){
                for(var x = 0; x < error.data.errors.length; x++)
                    toastr.error(error.data.errors[x].value, error.data.errors[x].key);
            }
        }
        
        function AddMarker(latlng){
            if($scope.marker == null){
                $scope.marker = new L.marker(latlng, {
                    draggable: false
                }).addTo($scope.map);
                
                $scope.map.setZoom(18);
                $scope.map.setView(latlng);
            } else {
                $scope.marker.setLatLng(latlng);
                $scope.map.setZoom(18);
                $scope.map.setView(latlng);
            }
        }
        
        function New(){
            $state.go("admin.petshopCreate");
        }
    }
})();