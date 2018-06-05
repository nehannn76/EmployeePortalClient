angular.module('appRoutes', ['ui.router','ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  $urlRouterProvider.otherwise("/login");
        
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "./Login.html",
  controller : "login"
    })
.state('signup', {
      url: "/signup",
      templateUrl: "./signup.html",
  controller : "signup"
    })
.state('showemployee', {
      url: "/showemployee",
      templateUrl: "./showemployee.html",
  controller : "showemployee"
    })
.state('showEmpForAdmin', {
      url: "/showEmpForAdmin",
      templateUrl: "./showEmpForAdmin.html",
  controller : "showemployee"
    })
    
    .state('EmployeeUpdate', {
      url: "/EmployeeUpdate",
      templateUrl: "./EmployeeUpdate.html",
  controller : "EmployeeUpdate"
    })
.state('employeeinfo', {
      url: "/employeeinfo",
      templateUrl: "./employeeinfo.html",
 controller : "employeeinfo"
    })
.state('progress', {
      url: "/progress",
      templateUrl: "./progress.html",
 controller : "progress"
    });
    
    

});

var App = angular.module('myApp',['appRoutes']);



App.controller('login', ['$scope', '$http', '$state','$rootScope','$interval','$timeout', function($scope,$http,$state,$rootScope,$interval,$timeout) {
//alert('in controller');
 
  $scope.login=function($timeout){
   var self = this;
  self.activated = true;
  self.determinateValue = 1;

  var login={email:$scope.email,
          password:$scope.password };
  
  $http({
  method:'POST',
  url:'http://emp-portal-server1.apps-azurestack.amosdemo.io/login',
  data:login,
  header:{'Content-Type':'application/json'}
  }).success(function (data, status, headers, config) {
     self.activated = false;
        //alert('success');
$rootScope.employee=data;
if(data.email=="admin@gmail.com")
{
$state.transitionTo('signup');
}
else
{
$state.transitionTo('employeeinfo');
}
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    });
};


 $interval(function() {
                        self.determinateValue += 1;
                        if (self.determinateValue > 100) {
                          self.determinateValue = 30;
                           }

                       }, 100);
                       
$timeout(callAtTimeout,7000);


      function callAtTimeout() {
          self.activated = false;
      }



}]);








App.controller('signup', ['$scope', '$http', '$state','$rootScope', function($scope,$http,$state,$rootScope) {
//alert('in signup controller');
$scope.signup=function(){
var signup={
  id:$scope.id,
  name:$scope.name,
  location:$scope.location,
  contactno:$scope.contactno,
  email:$scope.email,
    password:$scope.password,
  orgunit:$scope.orgunit,
  skills:$scope.skills,
  project:$scope.project   
  };
  
  
  $http({
  method:'POST',
  url:'http://emp-portal-server1.apps-azurestack.amosdemo.io/login',
  data:signup,
  header:{'Content-Type':'application/json'}
  }).success(function (data, status, headers, config) {
        alert('success!!! Employee Registerd !!!');
$rootScope.employee=data;
$state.transitionTo('signup');
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    });
};

$scope.showEmpForAdmin=function()
{
$state.transitionTo('showEmpForAdmin');
};

$scope.logout=function()
{
$rootScope.employee="";
$state.transitionTo('login');
};
  
  
  
  
}]);



App.controller('employeeinfo', ['$scope', '$http', '$state','$rootScope', function($scope,$http,$state,$rootScope) {
//alert('in employeeinfo to employee search controller');
$scope.search=function(){
//alert('in employeeinfo function');
$state.transitionTo('showemployee');
} ;


$scope.logout=function()
{
$rootScope.employee="";
$state.transitionTo('login');
};
  

}]);




App.controller('showemployee', ['$scope', '$http', '$state','$rootScope','$interval', function($scope,$http,$state,$rootScope,$interval) {
//alert('in showemployee controller !!! READY TO fetch');
  var self = this;
  self.activated = true;
  self.determinateValue = 1;
  $http({
  method:'GET',
  url:'http://emp-portal-server1.apps-azurestack.amosdemo.io/login',
  
  }).success(function (data, status, headers, config) {
      //alert('success!!! Employee Fetched !!!');

      $scope.employees=data;
      self.activated = false;
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    });
$scope.remove=function(id,index){
confirm('Do yo Want to DELETE Employee: employee id'+id);
$http({
  method:'DELETE',
  url:'http://http://emp-portal-server1.apps-azurestack.amosdemo.io/login/delete/'+id
  
  }).success(function (data, status, headers, config) {
        //alert('success!!! Employee Fetched !!!');
$scope.employees.splice(index,1);
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    });
};

$scope.edit=function(id){
$rootScope.updateId=id;
alert('id'+$rootScope.updateId);
$state.transitionTo('EmployeeUpdate');
} ;

$scope.logout=function()
{
$rootScope.employee="";
$state.transitionTo('login');
};

 $interval(function() {
                        self.determinateValue += 1;
                        if (self.determinateValue > 100) {
                          self.determinateValue = 30;
                           }

                       }, 100);

}]);




App.controller('EmployeeUpdate', ['$scope', '$http', '$state','$rootScope', function($scope,$http,$state,$rootScope) {
//alert('in EmployeeUpdate controller !!! READY TO fetch');
//alert('id in employee update'+$rootScope.updateId);
var uid=$rootScope.updateId;
$http({
  method:'GET',
  url:'http://emp-portal-server1.apps-azurestack.amosdemo.io/login/getEmployeeInfo/'+uid
  
  }).success(function (data, status, headers, config) {
        alert('success!!! Employee Information Fetched !!!');
        $scope.employee = data;
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
        uid="";
        $rootScope.updateId="";
    });


$scope.update=function(){
var employeeupdatedata={
  id:$scope.employee.id,
  name:$scope.employee.name,
  location:$scope.employee.location,
  contactno:$scope.employee.contactno,
  email:$scope.employee.email,
    password:$scope.employee.password,
  orgunit:$scope.employee.orgunit,
  skills:$scope.employee.skills,
  project:$scope.employee.project   
  };
  

  $http({
  method:'POST',
  url:'http://emp-portal-server1.apps-azurestack.amosdemo.io/login/updateEmployee',
  data:employeeupdatedata,
  header:{'Content-Type':'application/json'}
  }).success(function (data, status, headers, config) {
        alert('success!!! Employee Info. Updated!!!');
$rootScope.employee=data;
$state.transitionTo('showEmpForAdmin');
    }).error(function (data, status, headers, config) {
        alert(JSON.stringify(data));
    });
};

$scope.logout=function()
{
$rootScope.employee="";
$state.transitionTo('login');
};

}]);

