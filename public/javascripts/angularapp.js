var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope, $http) {
   
    $http.get('/posts')
    .then(function(response) {
        // console.log(response)
        $scope.allData = response.data;
        // $scope.gunControlAgainst = response.data.

    });

    $scope.filter1 = { };
	$scope.filter2 = { };
	
    
    // $scope.links = [
    //     {name: 'President', category: ['81ec195e-3bba-11e6-a82b-782bcb10ee8c', '7ba83050-3bba-11e6-be02-782bcb102f71']}, //rep, dem
    //     {name: 'Gun Control', category: ['30e61230-3bba-11e6-8b89-842b2b5a33d6', '2caf72f6-3bba-11e6-877f-782bcb11749d']}, // support, against
    //     {name: 'Death Penalty', category: ['fe6b8fe2-3bb9-11e6-877f-782bcb11749d', 'f97aa432-3bb9-11e6-be01-782bcb102f71']}, // support, against
    //     {name: 'Criminal Justice', category: ['e32d826c-3bb9-11e6-9bdb-842b2b6f7849', 'ee43b16c-3bb9-11e6-a82b-782bcb10ee8c']} //change, as-is
        
    // ];

  //   $scope.topicCall = function(x, y) {
  //   	$scope.filter1.category: x };
		// $scope.filter2.category: y };
  //   };
    // $http.get('/posts/:category_id')
    // .then(function(response) {
    //     // console.log(response)
    //     $scope.allData = response.data;
    // });
});