require(['./config'], function() {
    require(['jquery'], function($) {
        //输入金额
        money = document.querySelector('.money');
        keyCode.onclick = function(e) {
                if (e.target.tagName === 'LI') {
                    var text = e.target.innerHTML;
                    console.log(text)
                    if (text === 'X') {
                        money.innerHTML = money.innerHTML.substr(0, money.innerHTML.length - 1);
                    } else if (money.innerHTML.indexOf('.') != -1 && text === '.') {
                        money.innerHTML = money.innerHTML
                    } else if (money.innerHTML.indexOf('.') != -1 && money.innerHTML.split('.')[1].length == 2) {
                        money.innerHTML = money.innerHTML
                    } else {
                        money.innerHTML = money.innerHTML + text;
                    }
                }

            }
            //点击确定跳转到添加账单
        var sure = document.querySelector('.sure');
        sure.addEventListener('click', function() {
            // 			
            // 			console.log(money.innerHTML)
            //本地存储
            localStorage.setItem('moneyVal', money.innerHTML);
            location.href = './bill.html';
        });
    })
})