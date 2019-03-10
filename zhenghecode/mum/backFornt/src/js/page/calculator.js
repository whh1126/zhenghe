require(['./js/config.js'], function() {
    require([''], function() {
        var table = document.querySelector('table');
        //计算器输入
        table.addEventListener('click', function(e) {
            var txt = e.target.innerHTML;
            var point = amount.value.indexOf('.');
            if (txt == 'X') {
                amount.value = amount.value.substring(0, amount.value.length - 1);
            } else if (point !== -1) {
                var len = amount.value.substring(point);
                if (len.length > 2) {
                    if (txt == '确定') {
                        window.location.href = './addbill.html?price=' + amount.value;
                    }
                    return;
                } else {
                    methods();
                }
            } else {
                methods();
            }

            function methods() {
                if (txt == '.' || txt == '0') {
                    if (amount.value == '') {
                        amount.value = '0.';
                    } else {
                        amount.value += txt;
                    }
                } else if (txt == '确定') {
                    if (amount.value != '') {
                        window.location.href = './addbill.html?price=' + amount.value;
                    } else {
                        alert('请输入金额');
                    }
                } else {
                    amount.value += txt;
                }
            }
        })
    })
})