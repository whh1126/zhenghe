require(['./js/config.js'], function() {
    require(['getParams', 'swiper'], function(getParams, swiper) {
        console.log(swiper);
        var data, icon, name,
            dls = [...document.querySelectorAll(".icons dl")];

        dls.forEach(function(item) {
            item.onclick = function() {
                dls.forEach(function(item) {
                    item.classList.remove('active');
                    item.children[1].classList.remove('current');
                })
                this.classList.add('active');
                this.children[1].classList.add('current');
                icon = this.children[0].className;
                name = this.children[1].innerHTML;
            }
        })
        price.innerHTML = getParams().price;
        complete.onclick = function() {
            data = {
                name: name,
                icon: icon,
                price: price.innerHTML
            }
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/bill/addBill');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function(e) {
                console.log(e.target.responseText);
                window.location.href = './index.html';
            }
            xhr.send(JSON.stringify(data));
        }


    })
})