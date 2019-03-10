require(['./js/config.js'], function() {
    require(['mui', 'utils'], function(mui, utils) {
        console.log(utils);
        var uid = "";

        function init() {
            mui.ajax("/api/findUser", {
                success: function(rs) {
                    if (rs.code == 1) {
                        console.log(rs.data[0]._id);
                        // uid = rs.data[0]._id
                    }
                }
            })
        }
        init()
        console.log(utils);
        var btn = document.querySelector("#btn");
        console.log(btn);
        btn.addEventListener('tap', function() {
            location.href = "../../calculator.html";
        })

    })
})