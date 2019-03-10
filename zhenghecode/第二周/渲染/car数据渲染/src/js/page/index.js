require(['../common.js'], function() {
    require(['jquery', 'swiper', 'scroll'], function($, swiper, scroll) {
        function init() {
            //加载汽车数据
            $.ajax({
                url: '/car',
                type: 'get',
                dataType: 'json',
                success: function(res) {
                    if (res.code === 1) {
                        console.log(res.msg.data);
                    }
                }
            })
        }

        init();
    })
})