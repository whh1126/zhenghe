define(['mui'], function(mui) {
    var page = 1;
    var total = 0;

    function init() {
        mui.init({
            pullRefresh: {
                container: ".refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    auto: true, //可选,默认false.自动上拉加载一次
                    callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    }

    function pullfresh() {
        var that = this;
        setTimeout(function() {
            getData(page);
            page++; //页数++
            that.endPullupToRefresh(page === total);
        }, 3000)
    }
    //getData获取所有数据的函数 传入页数p 1页
    function getData(p) {
        mui.ajax('/api/findall', {
            data: {
                page: p
            },
            success: function(rs) {
                console.log(rs.total); //rs.total数据分几页
                total = rs.total;
                render(rs.data);
            }
        })
    }
    getData(1);

    function render(data) {
        var html = ``;
        data.forEach(function(item) {
            html += `<dl>
                         <dt> <img src="./img/${item.dtimg}"></dt>
                            <dd>
                             <h3> <img src ="./img/${item.ddimg}">${item.title}</h3>
                                <p><span>${item.method}</span></p>
                                <p><span>￥<span>${item.price}</span></span>${item.people}万人付款 北京</p>
                                <p>${item.store} <span>进店 &gt;</span></p>
                            </dd>
                        </dl>`
            content.innerHTML += html;
        })
    }
    //搜索
    var inp = document.querySelector('#inp');
    console.log(inp);
    inp.addEventListener('keypress', function() {
            var inps = inp.value.trim();
            if (!inps) {
                return
            }
            console.log(inps);
            mui.ajax('/api/search', {
                data: {
                    title: inps
                },
                success: function(data) {
                    if (data.code) {
                        var str = ``;
                        console.log(data.data);
                        data.data.forEach(function(item) {
                            str += `<dl>
                         <dt> <img src="./img/${item.dtimg}"></dt>
                            <dd>
                             <h3> <img src ="./img/${item.ddimg}">${item.title}</h3>
                                <p><span>${item.method}</span></p>
                                <p><span>￥<span>${item.price}</span></span>${item.people}万人付款 北京</p>
                                <p>${item.store} <span>进店 &gt;</span></p>
                            </dd>
                        </dl>`
                        })
                    }
                    content.innerHTML = str;
                }
            })
        })
        //调用区域滚动
    mui('.mui-scroll-wrapper').scroll();
    init()

    function sort() {
        var sales = document.querySelector('#sales');
        sales.addEventListener('tap', function() {
            mui.ajax('/api/sort', {
                success: function(data) {
                    if (data.code) {
                        var html = ``;
                        data.data.forEach(function(item) {
                            html += `<dl>
                         <dt> <img src="./img/${item.dtimg}"></dt>
                            <dd>
                             <h3> <img src ="./img/${item.ddimg}">${item.title}</h3>
                                <p><span>${item.method}</span></p>
                                <p><span>￥<span>${item.price}</span></span>${item.people}万人付款 北京</p>
                                <p>${item.store} <span>进店 &gt;</span></p>
                            </dd>
                        </dl>`
                            content.innerHTML = html;
                        })
                    }
                }
            })
        })

    }
    sort()






















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
    //     mui.ajax('/api/render', {
    //         data: {
    //             skip: skip,
    //             limit: limit
    //         },
    //         success: function(data) {
    //             if (data.code === 1) {
    //                 len = data.len;
    //                 // console.log(len)
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
    //             mui.ajax('/api/search', {
    //                 data: {
    //                     txt: txt
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
    //     mui.ajax('/api/sort', {
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
    //     mui.ajax('/api/sort1', {
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