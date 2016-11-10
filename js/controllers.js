angular.module('app.controllers', [])
  .config(function($ionicConfigProvider) {
    // $ionicConfigProvider.views.transition('none');
  })
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
  .controller('mainCtrl', function ($scope, $state, $http, $q, $ionicViewSwitcher,model302,$ionicConfig) {
    $scope.name = '管理员';
    $scope.animate = $ionicConfig.views.transition;
    $scope.shade = false;
    $scope.nowModule = 1;
    //控制顶部和底部是否隐藏
    $scope.headShow = true;
    $scope.footerShow = true;
    $scope.footerStatus = function (status) {
      $scope.footerShow = status;
    };
    $scope.headStatus = function (status) {
      $scope.headShow = status;
    };
    //回到首页
    $scope.backHome = function(){
      $scope.showChild = false;
      $state.go('main.home', {reload: true});
    }
    //定位房间
    $scope.position = function(status){
      $scope.showChild = status;
      setTimeout(function() {
        $state.go('main.room'+status, {reload: true});
      }, 500);
    }
    //路由切换
    $scope.moduleChange = function (module_id, room_id) {
      // // if($scope.nowModule!=module_id){
      // console.log(module_id + '--' + room_id);
      if(module_id == 1 && (room_id != 0 && room_id != undefined) ){
        console.log(room_id);
        $scope.animate('none');
      }else{
        $scope.animate('ios');
      }
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
    $scope.icon_on = 0;
    $scope.iconChange = function (icon_id) {
      $scope.icon_on = icon_id;
    };

    $scope.loginOut = function () {
      $scope.moduleChange(0, 0);
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
  .controller('room1Ctrl', function ($scope,model302,Switch) {
    $scope.moduleChange(1, 1);
    $scope.nowDevice = model302.childrenRoom;
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }
  })
  /**
   * 次卧Controller
   */
  .controller('room2Ctrl', function ($scope, $state,model302,Switch) {
    $scope.moduleChange(1, 2);
    $scope.nowDevice = model302.subalternRoom;
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }
  })
  /**
   * 主卧Controller
   */
  .controller('room3Ctrl', function ($scope, $state,model302,Switch) {
    $scope.moduleChange(1, 3);
    $scope.nowDevice = model302.masterRoom;
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }
  })

  /**
   * 厨房Controller
   */
  .controller('room4Ctrl', function ($scope, $state,model302,Switch) {
    $scope.moduleChange(1, 4);
    $scope.nowDevice = model302.kitchenRoom;
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }
  })
  /**
   * 餐厅Controller
   */
  .controller('room5Ctrl', function ($scope, $state,model302,Switch) {
    $scope.moduleChange(1, 5);
    $scope.nowDevice = model302.diningRoom;
    console.log($scope.nowDevice);
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }

  })
  /**
   * 客厅Controller
   */
  .controller('room6Ctrl', function ($scope, $state,model302,Switch) {
    $scope.moduleChange(1, 6);
    $scope.nowDevice = model302.livingRoom;
    $scope.changeStatus = function(name){
      Switch.$set(model302.room_id,$scope.nowDevice[name]).then(function(data){
        $scope.nowDevice[name][2] == '0000' ? $scope.nowDevice[name][2] = '00ff':$scope.nowDevice[name][2] = '0000';
      });
    }
  })

  .controller('societyCtrl', function ($scope, $state) {
    $scope.moduleChange(2, 0);
    $scope.showMonitoring = function(index){
      $scope.MonitoringName = index;
      $scope.MonitoringStatus = true;
      $scope.shade = true;
    }
    $scope.showRepair = function(index){
      $scope.repairStatus = true;
      $scope.shade = true;
    }
    $scope.showMore = function(index){
      $scope.moreStatus = true;
      $scope.shade = true;
    }
    $scope.shadeClick = function(){
      $scope.MonitoringStatus = false;
      $scope.repairStatus = false;
      $scope.moreStatus = false;
      $scope.shade = false;
    }
  }).controller('lifeCtrl', function ($scope, $state) {
    $scope.moduleChange(3, 0);
}).controller('neighborCtrl', function ($scope, $state,$ionicScrollDelegate) {
  $scope.headStatus(false);
  $scope.moduleChange(4, 0);
  $scope.datas = [
  {'who':'l','data':'你在哪里？','imgSrc':'/img/home/test.png'},
  {'who':'r','data':'我在珠海周末要不要聚一聚？','imgSrc':'/img/home/test1.png'},
  ];
  var gg= document.getElementById('sendInfo');
  $scope.send = function(){
    var val = gg.innerHTML;
    $scope.datas.push({'who':'r','data':val,'imgSrc':'/img/home/test1.png'});
    $ionicScrollDelegate.scrollBottom();
  }
}).controller('roomCtrl', function ($scope, $state) {

});
