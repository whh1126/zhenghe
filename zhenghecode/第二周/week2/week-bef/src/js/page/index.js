/*
 * @Author: zhangkaili 
 * @Date: 2018-11-12 09:32:25 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-06 19:47:30
 */

require(['./js/common.js'], function() {
    require(['jquery', 'dom'], function($, dom) {
        //获取个人信息
        var button = document.querySelector('.button');
        var shang = document.querySelector('.shang');
        var finish = document.querySelector('.finish');
        var user = document.querySelector('.user');
        var emile = document.querySelector('.emile');
        var pwd = document.querySelector('.pwd');
        var wrap1 = document.querySelector('.wrap1');
        var wrap2 = document.querySelector('.wrap2');
        var wrap3 = document.querySelector('.wrap3');
        var wr1 = document.querySelector('.wr1');
        var wr2 = document.querySelector('.wr2');
        var wr3 = document.querySelector('.wr3');

        //下一步
        button.onclick = function() {

                wrap1.style.display = "none";
                wrap2.style.display = "block";
            }
            //上一步
        shang.onclick = function() {
                wrap2.style.display = "none";
                wrap1.style.display = "block";
            }
            //完成
        finish.onclick = function() {
            var userV = user.value,
                emileV = emile.value,
                pwdV = pwd.value,
                wr1V = wr1.value,
                wr2V = wr2.value,
                wr3V = wr3.value

            console.log(typeof userV);
            if (!userV || !emileV || !pwdV || !wr1V || !wr2V || !wr3V) {
                alert('您的信息不完整')
            } else {
                $.ajax({
                    url: '/users',
                    dataType: "json",
                    type: "post",
                    data: {
                        user: userV,
                        emile: emileV,
                        pwd: pwdV,
                        wr1: wr1V,
                        wr2: wr2V,
                        wr3: wr3V
                    },
                    success: function(res) {
                        if (res.code == 1) {
                            alert(res.msg)
                        } else if (res.code == 0) {
                            alert(res.msg)
                        } else if (res.code == 2) {
                            alert(res.msg)
                        }

                    }
                })
            }
        }
    })
})