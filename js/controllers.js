angular.module('app.controllers', [])

  .controller('loginCtrl', function ($scope, $state, $ionicViewSwitcher) {
    $scope.login = true;
    $scope.signSelect = function () {
      $scope.login = !$scope.login;
    };

    $scope.loginSys = function () {
      $state.go('main.home');
      // $ionicViewSwitcher.nextDirection("forward");
    }
  })
  .controller('mainCtrl', function ($scope, $state, $http, $q, $ionicViewSwitcher) {
    $scope.name = '管理员';

    $scope.nowModule = 1;
    $scope.headShow = true;
    $scope.footerShow = true;
    $scope.moduleChange = function (module_id, room_id) {
      // if($scope.nowModule!=module_id){
      console.log(module_id + '--' + room_id);
      switch (module_id) {
        case 0:
          $state.go('login', {reload: true});
          break;
        case 1:
          switch (room_id) {
            case 1:
              $state.go('main.room1', {reload: true});
              break;
            case 2:
              $state.go('main.room2', {reload: true});
              break;
            case 3:
              $state.go('main.room3', {reload: true});
              break;
            case 4:
              $state.go('main.room4', {reload: true});
              break;
            case 5:
              $state.go('main.room5', {reload: true});
              break;
            case 6:
              $state.go('main.room6', {reload: true});
              break;
            default:
              $state.go('main.home', {reload: true});
              break;
          }
          break;
        case 2:
          $state.go('main.society', {reload: true});
          break;
        case 3:
          $state.go('main.life', {reload: true});
          break;
        case 4:
          $state.go('main.neighbor', {reload: true});
          break;
        default:
          $state.go('login', {reload: true});
          break;
      }

      $scope.nowModule = module_id;
      // }
    };
    $scope.footerStatus = function (status) {
      $scope.footerShow = status;
    };
    $scope.headStatus = function (status) {
      $scope.headShow = status;
    };
    $scope.icon_on = 0;
    $scope.iconChange = function (icon_id) {
      $scope.icon_on = icon_id;
    };

    $scope.loginOut = function () {

      $scope.moduleChange(0, 0);
      // $ionicViewSwitcher.nextDirection("back");
    };

    $scope.footerStatus = function (status, $event) {
      $scope.footerShow = status;
    };
    
    $scope.sendHttpRequest = function (room_id, deviceId, value) {
      var deferred = $q.defer();
      $http({
        url: 'http://120.24.45.231:3000/control',
        method: "POST",
        data: {
          // room_id:'301',deviceId:'22ff33xxdd',value:'00ff'
          room_id: room_id, deviceId: deviceId, value: value
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }

      }).success(function (data) {
        if (data.code == 200) {
          deferred.resolve(data);
        }
        else {
          deferred.reject(data.message);
        }
      }).error(function (data) {
        deferred.reject(data.message);
      });
      return deferred.promise;
    };
  })
  .controller('homeCtrl', function ($scope, $state) {
    $scope.headShow = true;
    $scope.moduleChange(1);

    $scope.infoState = 1;
    $scope.infoStateChange = function (info_id) {
      $scope.infoState = info_id;
    };

    $scope.controlState = 1;
    $scope.controlStateChange = function (control_id) {
      $scope.controlState = control_id;
    };
  })
  /**
   * 儿童房Controller
   */
  .controller('room1Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 1);


    $scope.switchConfig = [
      {index: 1, name: '窗帘', device_id: '0B141152', state: false},  //儿童房窗帘|小孩房窗帘|小孩房纱帘
      {index: 2, name: '台灯', device_id: '022C0FB7', state: false},  //儿童房灯|小孩房灯|儿童房阳台灯|小孩房阳台灯
      {index: 3, name: '主灯', device_id: '021C0FB7', state: false},  //儿童房灯|小孩房灯|儿童房主灯|小孩房主灯
      {index: 4, name: '空调', device_id: '', state: false},
      {index: 5, name: '电器', device_id: '', state: false}
    ];
    $scope.switchState = {
      open: '00ff',
      close: '0000'
    };

    $scope.clickHandle = function (item) {
      if (item.device_id == "") {
        alert('未获取到设备号!');
        return;
      }
      item.state = !item.state;
      var room_id = "301";
      var device_id = "";
      var value = "";
      device_id = item.device_id;
      if (item.state) {
        value = $scope.switchState.close;
      }
      else {
        value = $scope.switchState.open;
      }
      $scope.sendHttpRequest(room_id, device_id, value).then(function (data) {
        if (data.code == 200) {

        }
        else {
          item.state = !item.state;
          alert(data.data.content);
        }
      })
    };


  })
  /**
   * 次卧Controller
   */
  .controller('room2Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 2);

  })
  /**
   * 主卧Controller
   */
  .controller('room3Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 3);



    $scope.switchConfig = [
      {index: 1, name: '风扇', device_id: '', state: false},
      {index: 2, name: '射灯', device_id: '023C0FFF', state: false},
      {index: 3, name: '窗帘', device_id: '', state: false},
      {index: 4, name: '台灯', device_id: '024C0FFF', state: false},
      {index: 5, name: '主灯', device_id: '021C0FFF', state: false},
      {index: 6, name: '灯带', device_id: '024C0FFF', state: false},
      {index: 7, name: '窗帘', device_id: '0B241161', state: false},
      {index: 8, name: '空调', device_id: '', state: false},
      {index: 9, name: '电器', device_id: '', state: false}
    ];
    $scope.switchState = {
      open: '00ff',
      close: '0000'
    };

    $scope.clickHandle = function (item) {
      if (item.device_id == "") {
        alert('未获取到设备号!');
        return;
      }
      item.state = !item.state;
      var room_id = "301";
      var device_id = "";
      var value = "";
      device_id = item.device_id;
      if (item.state) {
        value = $scope.switchState.close;
      }
      else {
        value = $scope.switchState.open;
      }
      $scope.sendHttpRequest(room_id, device_id, value).then(function (data) {
        if (data.code == 200) {

        }
        else {
          item.state = !item.state;
          alert(data.data.content);
        }
      })
    };
  })

  /**
   * 厨房Controller
   */
  .controller('room4Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 4);


    $scope.switchConfig = [
      {index: 1, name: '厨房灯', device_id: '02105153', state: false}
    ];
    $scope.switchState = {
      open: '00ff',
      close: '0000'
    };

    $scope.clickHandle = function (item) {
      if (item.device_id == "") {
        alert('未获取到设备号!');
        return;
      }
      item.state = !item.state;
      var room_id = "301";
      var device_id = "";
      var value = "";
      device_id = item.device_id;
      if (item.state) {
        value = $scope.switchState.close;
      }
      else {
        value = $scope.switchState.open;
      }
      $scope.sendHttpRequest(room_id, device_id, value).then(function (data) {
        if (data.code == 200) {

        }
        else {
          item.state = !item.state;
          alert(data.data.content);
        }
      })
    };


  })
  /**
   * 餐厅Controller
   */
  .controller('room5Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 5);

    $scope.switchConfig = [
      {index: 1, name: '主灯', device_id: '021C1070', state: false},
      {index: 2, name: '射灯', device_id: '022C153D', state: false},
      {index: 3, name: '灯带', device_id: '023C153D', state: false}
    ];
    $scope.switchState = {
      open: '00ff',
      close: '0000'
    };

    $scope.clickHandle = function (item) {
      if (item.device_id == "") {
        alert('未获取到设备号!');
        return;
      }
      item.state = !item.state;
      var room_id = "301";
      var device_id = "";
      var value = "";
      device_id = item.device_id;
      if (item.state) {
        value = $scope.switchState.close;
      }
      else {
        value = $scope.switchState.open;
      }
      $scope.sendHttpRequest(room_id, device_id, value).then(function (data) {
        if (data.code == 200) {

        }
        else {
          item.state = !item.state;
          alert(data.data.content);
        }
      })
    };

  })
  /**
   * 客厅Controller
   */
  .controller('room6Ctrl', function ($scope, $state) {
    $scope.moduleChange(1, 6);

    $scope.switchConfig = [
      {index: 1, name: '主灯', device_id: '021C0FF7', state: false},
      {index: 2, name: '壁灯', device_id: '022C1079', state: false},
      {index: 3, name: '灯带', device_id: '023C1079', state: false},
      {index: 4, name: '射灯', device_id: '024C1079', state: false},
      {index: 5, name: '阳台灯', device_id: '02105169', state: false}
    ];
    $scope.switchState = {
      open: '00ff',
      close: '0000'
    };

    $scope.clickHandle = function (item) {
      if (item.device_id == "") {
        alert('未获取到设备号!');
        return;
      }
      item.state = !item.state;
      var room_id = "301";
      var device_id = "";
      var value = "";
      device_id = item.device_id;
      if (item.state) {
        value = $scope.switchState.close;
      }
      else {
        value = $scope.switchState.open;
      }
      $scope.sendHttpRequest(room_id, device_id, value).then(function (data) {
        if (data.code == 200) {

        }
        else {
          item.state = !item.state;
          alert(data.data.content);
        }
      })
    };

  })


  .controller('societyCtrl', function ($scope, $state) {
    $scope.moduleChange(2, 0);
  }).controller('lifeCtrl', function ($scope, $state) {
    $scope.moduleChange(3, 0);
}).controller('neighborCtrl', function ($scope, $state) {
  $scope.headStatus(false);
  $scope.moduleChange(4, 0);
}).controller('roomCtrl', function ($scope, $state) {

});
