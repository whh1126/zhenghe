window.onload = function() {
    var ul = document.querySelector('#list');
    var lis = Array.from(ul.querySelectorAll('li')); //类数组
    var inp = document.querySelector('#inp');
    var btn = document.querySelector('#btn');
    var b = document.querySelector('b');

    //点击出现日期
    b.addEventListener('tap', function() {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var date = new Date().getDate();
        var dtPicker = new mui.DtPicker({ type: "date" });
        dtPicker.show(function(selectItems) {
            console.log(selectItems.y); //{text: "2016",value: 2016} 
            console.log(selectItems.m); //{text: "05",value: "05"} 
            b.innerHTML = selectItems.m.text + "月" + selectItems.d.text + "日";
        })
    })
    mui('#list').on('tap', 'li', function() {
        //获取的是li的内容
        var lisinner = this.innerHTML;
        //如果是x获取value-1截取
        if (lisinner === "X") {
            inp.value = inp.value.substr(0, inp.value.length - 1);
        } else {
            //否则value+=li的内容
            inp.value += lisinner
        }
    })
    btn.addEventListener('tap', function() {
        window.location.href = "../../pages/create.html";
    })

    var slider = document.querySelector('#slider>div');
    console.log(slider);

    mui.ajax('/classify/iconlist', {
        dataType: "json",
        success: function(data) {
            //服务器返回响应，根据响应结果，分析是否登录成功；
            console.log(data);
            if (data.code === 1) {
                renderIcon(data.data);
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
        }
    });
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    //渲染icon
    function renderIcon(data) {
        var pageNume = Math.ceil(data.length / 10);
        console.log(pageNume);
        var arr = [];
        for (var i = 0; i < pageNume.length; i++) {
            arr.push(data.splice(0, 10));
        }
        var html = ``;
        data.forEach(function(v) {
            html += `<dl>
            <dt>
            <span class="${v.icon}"></span>
        </dt>
    </dl>`
        })
        slider.innerHTML = html;
        console.log(arr);
    }

}