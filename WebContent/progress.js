App.controller('progress', ['$scope', '$http', '$state','$rootScope','$interval','$timeout', function($scope,$http,$state,$rootScope,$interval,$timeout) {
//alert('in employeeinfo to employee search controller');
        var self = this;

      self.activated = true;
      self.determinateValue = 30;
      // Iterate every 100ms, non-stop and increment
      // the Determinate loader.
      var jSonData = {
                          records: [
                          {
                          Name: "Alfreds Futterkiste",
                          City: "Berlin",
                          Country: "Germany"
                          },
                          {
                          Name: "Ana Trujillo Emparedados y helados",
                          City: "México D.F.",
                          Country: "Mexico"
                          },
                          {
                          Name: "Antonio Moreno Taquería",
                          City: "México D.F.",
                          Country: "Mexico"
                          },
                          {
                          Name: "Around the Horn",
                          City: "London",
                          Country: "UK"
                          },
                          {
                          Name: "B's Beverages",
                          City: "London",
                          Country: "UK"
                          },
                          {
                          Name: "Berglunds snabbköp",
                          City: "Luleå",
                          Country: "Sweden"
                          },
                          {
                          Name: "Blauer See Delikatessen",
                          City: "Mannheim",
                          Country: "Germany"
                          },
                          {
                          Name: "Blondel père et fils",
                          City: "Strasbourg",
                          Country: "France"
                          },
                          {
                          Name: "Bólido Comidas preparadas",
                          City: "Madrid",
                          Country: "Spain"
                          },
                          {
                          Name: "Bon app'",
                          City: "Marseille",
                          Country: "France"
                          },
                          {
                          Name: "Bottom-Dollar Marketse",
                          City: "Tsawassen",
                          Country: "Canada"
                          },
                          {
                          Name: "Cactus Comidas para llevar",
                          City: "Buenos Aires",
                          Country: "Argentina"
                          },
                          {
                          Name: "Centro comercial Moctezuma",
                          City: "México D.F.",
                          Country: "Mexico"
                          },
                          {
                          Name: "Chop-suey Chinese",
                          City: "Bern",
                          Country: "Switzerland"
                          },
                          {
                          Name: "Comércio Mineiro",
                          City: "São Paulo",
                          Country: "Brazil"
                          }
                          ]
                      };
      $scope.names = jSonData.records;
      
      $timeout(callAtTimeout,7000);


      function callAtTimeout() {
          self.activated = false;
      }
      
      $interval(function() {

        self.determinateValue += 1;
        if (self.determinateValue > 100) {
          self.determinateValue = 30;
        }

      }, 100);

}]);