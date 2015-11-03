angular.module('rateApp', [ 'ionic', 'firebase']).
run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).
controller('clientController', ['$scope', '$firebase', function ($scope, $firebase) {
    $scope.data = {};
    var ref = new Firebase("https://wingoldnext.firebaseio.com/path");
    // create an AngularFire reference to the data
    
    var sync = $firebase(ref);
    // download the data into a local object
    //var syncObject = sync.$asObject();

    // download the data into a local object
    var syncObject = sync.$asObject();
    
    $scope.items = [
        { "Name": "1 KG 995", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 995, "Margin": 10, Rate: 0 },
        { "Name": "TTB", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 116.52336, "Margin": 12, Rate: 0 },
        { "Name": "1 Oz", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 31.1034, "Margin": 14, Rate: 0 },
        { "Name": "100 GM", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 100, "Margin": 8, Rate: 0 },
        { "Name": "50 GM", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 50, "Margin": 33, Rate: 0 },
        { "Name": "20 GM", "UOMConFactor": 31.1034, "USDExRate": 3.674, "Weight": 20, "Margin": 12, Rate: 0 }
    ];

    
    $scope.$watch('data', function (newValue, oldValue) {
        if (newValue === oldValue) { return; }
        angular.forEach($scope.items, function(item, key) {
            item.Rate = Number(((((newValue.value / item.UOMConFactor) * item.USDExRate) * item.Weight) + item.Margin).toFixed(2));
        })
    });

    $scope.gridOptions = {
        data: 'items',
        columnDefs: [{ field: 'Name', displayName: 'Item' },
                     { field: 'Rate', displayName: 'Rate', width: 180 }]
    };
    syncObject.$bindTo($scope, "data");

    



}]);

