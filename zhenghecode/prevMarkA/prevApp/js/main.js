require(['./config'], function() {
    require(['jquery'], function($) {

        $.ajax({
            url: '/userlist',
            dataType: 'json',
            type: 'get',
            success: function(data) {
                rander(data.msg);
                tabFoot()
            }
        });
    })
})
var sumMoney = 0;
var huaMoney = 0;
//渲染到页面
function rander(data) {
    var html = '';
    $.each(data, function(index, item) {
        //求和
        if (item.billMethod == '分账') {
            sumMoney += item.money * 1
        } else {
            huaMoney += item.money * 1
        }
        html += `
			<div class="pic">
				<p class="time">${item.time}</p>
				<p class="userInfo">
					<span class="${item.icon}"><span>${item.name}</span></span>
					<span class="${item.billMethod == '付账' ? 'red' : 'green' }">￥${item.money}</span>
				</p>
				<p><span>${item.billMethod}</span></p>
			</div>
		`;
    });
    console.log(sumMoney);
    console.log(huaMoney);
    //赋值给头部

    $('.listBox').append(html);
    //收入==分账
    document.querySelector('.sum').innerHTML = sumMoney;
    //支出==付账
    document.querySelector('.hua').innerHTML = huaMoney
}

//点击加号
var addBtn = document.querySelector('#add');
addBtn.addEventListener('click', function() {
    location.href = './page/money.html'
});

//点击底部tab切换
function tabFoot() {
    $('.list').on('click', 'li', function() {
        if (this.innerHTML == '明细') {
            $('.listBox').show();
            $('.tabBill').hide();
        } else {
            $('.listBox').hide();
            $('.tabBill').show();
        }
    })
}