var app = angular.module('myApp', ['infinite-scroll', 'ui.router']);


// RSS feed returns HTML with extra characters let's get rid of those

app.filter('stripTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<(?:.|\n)*?>/gm, '') : '';
    };
});


// We want different URL routes for UX

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/trump');

  var gunControlState = {
    name: 'guncontrol',
    url: '/guncontrol',
    params: {
      libCat: "3d29b0dc-64d3-11e6-812b-842b2b482ce2",
      conCat: "34f02a7c-64d3-11e6-9ebd-842b2b5a2688"
    },
    controller: 'mainCtrl',
    templateUrl: '/guncontrol.html'
  }

  var trumpState = {
    name: 'trump',
    url: '/trump',
    params: {
      libCat: "fa480a28-64d4-11e6-812b-842b2b482ce2",
      conCat: "783c020a-64d4-11e6-812b-842b2b482ce2"
    },
    controller: 'mainCtrl',
    templateUrl: '/trump.html'
  }

  var deathPenaltyState = {
    name: 'deathpenalty',
    url: '/deathpenalty',
    params: {
      libCat: "7b5673e4-8694-11e6-bdcd-842b2b5a30e0",
      conCat: "cee13c52-8693-11e6-8e98-842b2b5a33d6"
    },
    controller: 'mainCtrl',
    templateUrl: '/deathpenalty.html'
  }


  var economicsState = {
    name: 'economics',
    url: '/economics',
    params: {
      libCat: "f14fd902-64d2-11e6-bf72-782bcb102f71",
      conCat: "dfa4346e-64d2-11e6-a98f-782bcb10ee8c"
    },
    controller: 'mainCtrl',
    templateUrl: '/economics.html'
  }

  var abortionState = {
    name: 'abortion',
    url: '/abortion',
    params: {
      libCat: "06041a78-8695-11e6-be97-782bcb10f569",
      conCat: "fdeb488e-8694-11e6-9e8d-842b2b6f7849"
    },
    controller: 'mainCtrl',
    templateUrl: '/abortion.html'
  }

  var taxesState = {
    name: 'taxes',
    url: '/taxes',
    params: {
      libCat: "a5d71e44-8693-11e6-9efe-842b2b5a2688",
      conCat: "8f889fe6-8693-11e6-80c5-782bcb102f71"
    },
    controller: 'mainCtrl',
    templateUrl: '/taxes.html'
  }

  var immigrationState = {
    name: 'immigration',
    url: '/immigration',
    params: {
      libCat: "8f3b496c-64d3-11e6-bd1d-782bcb10f569",
      conCat: "7fe05f0c-64d3-11e6-812b-842b2b482ce2"
    },
    controller: 'mainCtrl',
    templateUrl: '/immigration.html'
  }

  var foreignPolicyState = {
    name: 'foreignpolicy',
    url: '/foreignpolicy',
    params: {
      libCat: "fc226a0e-868b-11e6-8a2c-782bcb11749d",
      conCat: "f4111e50-868b-11e6-9e8d-842b2b6f7849"
    },
    controller: 'mainCtrl',
    templateUrl: '/foreignpolicy.html'
  }

  var climateChangeState = {
    name: 'climatechange',
    url: '/climatechange',
    params: {
      libCat: "bd550fe4-8694-11e6-be97-782bcb10f569",
      conCat: "ae5bb6d2-8694-11e6-80c5-782bcb102f71"
    },
    controller: 'mainCtrl',
    templateUrl: '/climatechange.html'
  }

  var healthCareState = {
    name: 'healthcare',
    url: '/healthcare',
    params: {
      libCat: "95740892-64d2-11e6-9ebd-842b2b5a2688",
      conCat: "76ece312-64d2-11e6-8d27-842b2b5a33d6"
    },
    controller: 'mainCtrl',
    templateUrl: '/healthcare.html'
  }

  var lgbtreligiousState = {
    name: 'lgbtreligious',
    url: '/lgbtreligious',
    params: {
      libCat: "3615ddba-64d4-11e6-9d20-842b2b6f7849",
      conCat: "28bc3f42-64d4-11e6-8d27-842b2b5a33d6"
    },
    controller: 'mainCtrl',
    templateUrl: '/lgbtreligious.html'
  }

  var criminalJusticeState = {
    name: 'criminaljustice',
    url: '/criminaljustice',
    params: {
      libCat: "ea43ad4a-64d3-11e6-812b-842b2b482ce2",
      conCat: "d5e6f190-64d3-11e6-9d20-842b2b6f7849"
    },
    controller: 'mainCtrl',
    templateUrl: '/criminaljustice.html'
  }

  $stateProvider.state(trumpState);
  $stateProvider.state(deathPenaltyState);
  $stateProvider.state(gunControlState);
  $stateProvider.state(criminalJusticeState);
  $stateProvider.state(lgbtreligiousState);
  $stateProvider.state(healthCareState);
  $stateProvider.state(climateChangeState);
  $stateProvider.state(foreignPolicyState);
  $stateProvider.state(immigrationState);
  $stateProvider.state(taxesState);
  $stateProvider.state(abortionState);
  $stateProvider.state(economicsState);
});


// factory called when implementing infinite scroll 
// one page for each side, http call 

app.factory('catFactory', function($http) {
  var catFactory = function() {
    this.items = [];
    this.busy = false;
    this.page = 1;
    this.page2 = 1;
   
  };

  catFactory.prototype.page1 = function() {
    this.page = 0;
  };

  catFactory.prototype.page2 = function() {
    this.page2 = 0;
  };

  catFactory.prototype.nextPage = function(x) {
    
    if (this.busy) return;
    
        this.busy = true;

    $http.get('/category/' + x).then(function(response) {

      var posts = response.data.reverse();

      for (var i = this.page; i < (this.page + 3); i++) {
        this.items.push(posts[i]);
        console.log(i)
      }
      this.page = this.page + 3;

      this.busy = false;

    }.bind(this));
  };

  catFactory.prototype.nextPage2 = function(x) {
    
    if (this.busy) return;
    
        this.busy = true;

    $http.get('/category/' + x).then(function(response) {

      var posts = response.data.reverse();  

      for (var i = this.page2; i < (this.page2 + 3); i++) {
        this.items.push(posts[i]);
        console.log(i)
      }
      this.page2 = this.page2 + 3;

      this.busy = false;

    }.bind(this));
  };

  return catFactory;
});

// Main Angular controller one-pager

app.controller('mainCtrl', function($scope, $http, catFactory, $stateParams) {


    $scope.filter1 = { category: $stateParams.libCat || "783c020a-64d4-11e6-812b-842b2b482ce2"};
    $scope.filter2 = { category: $stateParams.conCat || "fa480a28-64d4-11e6-812b-842b2b482ce2"};

    $scope.catFactory = new catFactory();    

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
                for (var x = (response.data.length - 1); x > (response.data.length - 3); --x) {
                    
                    response.data[x].scrollIsFree = true;
                    
                     $scope.catFactory.items.push(response.data[x])
                };
                
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


    // just naming the category on card

    $scope.categoryFunction = function(post) {
        var topicName = "Topic"
        $scope.links.forEach(function(x) {
            if (post.category == x.category[0] || post.category == x.category[1]) {
               topicName = x.name;
            } 
        });
        return topicName;
    };
    
  
    

    

  
});