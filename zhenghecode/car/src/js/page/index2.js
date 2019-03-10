require(['./js/config.js'], function() {
    require(['jquery', 'flexible'], function($, flexible) {
        var buy = [...document.querySelectorAll(".buy")];
        var ls = window.localStorage;
        var serach = decodeURI(location.search.slice(1)).split('&'); //截取一位到最后 字符串转数组
        var obj = {};
        newarr = [];
        serach.forEach(function(v) {
                obj[v.split('=')[0]] = v.split('=')[1];
                //数组第一位和第二位进行拼接
            })
            //点击购买按钮进行本地存储
        buy.forEach(function(item) {
            item.onclick = function() {
                //获取本地存储的值get转对象||[]
                newarr = JSON.parse(ls.getItem('newlist')) || [];
                var index = newarr.findIndex(function(item, index) {
                    //使用id来比较
                    return item.id == obj.id;
                })
                if (index != -1) {
                    newarr[index].num++;
                } else {
                    newarr.push({
                        name: name,
                        id: obj.id,
                        title: title.innerHTML,
                        price: price.innerHTML,
                        num: 1
                    })
                }
                ls.setItem('newlist', JSON.stringify(newarr));
                location.href = "../../index3.html";
            }
        })
    })
})