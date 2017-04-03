var app = angular.module('myApp', ['infinite-scroll']);

app.filter('stripTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<(?:.|\n)*?>/gm, '') : '';
    };
});

app.controller('mainCtrl', function($scope, $http) {
   
    $scope.scrollIsFree1 = true;
    $scope.scrollIsFree2 = true;

     var allCats = [
        '/category/783c020a-64d4-11e6-812b-842b2b482ce2', '/category/fa480a28-64d4-11e6-812b-842b2b482ce2','/category/34f02a7c-64d3-11e6-9ebd-842b2b5a2688',
         '/category/cee13c52-8693-11e6-8e98-842b2b5a33d6', '/category/7b5673e4-8694-11e6-bdcd-842b2b5a30e0','/category/d5e6f190-64d3-11e6-9d20-842b2b6f7849',
        '/category/ea43ad4a-64d3-11e6-812b-842b2b482ce2', '/category/28bc3f42-64d4-11e6-8d27-842b2b5a33d6','/category/3615ddba-64d4-11e6-9d20-842b2b6f7849',
         '/category/95740892-64d2-11e6-9ebd-842b2b5a2688','/category/76ece312-64d2-11e6-8d27-842b2b5a33d6', '/category/f14fd902-64d2-11e6-bf72-782bcb102f71',
        '/category/dfa4346e-64d2-11e6-a98f-782bcb10ee8c', '/category/06041a78-8695-11e6-be97-782bcb10f569','/category/fdeb488e-8694-11e6-9e8d-842b2b6f7849',
         '/category/a5d71e44-8693-11e6-9efe-842b2b5a2688','/category/8f889fe6-8693-11e6-80c5-782bcb102f71', '/category/8f3b496c-64d3-11e6-bd1d-782bcb10f569',
        '/category/7fe05f0c-64d3-11e6-812b-842b2b482ce2', '/category/fc226a0e-868b-11e6-8a2c-782bcb11749d','/category/f4111e50-868b-11e6-9e8d-842b2b6f7849',
         '/category/bd550fe4-8694-11e6-be97-782bcb10f569','/category/ae5bb6d2-8694-11e6-80c5-782bcb102f71', '/category/3d29b0dc-64d3-11e6-812b-842b2b482ce2'

    ];
    var catArray = [];
    for (var i=0; i <= (allCats.length - 1) ;i++) {

        
            $http.get(allCats[i]).then(function(response) {
                // console.log(response.data.length)
                // for (var x = 0; x <= 1; x++) {
                for (var x = (response.data.length - 1); x > (response.data.length - 3); --x) {
                    // console.log(response.data[x])
                    response.data[x].scrollIsFree = true;
                    // response.data[x].posts = [];
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
    console.log("$scope.allData",$scope.allData);
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

    $scope.filter1 = { category: '783c020a-64d4-11e6-812b-842b2b482ce2' };
    console.log("$scope.filter1", $scope.filter1);

	$scope.filter2 = { category: 'fa480a28-64d4-11e6-812b-842b2b482ce2' };


     $scope.addMoreFilter = function(itemId){
        if(!$scope.allData.scrollIsFree){
            return;
        }

        $scope.allData.scrollIsFree = false;

        /*var resultArray1 = $scope.allData.filter(function(x) {
            // console.log(x.category)
            if ( x === undefined) {
                // console.log("come on")   
                return false
            }
            
            return x.category === $scope.filter1.category;
        });*/

        $http.get('/category/' + $scope.allData.category).then(function(response) {
    
            //var nextOne = response.data.length - resultArray1.length - 1;
            $scope.allData = $scope.allData.concat(response.data);
            //$scope.allData.posts.push(response.data[nextOne]);
            $scope.allData.scrollIsFree = true;

        }).then(function(err) {
            $scope.allData.scrollIsFree = true;
        });

    }


    $scope.addMore = function() {
        // var last = (catArray.length - 1);
        // // console.log(last) == 47
        // var iterator = 0;
        
        // ADD THE REST OF THE ALLPOSTS TO CATARRAY

        // if(!$scope.scrollIsFree){
        //     return;
        // }

         $scope.scrollIsFree = false;


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
        console.log("being called")

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
              $scope.scrollIsFree = true;
            }).then(function(err) {
                $scope.scrollIsFree = true;
            });


            $http.get('/category/' + $scope.filter2.category).then(function(response) {
              // for (var iter = 1; iter < 2; iter++) {
                console.log("being called")
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
              $scope.scrollIsFree = true;
            }).then(function(err) {
                $scope.scrollIsFree = true;
            });
        
    };

	
    $scope.links = [
        {name: 'Gun Control', category: ['3d29b0dc-64d3-11e6-812b-842b2b482ce2', '34f02a7c-64d3-11e6-9ebd-842b2b5a2688']}, // dem, repub
        {name: 'Death Penalty', category: ['7b5673e4-8694-11e6-bdcd-842b2b5a30e0', 'cee13c52-8693-11e6-8e98-842b2b5a33d6']}, // support, against
        {name: 'Presidential Race', category: ['fa480a28-64d4-11e6-812b-842b2b482ce2', '783c020a-64d4-11e6-812b-842b2b482ce2']}, // dem, repub
        {name: 'Economics', category: ['f14fd902-64d2-11e6-bf72-782bcb102f71', 'dfa4346e-64d2-11e6-a98f-782bcb10ee8c']},
        {name: 'Abortion', category: ['06041a78-8695-11e6-be97-782bcb10f569', 'fdeb488e-8694-11e6-9e8d-842b2b6f7849']},
        {name: 'Taxes', category: ['a5d71e44-8693-11e6-9efe-842b2b5a2688', '8f889fe6-8693-11e6-80c5-782bcb102f71']},
        {name: 'Immigration', category: ['8f3b496c-64d3-11e6-bd1d-782bcb10f569', '7fe05f0c-64d3-11e6-812b-842b2b482ce2']},
        {name: 'Foreign Policy', category: ['fc226a0e-868b-11e6-8a2c-782bcb11749d', 'f4111e50-868b-11e6-9e8d-842b2b6f7849']},
        {name: 'Climate Change', category: ['bd550fe4-8694-11e6-be97-782bcb10f569', 'ae5bb6d2-8694-11e6-80c5-782bcb102f71']},
        {name: 'Health Care', category: ['95740892-64d2-11e6-9ebd-842b2b5a2688', '76ece312-64d2-11e6-8d27-842b2b5a33d6']},
        {name: 'LGBT & Religious Rights', category: ['28bc3f42-64d4-11e6-8d27-842b2b5a33d6', '3615ddba-64d4-11e6-9d20-842b2b6f7849']},
        {name: 'Criminal Justice', category: ['d5e6f190-64d3-11e6-9d20-842b2b6f7849', 'ea43ad4a-64d3-11e6-812b-842b2b482ce2']} //change, as-is
        
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