require(['../config'], function() {
    require(['mui', 'unlits'], function(mui, unlits) {
        console.log(unlits);
        mui.init({
            pullRefresh: {
                container: "#pullrefresh", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等

                up: {
                    auto: true //可选,默认false.首次加载自动上拉加载一次
                }
            }
        });
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005
        });
        mui(".mui-table-view").on('tap', '.mui-btn-danger', function() {
            //获取id
            var id = this.dataset.id;
            var lis = [...document.querySelectorAll('.mui-table-view-cell')];
            lis.forEach(function(item) {
                item.addEventListener('tap', function() {
                    alert('msg1');
                })
            })
            var lis = this.parentElement.parentElement;
            console.log(lis);
            mui.confirm('删除？', '确定删除', ['取消', '确定'], function(e) {
                if (e.index == 1) {
                    mui.ajax('/api/remove', {
                        dataType: 'json', //服务器返回json格式数据
                        type: 'get', //HTTP请求类型	 
                        data: {
                            "_id": id
                        },
                        success: function(data) {
                            if (data.code === 1) {
                                document.querySelector('#mui-table-view').removeChild(lis);
                                alert('msg');
                            }

                            function render(data) {
                                console.log(data);
                            }
                        },
                        error: function(xhr, type, errorThrown) {
                            console.log(type);
                        },
                    });
                }
            })
        })
        mui.ajax('api/find', {
            dataType: 'json', //服务器返回json格式数据
            success: function(data) {
                //服务器返回响应，根据响应结果，分析是否登录成功；
                render(data.data);
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
            }
        });
    })


    function render(data) {
        var html = ``;
        data.forEach(function(item) {
            html += `<li class="mui-table-view-cell">            
               ${item.username}           
                <div class="btns">
                    <div class="mui-btn mui-btn-primary" data-id="${item._id}">
                        查看
                    </div>
                    <div class="mui-btn mui-btn-danger" data-id="${item._id}">
                        删除
                    </div>
                </div>
        </li>`
        })
        list.innerHTML = html;
        var icon = document.querySelector('#icon').addEventListener('tap', function() {
            location.href = "../../page/add.html";
        });

        //查看按钮
        mui(".mui-table-view").on('tap', '.mui-btn-primary', function() {
            //获取id
            var id = this.dataset.id;
            console.log(id);
            //传值给添加页面，通知加载新数据
            location.href = '../../page/add.html?id=' + id;
        })
    }

    function search() {
        var inp = document.querySelector('#inp');
        console.log(inp)
        inp.addEventListener('input', function() {
            var inpval = inp.value;
            console.log(inpval);
            mui.ajax('/api/search', {
                data: {
                    username: inpval
                },
                dataType: 'json', //服务器返回json格式数据
                success: function(data) {
                    console.log(data)
                    var str = '';
                    data.data.forEach(function(item) {
                        console.log(item)
                        str +=
                            `<li class="mui-table-view-cell">姓名：<span>${item.username}</span>
                                    <button type="button" class="mui-btn mui-btn-primary button look" data-id="${item._id}">查看</button>
                                    <button type="button" class="mui-btn mui-btn-danger delete" data-id="${item._id}">删除</button>
                                </li>`
                    })
                    document.querySelector("#list").innerHTML = str;
                }
            });

        })
    }
    search()
})