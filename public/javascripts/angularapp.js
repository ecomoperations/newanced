var app = angular.module('myApp', ['infinite-scroll']);

app.filter('stripTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<(?:.|\n)*?>/gm, '') : '';
    };
});

app.controller('mainCtrl', function($scope, $http) {
   
     var allCats = [
        '/category/cda03552-3bb9-11e6-bfc3-842b2b482ce2', '/category/d63b6d9e-3bb9-11e6-bfc3-842b2b482ce2','/category/1e902a26-3bba-11e6-8b89-842b2b5a33d6',
         '/category/2434b7f8-3bba-11e6-877f-782bcb11749d', '/category/5f826cd8-3bba-11e6-877f-782bcb11749d','/category/64bd0758-3bba-11e6-bd3d-842b2b5a30e0',
        '/category/71d5c898-3bbb-11e6-bfc5-842b2b482ce2', '/category/77fac5ca-3bbb-11e6-9bdc-842b2b6f7849','/category/613dd168-3b31-11e6-bb4d-782bcb10f569',
         '/category/c3be12a2-3bb9-11e6-bb95-782bcb10f569','/category/09007af8-3bba-11e6-bd3c-842b2b5a30e0', '/category/0fbe7e44-3bba-11e6-bb95-782bcb10f569',
        '/category/456af554-3bba-11e6-bb95-782bcb10f569', '/category/4de58cda-3bba-11e6-bfc5-842b2b482ce2','/category/9624e0cc-3bba-11e6-877f-782bcb11749d',
         '/category/d17a9482-3bba-11e6-b88c-782bcb103767','/category/e32d826c-3bb9-11e6-9bdb-842b2b6f7849', '/category/ee43b16c-3bb9-11e6-a82b-782bcb10ee8c',
        '/category/f97aa432-3bb9-11e6-be01-782bcb102f71', '/category/fe6b8fe2-3bb9-11e6-877f-782bcb11749d','/category/2caf72f6-3bba-11e6-877f-782bcb11749d',
         '/category/30e61230-3bba-11e6-8b89-842b2b5a33d6','/category/7ba83050-3bba-11e6-be02-782bcb102f71', '/category/81ec195e-3bba-11e6-a82b-782bcb10ee8c'

    ];
    var catArray = [];
    for (var i=0; i <= (allCats.length - 1) ;i++) {

        
            $http.get(allCats[i]).then(function(response) {
                // console.log(response.data.length)
                // for (var x = 0; x <= 1; x++) {
                for (var x = (response.data.length - 1); x > (response.data.length - 3); --x) {
                    // console.log(response.data[x])
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
        console.log("being called")
        // ADD THE REST OF THE ALLPOSTS TO CATARRAY

        var resultArray1 = $scope.allData.filter(function(x) {
            // console.log(x.category)
            if ( x === undefined) {
                // console.log("come on")   
                return false
            }
            
            return x.category === $scope.filter1.category;
        });
        var resultArray2 = $scope.allData.filter(function(x) {
            // console.log(x.category)
            if ( x === undefined) {
                // console.log("come on")   
                return false
            }
            
            return x.category === $scope.filter2.category;
        });
        console.log(resultArray1.length)
        console.log(resultArray2.length)
     
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
              // for (var n = 1; n < 2; n++) {
        //         // var everyData = response.data.length;

        //         // for (var n = leng; n <= (leng + 4); n++) {
                    var nextOne = response.data.length - resultArray1.length - 1;
                    // console.log(nextOne)
                    // if ( nextOne >= 0) {
                // console.log("come on")   
                        $scope.allData.push(response.data[nextOne]);
                    // }
                    
        //         // }
        //         // console.log(leng)
              // }      // leng = leng + 4;
            });


            $http.get('/category/' + $scope.filter2.category).then(function(response) {
              // for (var iter = 1; iter < 2; iter++) {
        //         // var everyData = response.data.length;
        //         // for (var n = leng; n <= (leng + 4); n++) {
                    var nextOne2 = response.data.length - resultArray2.length - 1;
                    // console.log(nextOne2)
                    // if ( nextOne2 >= 0) {
                // console.log("come on")   
                    $scope.allData.push(response.data[nextOne2]);
                    // }
                    

        //         // }
        //         // console.log(leng)
              // }      // leng = leng + 4;
            });
        
    };

	
    $scope.links = [
        {name: 'Gun Control', category: ['30e61230-3bba-11e6-8b89-842b2b5a33d6', '2caf72f6-3bba-11e6-877f-782bcb11749d']}, // dem, repub
        {name: 'Death Penalty', category: ['fe6b8fe2-3bb9-11e6-877f-782bcb11749d', 'f97aa432-3bb9-11e6-be01-782bcb102f71']}, // support, against
        {name: 'Presidential Race', category: ['7ba83050-3bba-11e6-be02-782bcb102f71', '81ec195e-3bba-11e6-a82b-782bcb10ee8c']}, // dem, repub
        {name: 'Economics', category: ['0fbe7e44-3bba-11e6-bb95-782bcb10f569', '09007af8-3bba-11e6-bd3c-842b2b5a30e0']},
        {name: 'Abortion', category: ['c3be12a2-3bb9-11e6-bb95-782bcb10f569', '613dd168-3b31-11e6-bb4d-782bcb10f569']},
        {name: 'Taxes', category: ['77fac5ca-3bbb-11e6-9bdc-842b2b6f7849', '71d5c898-3bbb-11e6-bfc5-842b2b482ce2']},
        {name: 'Immigration', category: ['64bd0758-3bba-11e6-bd3d-842b2b5a30e0', '5f826cd8-3bba-11e6-877f-782bcb11749d']},
        {name: 'Foreign Policy', category: ['1e902a26-3bba-11e6-8b89-842b2b5a33d6', '2434b7f8-3bba-11e6-877f-782bcb11749d']},
        {name: 'Climate Change', category: ['cda03552-3bb9-11e6-bfc3-842b2b482ce2', 'd63b6d9e-3bb9-11e6-bfc3-842b2b482ce2']},
        {name: 'Health Care', category: ['4de58cda-3bba-11e6-bfc5-842b2b482ce2', '456af554-3bba-11e6-bb95-782bcb10f569']},
        {name: 'LGBT & Religious Rights', category: ['9624e0cc-3bba-11e6-877f-782bcb11749d', 'd17a9482-3bba-11e6-b88c-782bcb103767']},
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