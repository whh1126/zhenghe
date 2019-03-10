var BScroll = new BScroll('.big', {
    click: true,
    probelType: 2,
    scrollbar: true
});
//给实例对象绑定滚动事件
BScroll.on('scroll', function() {
        //获取元素的高度
        var height = pullUP.offsetheight;
        //上拉
        if (this.y < this.maxScrollY - height) {
            pullUP.innerHTML = "释放加载更多";
            pullUP.classList.add('filp')
        } else {
            pullUP.innerHTML = "上拉加载";
            pullUP.classList.remove('filp')
        }
        //下拉
        if (this.y > height) {
            pullDown.innerHTML = "释放刷新";
            pullDown.classList.add('flip')
        } else {
            pullDown.innerHTML = "下拉刷新";
            pullDown.classList.remove('flip')
        }
    })
    //滚动事件结束
BScroll.on('scrollEnd', function() {
    //如果有这个类存在就删除这个类
    if (pullDown.classList.contains('filp')) {
        pullDown.classList.remove('flip');
        pullDownfn()
    }
    if (pullUP.classList.contains('filp')) {
        pullUP.classList.add('filp');
        pullUPfn()

    }
})

function pullDownfn() {
    console.log('下拉')
}

function pullUPfn() {
    console.log('上拉');
}