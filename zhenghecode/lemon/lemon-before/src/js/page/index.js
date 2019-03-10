//获取月
// require(['./js/config.js'], function(mui) {
//     require(['mui', 'picker', 'poppicker', 'dtpicker'], function() {
//         // console.log(mui);
//     })

// })
var month = document.querySelector('.month');
var year = document.querySelector('.year');
var Year = new Date().getFullYear();
var Month = new Date().getMonth() + 1;
month.addEventListener('tap', function() {
        var picker = new mui.PopPicker({ type: "date" });
        picker.setData([{ value: 'month', text: '月' }, { value: 'year', text: '年' }]);
        picker.show(function(selectItems) {
            document.querySelector(".month").innerHTML = selectItems[0].text;
            if (selectItems[0].value === "year") {
                month.innerHTML = Year;
            } else if (selectItems[0].value === "month") {
                year.innerHTML = Year + "-" + Month;
            }
            console.log(selectItems[0].text); //智子
            console.log(selectItems[0].value); //zz 
        })
    })
    //获取年
year.addEventListener('tap', function() {
        var title = document.querySelector('[data-id="title-y"]');
        var titleM = document.querySelector('[data-id="title-m"]');
        var pinker = document.querySelector('[data-id="picker-m"]');
        console.log(title, titleM, pinker);
        var dtPicker = new mui.DtPicker();
        dtPicker.show(function(selectItems) {
            console.log(selectItems.y); //{text: "2016",value: 2016} 
            console.log(selectItems.m); //{text: "05",value: "05"} 
        })
    })
    //点击+号icon跳页面
var icon = document.querySelector('.mui-icon-plusempty');
icon.addEventListener('tap', function() {
        window.location.href = "../../pages/addbill.html"
    })
    //自动滑动
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});
