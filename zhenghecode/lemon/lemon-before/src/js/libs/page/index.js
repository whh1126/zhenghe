//获取月
require(['./js/config.js'], function(mui, picker) {
    require(['mui', 'picker', 'poppicker', 'dtpicker'], function(mui, picker, poppicker, dtpicker) {
        console.log(mui);
        console.log(picker);

    })

})





//var picker = new mui.PopPicker();
// document.querySelector('.month').addEventListener('tap', function() {
//         picker.setData([{ value: 'zz', text: '月' }]);
//         picker.show(function(selectItems) {
//             console.log(selectItems[0].text); //智子
//             console.log(selectItems[0].value); //zz 


//         })
//     })
//     //获取年
// document.querySelector('.year').addEventListener('tap', function() {
//     var dtPicker = new mui.DtPicker();
//     dtPicker.show(function(selectItems) {
//         console.log(selectItems.y); //{text: "2016",value: 2016} 
//         console.log(selectItems.m); //{text: "05",value: "05"} 
//     })

// })