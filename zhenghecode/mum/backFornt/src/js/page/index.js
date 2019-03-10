require(['./js/config.js'], function() {
    require(['BScroll'], function(BScroll) {
        new BScroll('.billlist');
        var dls;
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/bill/getbill');
        xhr.onload = function(e) {
            var data = JSON.parse(e.target.responseText);
            if (data.code == 0) {
                renderList(data.data); //渲染已添加的账单
            }
        }
        xhr.send();

        function renderList(data) {
            billlist.innerHTML = data.map(function(item) {
                return `<dl data-price="${item.price}" class="dl">
                            <dt class="${item.icon}"></dt>
                            <dd>
                                <div class="left">
                                    <p>${item.name}</p>
                                    <span>：付款</span>
                                </div>
                                <div class="right">
                                    <h4>￥<span class="money">${item.price}</span></h4>
                                </div>
                            </dd>
                        </dl>`;
            }).join('');
            money = [...document.querySelectorAll('.money')];
            Event();
        }

        function Event() {
            //所有的账单的钱相加
            var num = 0;
            money.forEach(function(item) {
                num += +item.innerHTML;
            });
            total.innerHTML = '￥' + num + '.00';
            sumPrice.innerHTML = num + '.00';
            //点击分账跳转到计算器页面
            account.onclick = function() {
                window.location.href = './calculator.html';
            }
        }
    })
})