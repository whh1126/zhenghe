require(["../js/config.js"], function() {
    require(['mui', 'untits'], function(mui, obj) {
        console.log(obj);
        var id = obj.id || "";
        console.log(obj);
        if (id) {
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
                        document.querySelector('.user').value = data.data[0].user;
                        document.querySelector('.age').value = data.data[0].age;
                        document.querySelector('.phone').value = data.data[0].phone;
                        document.querySelector('.address').value = data.data[0].address;
                        document.querySelector('.card').value = data.data[0].card;
                        // render(data.data[0])
                    } else {
                        alert(data.msg);
                    }
                },
                error: function(xhr, type, errorThrown) {
                    //异常处理；
                    console.log(type);
                },
            });
        }
        //确定按钮
        sure();

        function sure() {
            document.querySelector('#sure').addEventListener('tap', function() {
                var parmas = {
                    user: document.querySelector('.user').value,
                    age: document.querySelector('.age').value,
                    phone: document.querySelector('.phone').value,
                    address: document.querySelector('.address').value,
                    card: document.querySelector('.card').value
                }
                if (id) {
                    parmas.id = id;
                }
                mui.ajax('/api/add', {
                    dataType: 'json', //服务器返回json格式数据
                    type: 'post', //HTTP请求类型	 
                    data: parmas,
                    success: function(data) {
                        //服务器返回响应，根据响应结果，分析是否登录成功；
                        console.log(data);
                        if (data.code === 0) {
                            location.href = "../index.html";
                        }

                    },
                    error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(type);
                    },
                });
            })

        }

    })
})