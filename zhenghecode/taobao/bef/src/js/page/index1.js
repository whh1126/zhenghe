var BScroll = new BScroll('.big', {
    probeType: 2,
    click: true,
    scrollbar: true
});
BScroll.on('scroll', function() {
    console.log(this.y);
    if (this.y < this.maxScrollY - 50) {
        $('.pullUP').html('加载释放更多').addClass('filp');
    } else if (this.y > this.maxScrollY - 50) {
        $('.pullUP').html('下拉刷新').removeClass('filp');
    }
    if (this.y > 50) {
        $('.pullDown').html('释放更多');
    }
    if (this.y < 50) {
        $('.pullDown').html('下拉刷新');
    }
})
BScroll.on('scrollEnd', function() {
    if ($('.pullUP').hasClass('filp')) {
        pullUP();
    }
    if ($('.pullDown').hasClass('filp')) {
        pullDown();
    }
})

function pullUP() {
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += `
        <div class="content">
        <div class="left">
            <div>
                <img src="img/img.PNG" alt="">
            </div>
        </div>
        <div class="right">
            <div>
                <h3>荆防颗粒方法奇偶发开发</h3>
                <p>经费公开更广阔的分开发染</p>
            </div>
            <div class="last">
                <span>开发开放</span>
                <span>算不是法</span>
            </div>
        </div>
    </div>`

    }
    $(str).appendTo('.big>div');
    BScroll.refresh();

}

function pullDown() {

}