angular.module('app.services', [])
.value('model302',{
  'room_id':'302',
  //['显示名称','设备ID','开关状态(0000=关闭,00ff=开启)','样式类'],同一房间中键名不要重复
  //小孩房
  'childrenRoom':{
    'kingLight':['主灯','021C1664','0000','lamp'],
    'balconyLamp':['阳台灯','022C1664','0000','lamp'],
    'LampWith':['灯带','023C1664','0000','lamp'],
    'drape1':['布帘','0B1411A0','0000','curtain'],
    'drape2':['纱帘','0B2411A0','0000','curtain'],
    'appliances':['电器','7600016A','0000','appliances']
  },
  //次卧、老人房
  'subalternRoom':{
    'kingLight':['主灯','02182BCA','0000','lamp'],
    'balconyLamp':['阳台灯','02282BCA','0000','lamp'],
    'LampWith':['灯带','02382BCA','0000','lamp'],
    'doorLamp':['门口灯','021050C6','0000','lamp'],
    'drape1':['布帘','0B141178','0000','curtain'],
    'drape2':['纱帘','0B241178','0000','curtain'],
    'appliances':['电器','760001D8','0000','appliances']
  },
  //主卧
  'masterRoom':{
    // 'kingLight':['主灯','021C1678','0000','lamp'],
    'bedLamp':['床头灯','023C1678','0000','lamp'],
    'shootLamp':['射灯','02382C0B','0000','lamp'],
    'LampWith':['灯带','024C1678','0000','lamp'],
    'drape1':['布帘','0B14115F','0000','curtain'],
    'drape2':['纱帘','0B24115F','0000','curtain'],
    'appliances':['电器','76000162','0000','appliances'],
    'pushWindow':['推窗器','0B100BBC','0000','appliances']
  },
  //客厅
  'livingRoom':{
    'kingLight':['主灯','021C1607','0000','lamp'],
    'balconyLamp':['阳台灯','021051B5','0000','lamp'],
    'LampWith':['灯带','022C1607','0000','lamp'],
    'shootLamp':['射灯','023C1607','0000','lamp'],
    'wallLamp':['壁灯','024C1607','0000','lamp'],
    'drape1':['布帘','0B1411E4','0000','curtain'],
    'drape2':['纱帘','0B2411E4','0000','curtain'],
    'appliances':['电器','7600015D','0000','appliances'],
    'socket1':['电视机插座','13104853','0000','appliances'],
    'socket2':['插座2','13204853','0000','appliances'],
    'socket3':['插座3','13304853','0000','appliances'],
    'socket4':['机顶盒插座','13404853','0000','appliances'],
  },
  //餐厅
  'diningRoom':{
    'kingLight':['主灯','021C159E','0000','lamp'],
    'shootLamp':['射灯','022C159E','0000','lamp'],
    'LampWith1':['灯带','024C159E','0000','lamp'],
    'LampWith':['鞋柜灯','023C159E','0000','lamp'],
  },
  //厨房
  'kitchenRoom':{
    'kingLight':['主灯','02105153','0000','lamp'],
    'balconyLamp':['阳台灯','02105111','0000','lamp'],
    'socket':['水阀插座','031802E4','0000','appliances'],
  },
  //主卫
  'masterRestRoom':{
    'kingLight':['主灯','02182BC4','0000','lamp'],
    'bathroomLamp':['浴室灯','02282BC4','0000','lamp'],
    'LensHeadLight':['镜前灯','02382BC4','0000','lamp'],
  },
  //公卫
  'restRoom':{
    'kingLight':['主灯','02182BBE','0000','lamp'],
    'LensHeadLight':['镜前灯','02282BBE','0000','lamp'],
    'exhaustAir':['排风','02382BBE','0000','fans'],
  },
  'leaveHome':['出门','7324002C','00000',''],
  'goHome':['回家','7314002C','0000','']
})
.factory('Switch',function($http,$q){
  //获取当前room的设备状态
  var service = {};
  service.$get=function(room_id){
    return '……';
  };
  //设置某个设备的状态
  service.$set = function (room_id, nowDevice) {
    var deviceId = nowDevice[1];
    var value = nowDevice[2];
    value == '0000'?value='00ff':value='0000';
    var deferred = $q.defer();
    $http({
      // url: 'http://120.24.45.231:3000/control',
      url:'http://139.196.115.11:3000/control',
      method: "POST",
      data: {
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

  }
 
  return service;

})
