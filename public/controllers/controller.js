var myApp = angular.module('myApp', []);


myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from our controller!");

    var refresh = function () {
        $http.get('/contactList')
            .success(function (data) {
                console.log("I got the data I requested");
                $scope.contactList = data;
                $scope.contact = ""; //reset input boxes
            });
    };

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact)
            .success(function (res) {
                console.log(res);
                refresh();
            });
    }

    $scope.remove = function (_id) {
        console.log(_id);
        $http.delete('/contactList/' + _id)
            .success(function (response) {
                refresh();
            })
    }

    $scope.edit = function (id) {
        console.log(id);

        $http.get('/contactList/' + id)
            .success(function (response) {
                console.log('response', response);
                $scope.contact = response;
            });
    }

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact)
            .success(function(response) {
                refresh();
            })
    }

    $scope.deselect = function() {
        $scope.contact = "";
    }

}]);