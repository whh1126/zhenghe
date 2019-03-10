init();
var page = 1;
var pageSize = 5;
var height = $('.pullDown').height() + 10;

function init() {
    $.ajax({
        url: '/render',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function(res) {
            var data = JSON.parse(res);
            console.log(data);
            render(data);
            shop();
        }
    })
}

function render(data) {
    var html = '';
    $.each(data, function(i, v) {
        html += `<dl data-price="${v.price}" data-id="${v.id}" data-name="${v.allName}">
                    <dt><img src="${v.src}" alt=""></dt>
                    <dd>${v.title}</dd>
                </dl>`;
    })
    $('.content')[0].innerHTML += html;
}

function shop() {
    var list = [...document.querySelectorAll('.content dl')];
    list.map(function(v) {
        v.onclick = function() {
            var price = this.dataset.price;
            var id = this.dataset.id;
            var title = this.dataset.name;
            location.href = 'point.html?id=' + id + '&price=' + price + '&title=' + title;
        }
    })
}

var BScroll1 = new BScroll('.left', {
    click: true,
    probeType: 2
});
var BScroll2 = new BScroll('.right', {
    click: true,
    probeType: 2
});

BScroll2.on('scroll', function() {
    if (this.y < this.maxScrollY - height) {
        $('.pullUp').html('释放加载更多...').addClass('flip');
    } else {
        $('.pullUp').html('上拉加载').removeClass('flip');
    }

    if (this.y > height) {
        $('.pullDown').html('释放刷新').addClass('flip');
    } else {
        $('.pullDown').html('下拉刷新').removeClass('flip');
    }
})

BScroll2.on('scrollEnd', function() {
    if ($('.pullUp').hasClass('flip')) {
        $('.pullUp').html('上拉加载').removeClass('flip');
        pullUp();
        BScroll2.refresh();
    } else if ($('.pullDown').hasClass('flip')) {
        $('.pullDown').html('下拉刷新').removeClass('flip');
        pullDown();
    }
})

function pullUp() {
    page++;
    init();
}

function pullDown() {
    page = 1;
    $('.content').html('');
    init();
}

$('.api').find('li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
})

var mySwiper = new Swiper('.swiper-container', {
    on: {
        slideChange: function() {
            var index = this.activeIndex;
            $('footer').find('dl').eq(index).addClass('color').siblings().removeClass('color');
        }
    }
});

$('footer').find('dl').click(function() {
    var ind = $(this).index();
    $(this).addClass('color').siblings().removeClass('color');
    mySwiper.slideTo(ind, 200)
})