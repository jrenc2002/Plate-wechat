// app.js
var mqtt = require('./utils/mqtt')

function parseBrackets(str) {
  let result = []
  let num = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') {
      // 遇到{开始记录数字
      num = ''
    } else if (str[i] === '}') {
      // 遇到}结束记录数字,并存入result数组
      result.push(parseInt(num))
    } else {
      // 其他情况则拼接数字
      num += str[i]
    }
  }
  return result
}
//随机生成字符串，因为clientId你设成一个固定字符串的话，当你编译代码的时候就会以这个ID连接服务器，当预览或者真机调试的时候还是这个ID，就会发生ID冲突的问题，当时差点被这个不起眼的BUG整疯
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

//连接配置
const options = {
  connectTimeout: 40000,  //超时时间
  clientId: randomString(30),  //随机生成ID
  username: '',  //用户名
  password: '',  //密码
}
App({
  onLaunch() {

    let that = this
    var client = mqtt.connect('wxs://www.sxksxk.work:443/mqtt', options) //你自己的域名
    console.log(client)
    that.globalData.client = client
    client.on('connect', (e) => {
      console.log('成功连接服务器!')
    })
    client.subscribe('topic/plate', {
      qos: 2
    }, function (err) {
      if (!err) {
        console.log("订阅成功:plate")
      }
    })

    client.on('message', function (topic, message, packet) {
      that.globalData.mqttData = packet.payload.toString()
      console.log(packet.payload.toString())
      let str = that.globalData.mqttData
      console.log(str)
      let result = parseBrackets(str)
      console.log(result)


      wx.showToast({
        title: '成功读取数据',
        icon: 'success'
      });
      console.log("读取成功")
      that.globalData.postnum = result
    })



  },
  globalData: {
    timeweig: [],
    limitflag: -1,
    recommendget: [-1, -1, -1, -1],
    chancefood: [undefined, undefined, undefined, undefined],
    postfood: [undefined, undefined, undefined, undefined],
    postnum: [0, 0, 0, 0],
    postkll: [0, 0, 0, 0],
    foodlib: [
      [{
        "id": 1,
        "kind": 4,
        "name": "米饭",
        "kll": 130,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d6c/rice.png"
      },
      {
        "id": 2,
        "kind": 4,
        "name": "马铃薯",
        "kll": 82,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0cba/potato.png"
      },
      {
        "id": 3,
        "kind": 4,
        "name": "白粥",
        "kll": 47,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0c91/porridge.png"
      },
      {
        "id": 4,
        "kind": 4,
        "name": "油条",
        "kll": 389,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc127d/fritters.png"
      },
      {
        "id": 5,
        "kind": 4,
        "name": "煮面条",
        "kll": 108,
        "foodpath": "https://pic2.imgdb.cn/item/6446826b0d2dde5777bc0bd2/noodles.png"
      },
      {
        "id": 6,
        "kind": 4,
        "name": "紫薯",
        "kll": 134,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0dfe/sweet_potato.png"
      },
      {
        "id": 7,
        "kind": 4,
        "name": "面包",
        "kll": 314,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1032/bread.png"
      },
      {
        "id": 8,
        "kind": 4,
        "name": "玉米",
        "kll": 113,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc11d8/corn.png"
      },
      {
        "id": 9,
        "kind": 4,
        "name": "馒头",
        "kll": 224,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0dbc/steamed_bun.png"
      },
      {
        "id": 10,
        "kind": 4,
        "name": "红薯",
        "kll": 87,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0eb4/yam.png"
      },
      {
        "id": 11,
        "kind": 4,
        "name": "麦片",
        "kll": 369,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc10f8/cereal.png"
      },
      {
        "id": 12,
        "kind": 4,
        "name": "三明治",
        "kll": 262,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1305/ham_sandwich.png"
      }],
      [{
        "id": 1,
        "kind": 3,
        "name": "胡萝卜",
        "kll": 33,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc10a3/carrot.png"
      },
      {
        "id": 2,
        "kind": 3,
        "name": "西葫芦",
        "kll": 20,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f00/zucchini.png"
      },
      {
        "id": 3,
        "kind": 3,
        "name": "紫甘蓝",
        "kll": 26,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0ce8/purple_cabbage.png"
      },
      {
        "id": 4,
        "kind": 3,
        "name": "芹菜",
        "kll": 18,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc10d2/celery.png"
      },
      {
        "id": 5,
        "kind": 3,
        "name": "豆芽",
        "kll": 17,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f85/bean_sprouts.png"
      },
      {
        "id": 6,
        "kind": 3,
        "name": "豇豆",
        "kll": 33,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc1316/hyacinth_beans.png"
      },
      {
        "id": 7,
        "kind": 3,
        "name": "茄子",
        "kll": 24,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc124a/eggplant.png"
      },
      {
        "id": 8,
        "kind": 3,
        "name": "苋菜",
        "kll": 31,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f30/amaranth.png"
      },
      {
        "id": 9,
        "kind": 3,
        "name": "生菜",
        "kll": 13,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc1374/lettuce.png"
      },
      {
        "id": 10,
        "kind": 3,
        "name": "丝瓜",
        "kll": 21,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc139e/loofah.png"
      },
      {
        "id": 11,
        "kind": 3,
        "name": "苦瓜",
        "kll": 23,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc0fe0/bitter_melon.png"
      },
      {
        "id": 12,
        "kind": 3,
        "name": "莴苣",
        "kll": 16,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0e8c/welettuce.png"
      },
      {
        "id": 13,
        "kind": 3,
        "name": "四季豆",
        "kll": 25,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0e59/wax_beans.png"
      },
      {
        "id": 14,
        "kind": 3,
        "name": "大白菜",
        "kll": 23,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc118e/chinese_cabbage.png"
      }],
      [{
        "id": 1,
        "kind": 2,
        "name": "鸡蛋",
        "kll": 140,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1226/egg.png"
      },
      {
        "id": 2,
        "kind": 2,
        "name": "鸡胸肉",
        "kll": 119,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1120/chicken_breast.png"
      },
      {
        "id": 3,
        "kind": 2,
        "name": "对虾",
        "kll": 94,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d95/shrimp.png"
      },
      {
        "id": 4,
        "kind": 2,
        "name": "牛肉",
        "kll": 124,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0fac/beef_brisket.png"
      },
      {
        "id": 5,
        "kind": 2,
        "name": "猪肉",
        "kll": 350,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0c5d/pork_breast.png"
      },
      {
        "id": 6,
        "kind": 2,
        "name": "鸡腿",
        "kll": 147,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1158/chicken_legs.png"
      },
      {
        "id": 7,
        "kind": 2,
        "name": "带鱼",
        "kll": 128,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc12bb/hairtail.png"
      },
      {
        "id": 8,
        "kind": 2,
        "name": "鹌鹑蛋",
        "kll": 161,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d2a/quail_eggs.png"
      },
      {
        "id": 9,
        "kind": 2,
        "name": "鸭翅",
        "kll": 147,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc120a/duck_wings.png"
      },
      {
        "id": 10,
        "kind": 2,
        "name": "牛奶",
        "kll": 66,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png"
      }],
      [{
        "id": 1,
        "kind": 1,
        "name": "冬枣",
        "kll": 114,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc1338/jujube.png"
      },
      {
        "id": 2,
        "kind": 1,
        "name": "柿子",
        "kll": 75,
        "foodpath": "https://pic2.imgdb.cn/item/6446826b0d2dde5777bc0c26/persimmon.png"
      },
      {
        "id": 3,
        "kind": 1,
        "name": "橘子",
        "kll": 45,
        "foodpath": "https://pic2.imgdb.cn/item/6446826b0d2dde5777bc0bf5/orange.png"
      },
      {
        "id": 4,
        "kind": 1,
        "name": "无花果",
        "kll": 66,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1267/fig.png"
      },
      {
        "id": 5,
        "kind": 1,
        "name": "草莓",
        "kll": 33,
        "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0ddf/strawberry.png"
      }, {
        "id": 6,
        "kind": 1,
        "name": "西瓜",
        "kll": 34,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0e22/watermelon.png"
      }, {
        "id": 7,
        "kind": 1,
        "name": "哈密瓜",
        "kll": 35,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc106d/cantaloupe.png"
      }, {
        "id": 8,
        "kind": 1,
        "name": "西柚",
        "kll": 34,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc129e/grapefruit.png"
      }, {
        "id": 9,
        "kind": 1,
        "name": "苹果",
        "kll": 54,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f60/apple.png"
      }, {
        "id": 10,
        "kind": 1,
        "name": "杨梅",
        "kll": 31,
        "foodpath": "https://pic2.imgdb.cn/item/6446826b0d2dde5777bc0ba7/myrobalan.png"
      }, {
        "id": 11,
        "kind": 1,
        "name": "枇杷",
        "kll": 42,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13da/loquat.png"
      }, {
        "id": 12,
        "kind": 1,
        "name": "蓝莓",
        "kll": 58,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc100d/blueberry.png"
      }]]
    ,
    recipelib: [
      [
        {
          "name": "健康早餐食谱",
          "kind": [{
            "id": 8,
            "kind": 4,
            "name": "玉米",
            "recpath": "",
            "kll": 113,
            "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc11d8/corn.png"
          }, {
            "id": 12,
            "kind": 1,
            "name": "蓝莓",
            "recpath": "",
            "kll": 58,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc100d/blueberry.png"
          }, {
            "id": 10,
            "kind": 2,
            "name": "牛奶",
            "recpath": "",
            "kll": 66,
            "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png"
          }, {
            "id": 1,
            "kind": 2,
            "name": "鸡蛋",
            "recpath": "",
            "kll": 140,
            "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1226/egg.png"
          }],
          "kll": 525,
          "recpath": "https://pic2.imgdb.cn/item/64468e500d2dde5777cd60a5/微信图片_20230421141354（1）.png"
        },
        {
          "name": "健康午餐食谱",
          "kind": [{
            "id": 2,
            "kind": 2,
            "name": "鸡胸肉",
            "recpath": "",
            "kll": 119,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1120/chicken_breast.png"
          }, {
            "id": 3,
            "kind": 3,
            "name": "紫甘蓝",
            "recpath": "",
            "kll": 120,
            "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0ce8/purple_cabbage.png"
          }, {
            "id": 9,
            "kind": 1,
            "name": "苹果",
            "recpath": "",
            "kll": 54,
            "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f60/apple.png"
          }, {
            "id": 2,
            "kind": 4,
            "name": "土豆",
            "recpath": "",
            "kll": 82,
            "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0cba/potato.png"
          }],
          "recpath": "https://pic2.imgdb.cn/item/64468e500d2dde5777cd6188/微信图片_20230421141755.png",
          "kll": 575
        },
        {
          "name": "健康晚餐食谱",
          "kind": [{
            "id": 11,
            "kind": 3,
            "name": "苦瓜",
            "recpath": "",
            "kll": 23,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc0fe0/bitter_melon.png"
          }, {
            "id": 3,
            "kind": 2,
            "name": "对虾",
            "recpath": "",
            "kll": 94,
            "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d95/shrimp.png"
          }, {
            "id": 6,
            "kind": 4,
            "name": "紫薯",
            "recpath": "",
            "kll": 134,
            "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0dfe/sweet_potato.png"
          }],
          "recpath": "https://pic2.imgdb.cn/item/64468e500d2dde5777cd6146/微信图片_20230421141755（1）.png",
          "kll": 515
        },
        {
          "name": "低碳水减肥食谱",
          "kind": [{
            "id": 2,
            "kind": 2,
            "name": "鸡胸肉",
            "recpath": "",
            "kll": 119,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1120/chicken_breast.png"
          }, {
            "id": 14,
            "kind": 3,
            "name": "大白菜",
            "recpath": "",
            "kll": 23,
            "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc118e/chinese_cabbage.png"
          }, {
            "id": 1,
            "kind": 3,
            "name": "胡萝卜",
            "recpath": "",
            "kll": 33,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc10a3/carrot.png"
          }],
          "recpath": "https://pic2.imgdb.cn/item/64468e500d2dde5777cd6204/微信图片_20230421141824.png",
          "kll": 545
        },
        {
          "name": "GM减肥法食谱",
          "kind": [{
            "id": 14,
            "kind": 3,
            "name": "大白菜",
            "recpath": "",
            "kll": 23,
            "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc118e/chinese_cabbage.png"
          }, {
            "id": 3,
            "kind": 2,
            "name": "对虾",
            "recpath": "",
            "kll": 94,
            "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d95/shrimp.png"
          }, {
            "id": 6,
            "kind": 4,
            "name": "紫薯",
            "recpath": "",
            "kll": 134,
            "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0dfe/sweet_potato.png"
          }, {
            "id": 9,
            "kind": 1,
            "name": "苹果",
            "recpath": "",
            "kll": 54,
            "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f60/apple.png"
          }],
          "recpath": "https://pic2.imgdb.cn/item/64468e500d2dde5777cd61db/微信图片_20230421141824（1）.png",
          "kll": 595
        },
        {
          "name": "哥本哈根减肥法食谱",
          "kind": [{
            "id": 1,
            "kind": 3,
            "name": "胡萝卜",
            "recpath": "",
            "kll": 33,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc10a3/carrot.png"
          }, {
            "id": 3,
            "kind": 3,
            "name": "紫甘蓝",
            "recpath": "",
            "kll": 26,
            "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0ce8/purple_cabbage.png"
          }, {
            "id": 1,
            "kind": 2,
            "name": "鸡蛋",
            "recpath": "",
            "kll": 140,
            "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1226/egg.png"
          }],
          "recpath": "https://pic2.imgdb.cn/item/64468e510d2dde5777cd627e/微信图片_20230421141948.png",
          "kll": 505
        }],
      [{
        "name": "减脂增肌食谱",
        "kind": [{
          "id": 8,
          "kind": 4,
          "name": "玉米",
          "recpath": "",
          "kll": 113,
          "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc11d8/corn.png"
        }, {
          "id": 12,
          "kind": 3,
          "name": "莴苣",
          "recpath": "",
          "kll": 16,
          "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc1374/lettuce.png"
        }, {
          "id": 2,
          "kind": 2,
          "name": "鸡胸肉",
          "recpath": "",
          "kll": 119,
          "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1120/chicken_breast.png"
        }, {
          "id": 4,
          "kind": 1,
          "name": "无花果",
          "recpath": "",
          "kll": 66,
          "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1267/fig.png"
        }],
        "recpath": "https://pic2.imgdb.cn/item/64468e510d2dde5777cd6236/微信图片_20230421141948（1）.png",
        "kll": 565
      },
      {
        "name": "健康减脂食谱",
        "kind": [{
          "id": 4,
          "kind": 2,
          "name": "牛肉(脯肋)",
          "recpath": "",
          "kll": 124,
          "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0fac/beef_brisket.png"
        }, {
          "id": 3,
          "kind": 3,
          "name": "紫甘蓝",
          "recpath": "",
          "kll": 120,
          "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0ce8/purple_cabbage.png"
        }, {
          "id": 9,
          "kind": 3,
          "name": "生菜",
          "recpath": "",
          "kll": 13,
          "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc1374/lettuce.png"
        }, {
          "id": 6,
          "kind": 4,
          "name": "紫薯",
          "recpath": "",
          "kll": 134,
          "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0dfe/sweet_potato.png"
        }],
        "recpath": "https://pic2.imgdb.cn/item/64468f8d0d2dde5777cf3a03/微信图片_20230420160302.png",
        "kll": 545
      },
      {
        "name": "春日减脂食谱",
        "kind": [{
          "id": 3,
          "kind": 2,
          "name": "对虾",
          "recpath": "",
          "kll": 94,
          "foodpath": "https://pic2.imgdb.cn/item/6446826c0d2dde5777bc0d95/shrimp.png"
        }, {
          "id": 2,
          "kind": 3,
          "name": "西葫芦",
          "recpath": "",
          "kll": 20,
          "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0f00/zucchini.png"
        }, {
          "id": 1,
          "kind": 2,
          "name": "鸡蛋",
          "recpath": "",
          "kll": 140,
          "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1226/egg.png"
        }],
        "recpath": "https://pic2.imgdb.cn/item/64468f8e0d2dde5777cf3a4e/微信图片_20230420160746.png",
        "kll": 625
      },
      {
        "name": "高蛋白塑身减脂食谱",
        "kind": [
          {
            "id": 2,
            "kind": 2,
            "name": "鸡胸肉",
            "recpath": "",
            "kll": 119,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1120/chicken_breast.png"
          }, {
            "id": 12,
            "kind": 1,
            "name": "蓝莓",
            "recpath": "",
            "kll": 58,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc100d/blueberry.png"
          }, {
            "id": 6,
            "kind": 2,
            "name": "鸡腿",
            "recpath": "",
            "kll": 135,
            "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc1158/chicken_legs.png"
          }, {
            "id": 10,
            "kind": 2,
            "name": "牛奶",
            "recpath": "",
            "kll": 66,
            "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png"
          }],
        "recpath": "https://pic2.imgdb.cn/item/64468e4f0d2dde5777cd6039/1b63bc33750348f88a3b96d9066544e6.png",
        "kll": 525
      }]
    ],
    client: undefined,
    mqttData: "",
    lastflag: 0

  }
})


