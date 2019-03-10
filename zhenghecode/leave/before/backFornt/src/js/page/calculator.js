require(['./js/config.js'], function() {
    require(['mui'], function(mui) {
        var amount = document.querySelector('#amount');
        mui('#table').on('tap', 'td:not(.no)', function() {
            var val = this.innerHTML;
            if (val === "确定") {
                location.href = "../../addbill.html?money=" + amount.value;
            }
            if (val === ".") {
                if (amount.value.length === 0) {
                    amount.value = "0.0"
                }
            } else {
                if (amount.value.indexOf('.') == -1) { //value==-1 不包含.
                    amount.value += val;
                } else {
                    //判断数字两位
                    if (amount.value.slice(amount.value.indexOf('.')).length == 2) {
                        amount.value += val;
                    }
                }
            }
        })
    })
})