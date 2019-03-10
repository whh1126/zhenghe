require(['../config'], function() {
    require(['jquery', 'flexible'], function($, flexible) {
        console.log($);
        //金钱
        var money = document.querySelector("b");
        console.log(money);
        //请求ajax
        // $.ajax({
        //     url: "/api/add",
        //     dataType: "json",
        //     data: {
        //         money: 1234,
        //         type: 1
        //     },
        //     success: function(data) {
        //         console.log(data);
        //     }
        // })
    })
})