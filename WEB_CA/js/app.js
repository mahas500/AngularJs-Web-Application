var app = angular.module('advertApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $("#menuDropdown").hide();
  var lvm = this;
  lvm.getData = function () {

    $http({
      method: "POST",
      url: "json_data/adverts.json"


    }).then(function mySuccess(response) {

      lvm.cars = response.data.cars;
      lvm.filtredCars = lvm.cars;
      console.log(lvm.cars)

    }, function myError(response) {
      $scope.myWelcome = response.statusText;
    });
  }

  lvm.getData();

  lvm.showSLiderData = function (car) {
    $("#contactForm").hide('slow')
    lvm.currentCar = car;
    lvm.currentCarImage = lvm.currentCar.images[0];

  }
  lvm.changeImage = function (index) {
    lvm.currentCarImage = lvm.currentCar.images[index];
  }
  lvm.showForm=function(){
    lvm.carName=lvm.currentCar.make+" "+lvm.currentCar.model;
    lvm.price=lvm.currentCar.price;
    $("#contactForm").toggle('slow')
  }

  lvm.isMakeFilterApplied = false;
  lvm.isYearFilterApplied = false;
  lvm.isPriceFilterApplied = false;

  lvm.showMakeDropdown=function(){
    $("#carMake").toggle('slow');

    $("#carYear").hide('slow');
    $("#carPrice").hide('slow');
  }

  lvm.showYearDropdown=function(){
    $("#carYear").toggle('slow');

    $("#carMake").hide('slow');
    $("#carPrice").hide('slow');
  }

  lvm.showPriceDropdown=function(){
    $("#carPrice").toggle('slow');

    $("#carYear").hide('slow');
    $("#carMake").hide('slow');
  }
  lvm.applyMakeFilter = function (carMake) {
   
    lvm.filtredCars = []
    if (carMake != null && carMake != undefined) {
      for (var i = 0; i < lvm.cars.length; i++) {
        if (lvm.cars[i].make === carMake) {

          lvm.filtredCars.push(lvm.cars[i]);
        }
      }
    } else {
      lvm.filtredCars = lvm.cars;
    }
    $("#carMake").toggle('slow');
  }

  lvm.applyYearFilter = function (year) {
    $("#carMake").hide('slow');
    $("#carPrice").hide('slow');
    lvm.filtredCars = []
    if (year != null && year != undefined) {
      for (var i = 0; i < lvm.cars.length; i++) {
        if (lvm.cars[i].year === year) {

          lvm.filtredCars.push(lvm.cars[i]);
        }

      }
    }
    else {
      lvm.filtredCars = lvm.cars;
    }
    $("#carYear").toggle('slow');
  }

  lvm.applyPriceFilter = function (priceMin, priceMax) {
    $("#carMake").hide('slow');
    $("#carYear").hide('slow');
    lvm.filtredCars = []
    if (priceMax != 0) {
      for (var i = 0; i < lvm.cars.length; i++) {
        if (lvm.cars[i].price > priceMin && lvm.cars[i].price < priceMax) {
          lvm.filtredCars.push(lvm.cars[i]);
        }

      }
    }
    else {
      lvm.filtredCars = lvm.cars;
    }
    $("#carPrice").toggle('slow');
  }

  $("#menuIcon").click(function(){
    $("#menuDropdown").toggle('slow');
  })
  $("#menuDropdown").click(function(){
    $("#menuDropdown").hide('slow');
  })

  lvm.submitForm =function(){
    lvm.errorMessage="";

    if(lvm.firstname==="" || lvm.firstname==null || lvm.firstname==undefined){
      lvm.errorMessage="First name cannot be empty";
    }else if(lvm.lastname==="" || lvm.lastname==null || lvm.lastname==undefined){
      lvm.errorMessage="Last name nannot be empty";
    }else if(lvm.email==="" || lvm.email==null || lvm.email==undefined){
      lvm.errorMessage="Please enter a proper email";
    }else if(lvm.contact==="" || lvm.contact==null || lvm.contact==undefined){
      lvm.errorMessage="Contact details cannot be empty";
    }else {
      alert("Request Submitted Succesfully");
      $("#contactForm").hide('slow');
    }
  }

});