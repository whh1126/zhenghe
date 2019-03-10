require(['./js/config.js'], function() {
    require(['jquery', 'better', 'flexible'], function($, BScroll, flexible) {
        type = "normal",
            inp = inp;
        console.log(type);
        var better = new BScroll('.big');
        var mark = document.querySelector('.mark');
        var inner = document.querySelector('.inner');
        var btn = document.querySelector('.btn');
        var search = document.querySelector('#search');
        //点击头部搜索
        search.onclick = function() {
            var text = document.querySelector('#inp');
            var inp = text.value;
            console.log(inp);
        }
        init();

        function init() {
            var text = document.querySelector('#inp');
            var inp = text.value;
            var type = "price"
            $.ajax({
                url: "/api/list",
                dataType: "json",
                data: {
                    inp: inp,
                    type: type
                        // page: page,
                        // pageSize: pageSize
                },
                success: function(data) {
                    console.log(data)
                    if (data.code === 0) {
                        render(data);
                        rightList(data);
                    }
                }
            });
        }
        //渲染
        //左侧图片
        function render(data) {
            console.log(data);
            var html = ``;
            data.data.forEach(function(item) {
                html += `<img src="${item.img}">`
            })
            leftlist.innerHTML = html;

        }
        //右侧文字
        function rightList(data) {
            var righthtml = ``;
            data.data.forEach(function(item) {
                righthtml += `<div>
            <h3>${item.title}</h3>
            <p class="money">￥${item.price}</p>
            <div>
                <span>${item.yunfei}</span>
                <span>${item.people}</span>
                <span>${item.address}</span>
            </div>
        </div>`
            })
            rightlist.innerHTML += righthtml;
            bs = new BScroll('.big', {
                click: true,
                probelType: 2,
                scrollbar: true
            });
        }
        Sorts();
        //点击排序按钮
        function Sorts() {
            var lis = [...document.querySelectorAll("#ul li")];
            lis.forEach(function(item, index) {
                    console.log(item);
                    item.onclick = function() {
                            mark.style.display = "block";
                            inner.style.display = "block";

                        }
                        //关闭
                    btn.onclick = function() {
                        mark.style.display = "none";
                        inner.style.display = "none";
                    }
                    if (index === 0) {
                        console.log(111);

                    } else if (index == 1) {
                        // console.log(this.dataset.type);
                        // type = this.dataset.type; //undefined
                        inp = inp.value;
                        init();

                    }
                })
                //遮罩层里的li
            var ols = [...document.querySelectorAll('#ol li')];
            ols.forEach(function(item, index) {
                item.onclick = function() {
                    inp = inp.value;
                    type = this.dataset.type;
                    mark.style.display = "none";
                    inner.style.display = "none";
                    init();
                }
            })
        }
    })
    scroll();
    //上拉加载
    function scroll() {
        bs.on('scroll', function() {
            // console.log(this.y);
            if (this.y < this.maxScrollY - 50) {
                $('.pullUp').html('加载释放更多').addClass('filp')
            } else if (this.y > this.maxScrollY - 50) {
                $('.pullUp').html('下拉刷新').removeClass('filp')
            }
            if (this.y > 50) {
                $(".pullDown").html('释放更多')
            }
            if (this.y < 50) {
                $('.pullUp').html("下拉刷新")
            }

        })
        if (this.y > 50) {
            $('.pullDown').html("释放更多")
        }
        if (this.y < 50) {
            $('.pullDown').html('下拉刷新');
        }
        bs.on('scrollEnd', function() {
            pullUp()
        })

    }

})

// BScroll.on('scroll', function() {
//     console.log(this.y);
//     if (this.y < this.maxScrollY - 50) {
//         $('.pullUP').html('加载释放更多').addClass('filp');
//     } else if (this.y > this.maxScrollY - 50) {
//         $('.pullUP').html('下拉刷新').removeClass('filp');
//     }
//     if (this.y > 50) {
//         $('.pullDown').html('释放更多');
//     }
//     if (this.y < 50) {
//         $('.pullDown').html('下拉刷新');
//     }
// })
// BScroll.on('scrollEnd', function() {
//     if ($('.pullUP').hasClass('filp')) {
//         pullUP();
//     }
//     if ($('.pullDown').hasClass('filp')) {
//         pullDown();
//     }
// })