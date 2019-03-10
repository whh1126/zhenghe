require(['../js/config.js'], function() {
    require(['mui', 'untits'], function(mui, obj) {
        var id = obj.id;
        console.log(id);
        init();

        function init() {
            mui.ajax('/api/detail', {
                dataType: 'json', //服务器返回json格式数据
                type: 'get', //HTTP请求类型	 
                data: {
                    id: id
                },
                success: function(data) {
                    //服务器返回响应，根据响应结果，分析是否登录成功；
                    console.log(data);
                    if (data.code === 0) {
                        render(data.data[0])
                    } else {
                        alert(data.msg);
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                },
            });

            function render(data) {
                console.log(data);
                document.querySelector('.user').innerHTML = data.user;
                document.querySelector('.age').innerHTML = data.age;
                document.querySelector('.phone').innerHTML = data.phone;
                document.querySelector('.address').innerHTML = data.address;
                document.querySelector('.card').innerHTML = data.card;
            }

            function update() {
                document.querySelector('#updates').addEventListener('tap', function() {
                    location.href = "add.html?id=" + id

                });
            }
            update();

        }
    });

})