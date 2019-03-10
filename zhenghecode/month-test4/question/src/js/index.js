require(['./js/config.js'], function() {
    require(['mui', 'dom'], function(mui, dom) {
        console.log(mui)


        function init() {
            mui.init()
            mui.ajax('/api/qs', {
                success: function(data) {
                    render(data.data);
                }
            })
        }

        init();

        function render(data) {
            con.innerHTML = data.map(function(item) {
                return `<h1 class="title">${item.qs}</h1>
            <ul class="answers">${renderLi(item.as)}</ul>
            <div class="answer">${item.rs}</div>`
            }).join('')
        }

        function renderLi(obj) {
            var html = ``;
            for (var i in obj) {
                console.log(obj);
            }
            html += `<li>span${obj[i]}</li>`

        }
    })
})