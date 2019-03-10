require(["../config"], function() {
    require(['mui', 'unlits'], function(mui, obj) {
        var id = obj.id || "";
        console.log(obj);
        var id = obj.id || "";
        console.log(obj);
        //确定按钮
        sure();

        function sure() {
            var sure = document.querySelector('#sure').addEventListener('tap', function() {
                var username = document.querySelector('.username').value;
                var age = document.querySelector('.age').value;
                var address = document.querySelector('.address').value;
                var card = document.querySelector('.card').value;
                // console.log(username, age, address, card);

                // if (id) {
                mui.ajax('/api/add', {
                    dataType: 'json',
                    type: 'post',
                    data: {
                        "username": username,
                        "age": age,
                        "address": address,
                        "card": card
                    },
                    success: function(data) {
                        console.log(data)
                        if (data.code === 1) {
                            location.href = '../../page/detail.html';
                        } else {
                            // alert(data.msg);
                            console.log(111);
                        }
                    },
                    error: function(xhr, type, errorThrown) {
                        console.log(type);
                    },
                });
                //  }
                var parmas = {
                    username: document.querySelector('.username').value,
                    age: document.querySelector('.age').value,
                    address: document.querySelector('.address').value,
                    card: document.querySelector('.card').value
                }
                console.log(parmas)
                if (id) {
                    parmas.id = id;

                }

            })
        }
    })
})