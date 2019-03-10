define(['mui'], function(mui) {
    var limit = 5; //每页显示的条数
    var skip = 1; //从第几条开始tiao
    var num = 0; //总长度

    function init() {
        mui.init({
            pullRefresh: {
                container: refreshContainer, //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                    callback: downfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    height: 50, //可选.默认50.触发上拉加载拖动距离
                    auto: true, //可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });

        render();
        search();
        nums()
    }

    function downfresh() {
        // render()
        window.location.reload()
            // mui('#refreshContainer').pullRefresh().endPulldown(true);
    }

    function search() {
        var ipt = document.getElementById('inp');
        ipt.addEventListener('keyup', function(e) {
            content.innerHTML = '';
            var key = e.keyCode;
            if (key === 13) {
                skip = 1;
                var inpt = ipt.value;
                mui.ajax('/api/list', {
                    data: {
                        limit: limit,
                        skip: skip,
                        inpt: inpt
                    },
                    success: function(rs) {
                        console.log(rs)
                        num = rs.page;
                        if (rs.code === 1) {
                            xuanran(rs.data)
                        }
                    }

                })
            }
        })
    }

    function pullfresh() {
        var that = this;
        setTimeout(function() {
            skip++;
            render();
            that.endPullupToRefresh(skip === num);

        }, 3000)

    }

    function render() {
        mui.ajax('/api/list', {
            data: {
                limit: limit,
                skip: skip
            },
            success: function(rs) {

                console.log(rs)
                num = rs.page;
                if (rs.code === 1) {
                    xuanran(rs.data)
                }
            }

        })
    }


    //点击销量进行排序
    function nums() {
        var sales = document.getElementById("sales");

        var price;
        sales.addEventListener('tap', function() {
            mui.ajax('/api/list', {
                data: {
                    limit: limit,
                    skip: skip,
                    price: price
                },
                success: function(rs) {

                    console.log(rs)
                    num = rs.page;
                    if (rs.code === 1) {
                        content.innerHTML = ""
                        xuanran(rs.data)
                    }
                }

            })
        })
    }






    function xuanran(data) {
        content.innerHTML += data.map(function(item) {
            return `<dl>
                                    <dt><img src="./img/${item.dtimg}" ></dt>
                                    <dd>
                                        <h3><img src="./img/${item.ddimg}">${item.title}</h3>
                                        <p><span>${item.method}</span></p>
                                        <p><span>￥<span>${item.price}</span></span>${item.people}人付款 ${item.address}</p>
                                        <p>${item.store} <span>进店 &gt;</span></p>
                                    </dd>
                                </dl>`
        }).join('')
    }
    init();


    // var tabs = document.getElementById('tabs');
    // var content = document.getElementById('content');
    // var input = document.getElementById('inp');
    // var sales = document.getElementById('sales');
    // var tmall = document.getElementById('tmall');
    // var lis = [...document.querySelectorAll('header>.bot>ul>li')];
    // var skip = 1;
    // var limit = 4;
    // var len = 0;

    // //初始化mui
    // mui.init({
    //     pullRefresh: {
    //         container: '.mui-scroll-wrapper', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    //         up: {
    //             height: 50, //可选.默认50.触发上拉加载拖动距离
    //             auto: false, //可选,默认false.自动上拉加载一次
    //             contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
    //             contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
    //             callback: pull //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //         }
    //     }
    // });

    // function pull() {
    //     var _this = this;
    //     setTimeout(function() {
    //         skip++;
    //         fun();
    //         _this.endPullupToRefresh(len == skip);
    //     }, 1000)

    // }

    // //初始化区域滚动
    // mui('.mui-scroll-wrapper').scroll({
    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });

    // //点击切换样式
    // tabs.addEventListener('tap', function() {
    //     content.className = content.className === 'content' ? 'content1' : 'content';
    //     this.innerHTML = this.innerHTML === '<span class="mui-icon mui-icon-starhalf"></span>' ? '<span class="mui-icon mui-icon-star"></span>' : '<span class="mui-icon mui-icon-starhalf"></span>';
    // })

    // //请求数据
    // fun();
    // //请求数据
    // function fun() {
    //     mui.ajax('/api/userlist', {
    //         data: {
    //             skip: skip,
    //             limit: limit
    //         },
    //         success: function(data) {
    //             console.log(data)
    //             if (data.code === 1) {
    //                 len = data.len;
    //                 console.log(len)
    //                 render(data.data);
    //             }
    //         }
    //     })
    // }
    // //渲染数据
    // function render(data) {
    //     content.innerHTML += data.map(function(item) {
    //         return `<dl>
    //         <dt><img src="./img/${item.dtimg}" ></dt>
    //         <dd>
    //             <h3><img src="./img/${item.ddimg}">${item.title}</h3>
    //             <p><span>${item.method}</span></p>
    //             <p><span>￥<span>${item.price}</span></span>${item.people}人付款 ${item.address}</p>
    //             <p>${item.store} <span>进店 &gt;</span></p>
    //         </dd>
    //     </dl>`
    //     }).join('')
    // }

    // enter();

    // //回车搜索功能
    // function enter() {
    //     input.onkeydown = function(e) {
    //         var e = e || e.event;
    //         if (e.keyCode === 13) {
    //             var txt = input.value;
    //             // console.log(txt)
    //             mui.ajax('/api/search', {
    //                 data: {
    //                     sea: txt
    //                 },
    //                 success: function(data) {
    //                     console.log(data)
    //                     if (data.code === 1) {
    //                         content.innerHTML = '';
    //                         render(data.data);
    //                     }
    //                 }
    //             })
    //         }
    //     }
    // }

    // //点击销量进行价格排序
    // sales.addEventListener('tap', function() {
    //     mui.ajax('/api/sortmoney', {
    //         success: function(data) {
    //             console.log(data)
    //             if (data.code === 1) {
    //                 content.innerHTML = '';
    //                 render(data.data);
    //             }
    //         }
    //     })
    // })

    // //点击天猫进行排序搜索
    // tmall.addEventListener('tap', function() {
    //     mui.ajax('/api/sortnum', {
    //         success: function(data) {
    //             console.log(data)

    //             if (data.code === 1) {
    //                 content.innerHTML = '';
    //                 render(data.data);
    //             }
    //         }
    //     })
    // })

    // var inx = 0;
    // lis.forEach(function(item, i) {
    //     item.addEventListener('tap', function() {
    //         lis[inx].classList.remove('active');
    //         inx = i;
    //         lis[inx].classList.add('active');

    //     })
    // })

})