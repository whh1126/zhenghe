require(['./js/config.js'], function() {
    require(['mui', 'utils'], function(mui, utils) {
        console.log(utils);
        console.log(parms);
        console.log(utils.getUser())
        var parms = utils.getParms();
        var price = document.querySelector("#price");
        var icons = document.querySelector('.icons');
        price.innerHTML = parms.money;

        function Click() {
            mui('.icons').on('tap', 'dl', add);

        }
        Click()

        function add() {
            document.querySelector(".icons>.active").className = ''
            this.className = "active";
        }
    })
    var complete = document.querySelector('#complete');
    //请求添加接口
    complete.addEventListener('tap', function() {
        var icon = document.querySelector('.icons>.active').children[0];
        var chid = document.querySelector('.icons>.active').children[1].innerHTML;
        mui.ajax("/api/addbill", {
            type: "post",
            data: {
                uid: utils.getUser(),
                money: parms.money,
                icon: icon,
                cname: chid
            },
            success: function(data) {
                console.log(data);
                //请求成功跳回首页渲染数据
                if (data.code) {
                    mui.ajax('/api/addbill', {
                        data: {
                            uid: utils.getUser()
                        },
                        success: function(rs) {

                            if (rs.code) {

                                render(data.data)
                            }
                        }
                    })

                    function render(data) {
                        var html = ``;
                        data.forEach(function(item) {
                            html += `<dl>
                            <dt class="iconfont icon-fenlei"></dt>
                            <dd>
                                <div class="left">
                                    <p>美食</p>
                                    <span>：付款</span>
                                </div>
                                <div class="right">
                                    <h4>￥500.00</h4>
                                </div>
                            </dd>
                    </dl>`
                        })
                        billlist.innerHTML = html;
                    }
                }
            }
        })
    })
})