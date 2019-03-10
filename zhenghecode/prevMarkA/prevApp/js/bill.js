require(['./config'], function() {
    require(['jquery'], function($) {

        //轮播图swiper
        var BasW = new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination'
            }
        });

        //点击轮播图tab切换图表
        tabIcon();
        //点击完成跳转到首页
        finish();
        //付款方式切换
        tabBillMethod();
    })
});

//点击轮播图tab切换图表
function tabIcon() {
    $('.swiper-slide').on('click', 'dl', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })
}
//付款方式切换
function tabBillMethod() {
    $('.tabMethod').on('click', 'dl', function() {
        $(this).addClass('activeBill').siblings().removeClass('activeBill');
    })
}
//点击完成跳转到首页
function finish() {
    //赋值给头部
    document.querySelector('.topMoney').innerHTML = localStorage.getItem('moneyVal');

    //点击完成获取到节点元素
    var save = document.querySelector('.save');
    save.addEventListener('click', function() {
        //icon图表
        var icon = document.querySelector('.swiper-slide dl.active dt').className;
        //icon图表的表述
        var name = document.querySelector('.swiper-slide dl.active dd').innerHTML;
        //金额
        var money = localStorage.getItem('moneyVal');
        //时间
        var timer = new Date().toLocaleString();
        //付款方式
        var billMethod = document.querySelector('.tabMethod dl.activeBill dd').innerHTML;

        console.log(icon, name, money, timer, billMethod);

        //ajax请求
        $.ajax({
            url: '/addBillList',
            type: 'post',
            dataType: 'json',
            data: {
                icon: icon,
                name: name,
                money: money,
                timer: timer,
                billMethod: billMethod
            },
            success: function(data) {
                alert(data.msg);
                if (data.code === 1) {
                    location.href = '/'
                }
            }
        });

    })
}