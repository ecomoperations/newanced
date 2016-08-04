var app = angular.module('myApp', ['infinite-scroll']);

app.filter('stripTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<(?:.|\n)*?>/gm, '') : '';
    };
});

app.controller('mainCtrl', function($scope, $http) {
   
     var allCats = [
        '/category/30e61230-3bba-11e6-8b89-842b2b5a33d6', '/category/2caf72f6-3bba-11e6-877f-782bcb11749d','/category/fe6b8fe2-3bb9-11e6-877f-782bcb11749d',
         '/category/f97aa432-3bb9-11e6-be01-782bcb102f71', '/category/81ec195e-3bba-11e6-a82b-782bcb10ee8c','/category/7ba83050-3bba-11e6-be02-782bcb102f71',
        '/category/0fbe7e44-3bba-11e6-bb95-782bcb10f569', '/category/09007af8-3bba-11e6-bd3c-842b2b5a30e0','/category/613dd168-3b31-11e6-bb4d-782bcb10f569',
         '/category/c3be12a2-3bb9-11e6-bb95-782bcb10f569','/category/71d5c898-3bbb-11e6-bfc5-842b2b482ce2', '/category/77fac5ca-3bbb-11e6-9bdc-842b2b6f7849',
        '/category/5f826cd8-3bba-11e6-877f-782bcb11749d', '/category/64bd0758-3bba-11e6-bd3d-842b2b5a30e0','/category/1e902a26-3bba-11e6-8b89-842b2b5a33d6',
         '/category/2434b7f8-3bba-11e6-877f-782bcb11749d','/category/cda03552-3bb9-11e6-bfc3-842b2b482ce2', '/category/d63b6d9e-3bb9-11e6-bfc3-842b2b482ce2',
        '/category/4de58cda-3bba-11e6-bfc5-842b2b482ce2', '/category/456af554-3bba-11e6-bb95-782bcb10f569','/category/d17a9482-3bba-11e6-b88c-782bcb103767',
         '/category/9624e0cc-3bba-11e6-877f-782bcb11749d','/category/e32d826c-3bb9-11e6-9bdb-842b2b6f7849', '/category/ee43b16c-3bb9-11e6-a82b-782bcb10ee8c'

    ];
    var catArray = [];
    for (var i=0; i <= (allCats.length - 1) ;i++) {

        
            $http.get(allCats[i]).then(function(response) {
                for (var x=0; x<=1; x++) {

                    catArray.push(response.data[x])

                };
                // console.log(catArray.length)
            });
        
    };


    // allCats.forEach(function(cat) {
    //     var catArray = [];
    //     for (i=1;i<=2;i++) {
    //         $http.get(cat).then(function(response) {
    //             catArray.push(response.data[i])
    //         });
    //     };

    // });


    $scope.allData = catArray;
    // console.log($scope.allData.length)
    



    // $http.get('/posts').then(function(response) {
        // var array = response.data;
        // var articles = [];
        // for (var i=0; i<array.length; i++) {
        //     articles
        //     array[i].category

        //     articles.push(array[i])
        // };

        // array.forEach(function(x) {
        //     x.category.doesnotexist? ? {}.push(x) 
        // });
        

        // $scope.allData = response.data;
        // $scope.gunControlAgainst = response.data.

    // });

    $scope.filter1 = { category: '81ec195e-3bba-11e6-a82b-782bcb10ee8c' };
	$scope.filter2 = { category: '7ba83050-3bba-11e6-be02-782bcb102f71' };



    $scope.addMore = function() {
        // var last = (catArray.length - 1);
        // // console.log(last) == 47
        // var iterator = 0;

        // ADD THE REST OF THE ALLPOSTS TO CATARRAY

        var resultArray = catArray.filter(function(x) {
            // console.log(x.category)
            if ( x == undefined) {
                // console.log("come on")   
                return false
            }
            
            return x.category == $scope.filter1.category;
        });
        console.log(resultArray.length)
     
        // var result = [];
        // catArray.forEach(function(x) {
        //     if (x === undefined) result.push("hello");
        // });
        // console.log(result)

        // console.log(resultArray);
        // console.log(catArray.length)
        // console.log($scope.filter1)
        // // console.log(catArray[3])  
        // for (var n=0; n < catArray.length; n++) {
        //     console.log(catArray[n].category)
        //     var theCat = catArray[n].category;
        //   if ( theCat == $scope.filter1.category ) {
            
        //     iterator++
        //   }
        // }
        // console.log(iterator)


            $http.get('/category/' + $scope.filter1.category).then(function(response) {
        for (var n = 0; n < 2; n++) {
        //         // var everyData = response.data.length;
        //         // for (var n = leng; n <= (leng + 4); n++) {
            
                    catArray.push(response.data[n + resultArray.length])

        //         // }
        //         // console.log(leng)
              }      // leng = leng + 4;
            });


            $http.get('/category/' + $scope.filter2.category).then(function(response) {
        for (var i = 0; i < 2; i++) {
        //         // var everyData = response.data.length;
        //         // for (var n = leng; n <= (leng + 4); n++) {
            
                    catArray.push(response.data[i + resultArray.length])

        //         // }
        //         // console.log(leng)
              }      // leng = leng + 4;
            });
        
    };

	
    $scope.links = [
        {name: 'Gun Control', category: ['30e61230-3bba-11e6-8b89-842b2b5a33d6', '2caf72f6-3bba-11e6-877f-782bcb11749d']}, //rep, dem
        {name: 'Death Penalty', category: ['fe6b8fe2-3bb9-11e6-877f-782bcb11749d', 'f97aa432-3bb9-11e6-be01-782bcb102f71']}, // support, against
        {name: 'Presidential Race', category: ['81ec195e-3bba-11e6-a82b-782bcb10ee8c', '7ba83050-3bba-11e6-be02-782bcb102f71']}, // support, against
        {name: 'Economics', category: ['0fbe7e44-3bba-11e6-bb95-782bcb10f569', '09007af8-3bba-11e6-bd3c-842b2b5a30e0']},
        {name: 'Abortion', category: ['613dd168-3b31-11e6-bb4d-782bcb10f569', 'c3be12a2-3bb9-11e6-bb95-782bcb10f569']},
        {name: 'Taxes', category: ['71d5c898-3bbb-11e6-bfc5-842b2b482ce2', '77fac5ca-3bbb-11e6-9bdc-842b2b6f7849']},
        {name: 'Immigration', category: ['5f826cd8-3bba-11e6-877f-782bcb11749d', '64bd0758-3bba-11e6-bd3d-842b2b5a30e0']},
        {name: 'Foreign Policy', category: ['1e902a26-3bba-11e6-8b89-842b2b5a33d6', '2434b7f8-3bba-11e6-877f-782bcb11749d']},
        {name: 'Climate Change', category: ['cda03552-3bb9-11e6-bfc3-842b2b482ce2', 'd63b6d9e-3bb9-11e6-bfc3-842b2b482ce2']},
        {name: 'Health Care', category: ['4de58cda-3bba-11e6-bfc5-842b2b482ce2', '456af554-3bba-11e6-bb95-782bcb10f569']},
        {name: 'LGBT & Religious Rights', category: ['d17a9482-3bba-11e6-b88c-782bcb103767', '9624e0cc-3bba-11e6-877f-782bcb11749d']},
        {name: 'Criminal Justice', category: ['e32d826c-3bb9-11e6-9bdb-842b2b6f7849', 'ee43b16c-3bb9-11e6-a82b-782bcb10ee8c']} //change, as-is
        
    ];

    $scope.categoryFunction = function(post) {
        var topicName = "Topic"
        $scope.links.forEach(function(x) {
            if (post.category == x.category[0] || post.category == x.category[1]) {
               topicName = x.name;
            } 
        });
        return topicName;
    };
    
    
    

    

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