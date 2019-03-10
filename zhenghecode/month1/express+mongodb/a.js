var success = [{
    cprice: 1200,
    cname: "餐饮",
    type: "支出",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 500,
    cname: "米饭",
    type: "收入",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 200,
    cname: "运动",
    type: "支出",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 600,
    cname: "只是",
    type: "收入",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 100,
    cname: "餐饮",
    type: "支出",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 150,
    cname: "餐饮",
    type: "收入",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 100,
    cname: "餐饮",
    type: "支出",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 1200,
    cname: "餐饮",
    type: "收入",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 30,
    cname: "餐饮",
    type: "收入",
    icon: "icon-wode-xuanzhong"
}, {
    cprice: 120,
    cname: "餐饮",
    type: "支出",
    icon: "icon-wode-xuanzhong"
}];
var mymongo1610 = require('mymongo1610');
mymongo1610.insert('success', success, function(err, result) {
    if (err) {
        throw err;
    }
})