require(['../js/config.js'], function() {
    require(['mui'], function(mui) {
        console.log(mui);
        mui.ajax('/api/list', {
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型	              
            success: function(data) {
                //服务器返回响应，根据响应结果，分析是否登录成功；
                function render(data) {
                    console.log(data);
                    var html = ``;
                    mui.each(data, function(index, item) {
                        html += `<li class="mui-table-view-cell">${item.user}
										<div class="btn">
											 <div class="mui-btn mui-btn-primary" data-id="${item._id}">
												查看详情
											</div>
											<button type="button" class="mui-btn mui-btn-danger" data-id="${item._id}">
												删除
											</button>
										</div>
												</li>`
                    })
                    document.querySelector('#mui-table-view').innerHTML = html;
                }
                if (data.code === 0) {
                    render(data.data)
                } else {
                    alert(data.msg);
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
            },
        });
    });

    function addBtn() {
        //详情
        mui(".mui-table-view").on('tap', '.mui-btn-primary', function() {
                //获取id
                var id = this.dataset.id;
                //console.log(id);
                //传值给详情页面，通知加载新数据
                location.href = './page/detail.html?id=' + id;

            })
            //删除
        mui(".mui-table-view").on('tap', '.mui-btn-danger', function() {
            //获取id
            var id = this.dataset.id;
            console.log(id);
            var lis = this.parentElement.parentElement
            console.log(lis);

            var btnArray = ['取消', '确定'];
            mui.confirm('删除？', '确定删除', btnArray, function(e) {
                if (e.index == 1) {
                    // console.log('删除')
                    mui.ajax('/api/del', {
                        dataType: 'json', //服务器返回json格式数据
                        type: 'get', //HTTP请求类型	 
                        data: {
                            id: id
                        },
                        success: function(data) {
                            //服务器返回响应，根据响应结果，分析是否登录成功；
                            if (data.code === 0) {
                                document.querySelector('#mui-table-view').removeChild(lis);
                                // render(data.data[0])
                            } else {
                                alert(data.msg);
                            }

                            function render(data) {
                                console.log(data);
                            }
                        },
                        error: function(xhr, type, errorThrown) {
                            //异常处理；
                            console.log(type);
                        },
                    });
                } else {

                }
            })
        })
    }
    addBtn();
    document.querySelector('#btn').addEventListener('tap', function() {
        location.herf = "./page/add.html"
    })
});