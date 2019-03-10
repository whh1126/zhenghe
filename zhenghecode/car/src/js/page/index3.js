require(['./js/config.js'], function() {
    require(['jquery', 'flexible'], function($, flexible) {
        var inp = Array.from(document.querySelectorAll('.inp')); //数量
        var add = Array.from(document.querySelectorAll('.add')); //加号
        var del = Array.from(document.querySelectorAll('.del')); //减号
        var price = Array.from(document.querySelectorAll('.price .money')); //单价
        var totalPrice = document.querySelector('.checkall b'); //总价
        //加号
        add.forEach(function(item) {
                item.onclick = function() {
                    var text = this.previousElementSibling;
                    text.value++;
                    if (text.value > 10) {
                        this.previousElementSibling.value = 10;
                        alert('最多10件');
                    }
                    sum();
                }
            })
            //减号
        del.forEach(function(item1) {
                item1.onclick = function() {
                    var text = this.nextElementSibling;
                    text.value--;
                    if (text.value <= 0) {
                        this.nextElementSibling.value = 1;
                    }
                    sum();
                }
            })
            //加减按钮都要调用此函数
            //单价*数量=总价 
        function sum() {
            //总价的初始值为0
            var totalMoney = 0; //总价
            //inp input数量 循环数量
            for (var i = 0; i < inp.length; i++) {
                totalMoney += inp[i].value * price[i].innerHTML.split("￥")[1];
            }
            totalPrice.innerHTML = totalMoney;
        }
        sum()
    })
})