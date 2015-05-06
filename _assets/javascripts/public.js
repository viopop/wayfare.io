angular.module('truncate', [])
.filter('characters', function () {
    return function (input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ');
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            }else{
                while(input.charAt(input.length-1) === ' '){
                    input = input.substr(0, input.length -1);
                }
            }
            return input + '...';
        }
        return input;
    };
})
.filter('words', function () {
    return function (input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            var inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '...';
            }
        }
        return input;
    };
});

angular.module("WayfareApp", ['truncate']).config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
}]);

angular.module("WayfareApp").filter('linebreaks', function() {
  return function(text) {
    return text.replace(/\n/g, '<br>');
  };
});

angular.module("WayfareApp").filter('https', function() {
  return function(text) {
    return text.replace(/^http:\/\//, 'https://');
  };
});

angular.module('WayfareApp').controller("ContactFormController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.contactInfo = {}
  $scope.submit = function() {
    $http.post("/contact.json", $scope.contactInfo).success(function() {
      $scope.submitSuccess = true;
      $scope.contactInfo = {}
      $timeout(function() {
        $scope.submitSuccess = null;
      }, 3000)
    }).error(function(response) {
      $scope.error = response.error;
    });
  }
}]);

angular.module('WayfareApp').factory('TicketLeap', ['$http', function($http) {
  return function() {
    return $http.jsonp("https://public-api.ticketleap.com/organizations/wayfare/events?key=7331436096006273&page_size=50&callback=JSON_CALLBACK")
  };
}]);

angular.module("WayfareApp").controller("EventsController", ['$scope', 'TicketLeap', function($scope, TicketLeap) {
  $scope.events = [];
  TicketLeap().success(function(data) {
    $scope.events = data.events;
    $scope.events.push({ name: "Type Workout", url: "http://orangecounty.aiga.org/event/typeed-workout/", hero_small_image_url: "/event-images/typed.jpg", description: "Build your design strength and typographic endurance with our full-body-copy workout routine for designers. By the end of the day, you'll know how to take down unbalanced kerning and expertly handle type like it's second nature.\n\nThe day will start with Type 2 demonstrations and train you to defend yourself against the likes of bad design habits by rapidly recognizing type categories, characteristics and choosing faces to improve readability. Afterwards, recruits will be challenged with repetitive design drills in a two-hour boot camp that helps designers build typography systems the right way.", earliest_start_local: "06 Jun 2015 11:00:00", earliest_end_local: "06 Jun 2015 17:30:00" })
    $scope.events.push({ name: "POPPYjack: Calligraphy for Beginners", url: "http://www.poppyjackshop.com/calligraphy-classes/may-23-orange-county", hero_small_image_url: "/event-images/poppyjack.jpg", description: "Wayfare is hosting POPPYjack Shop's workshop called \"Calligraphy for Beginners\". This class is 2.5 hours and will cover the basics of calligraphy including her personal style of alphabet. A supply kit will be provided to use during the class as well as to take home and continue practicing!", earliest_start_local: "23 May 2015 15:00:00", earliest_end_local: "23 May 2015 17:30:00" })
    $scope.events.push({ name: "POPPYjack: Calligraphy for Beginners", url: "http://www.poppyjackshop.com/calligraphy-classes/may-23-orange-county", hero_small_image_url: "/event-images/poppyjack.jpg", description: "Wayfare is hosting POPPYjack Shop's workshop called \"Calligraphy for Beginners\". This class is 2.5 hours and will cover the basics of calligraphy including her personal style of alphabet. A supply kit will be provided to use during the class as well as to take home and continue practicing!", earliest_start_local: "23 May 2015 10:00:00", earliest_end_local: "23 May 2015 12:30:00" })
    $scope.events.push({ name: "Watercolor & Wine Workshop with K.Mala Studios", url: "http://www.kmalastudio.com/product/watercolor-and-wine-april-15th", hero_small_image_url: "/event-images/kmala-watercolor-wine.jpg", description: "Come explore your creativity and have fun with watercolors, new friends and wine! Hosted by Kimberly Malachowski, the Laguna Beach watercolor artist behind K.Mala Studio. No painting experience is necessary, this class is designed for beginners to have fun. All ages welcome, wine will be available for those over 21 years of age and older. We provide everything you need including a variety of paper, brushes, pencils, erasers, paint, and of course wine! You will take home one to three finished watercolor paintings and your own travel watercolor palette. You will learn basic techniques of watercolor painting including the color wheel and mixing colors, gradient washes, wet into wet painting, exploration of materials and a step-by step process for establishing a landscape painting and spring themed art. Bring your best friend, boyfriend or mom.. It's a fun night for everyone! Class is limited to 20 spots, so register soon!", earliest_start_local: "15 Apr 2015 19:00:00", earliest_end_local: "15 Apr 2015 21:00:00" });
  }).error(function() {
    console.log("Error loading events");
  });
  $scope.convertToDate = function(date) {
    return Date.parse(date);
  }
  $scope.sortDate = function(event) {
    return Date.parse(event.earliest_start_local);
  }
  $scope.pastEvents = function(value, index) {
    if ($scope.convertToDate(value.earliest_start_local) < (new Date())) {
      return true;
    }
  }
  $scope.futureEvents = function(value, index) {
    if ($scope.convertToDate(value.earliest_start_local) >= (new Date())) {
      return true;
    }
  }
}]);


angular.module("WayfareApp").factory('Instagram', ['$http', function($http) {
  return function() {
    return $http.jsonp("https://api.instagram.com/v1/users/self/media/recent?access_token=1132399196.5c5985b.a93eb21d79f843e6964d05839c4b2d21&client_id=5c5985b918f54be8ae355517c35b40f6&callback=JSON_CALLBACK")
  }
}]);

angular.module("WayfareApp").controller("PhotosController", ['$scope', 'Instagram', function($scope, Instagram) {
  $scope.photos = [];
  Instagram().success(function(data) {
    $scope.photos = data.data;
  }).error(function() {
    console.log("Error loading Instagram");
  });
}]);
