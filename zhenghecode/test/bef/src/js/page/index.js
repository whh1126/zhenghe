define(["mui", 'flexible'], function(mui, flexible) {
    var page = 1;
    var total = 0;

    //上拉
    mui.init({
        pullRefresh: {
            container: ".refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                // auto: true, //可选,默认false.自动上拉加载一次
                callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    function pullfresh() {
        var that = this;
        setTimeout(function() {
            getData(page);
            page++;
            that.endPullupToRefresh(page === total);
            // console.log(111);
        }, 3000)

    }

    function getData(p) {
        mui.ajax({
            url: "/api/find",
            dataType: "json",
            data: {
                page: p,
            },
            success: function(data) {
                render(data);
                total = data.data
            }
        })
    }
    getData(1);

    function render(data) {
        data.data.forEach(function(item) {
            var html = ``;
            html += `<div class="content">
                 <div class="big">
                     <div class="continner">
                         <img src="${item.img}">
                     </div>
                     <div class="word">
                         <h3>${item.title}</h3>
                         <p>${item.yunfei}</p>
                         <div>
                             <b>￥${item.price}</b><span>2.9万人付款</span><span class="address">北京</span>
                             <div>
                                 <h4>辅导辅导辅导<em>进店</em></h4>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;
            bigcontent.innerHTML += html;
        })
    }

})