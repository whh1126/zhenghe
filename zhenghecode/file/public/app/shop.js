var btn = [...document.querySelectorAll('.buy')];
var title = document.querySelector('.name');
var titleList = [...document.querySelectorAll('.title')];
var price = document.querySelector('.price b');
var search = decodeURI(location.search.slice(1)).split('&');
var newObj = {};
var ls = window.localStorage;
var data = JSON.parse(ls.getItem('shop')) || [];

search.map(function(v) {
    newObj[v.split('=')[0]] = v.split('=')[1];
})

titleList.map(function(v) {
    v.innerHTML = newObj.title;
})
price.innerHTML = newObj.price;

btn.map(function(v) {
    v.onclick = function() {
        var obj = {
            name: title.innerHTML,
            price: price.innerHTML,
            num: 1,
            id: newObj.id
        }
        if (data.length == 0 || !data) {
            data.push(obj);
        } else if (data.length > 0) {
            data.map(function(v) {
                if (v.id != obj.id) {
                    data.push(obj);
                } else {
                    v.num++;
                }
            })
        }

        ls.setItem('shop', JSON.stringify(data));
        location.href = '11.22.html';
    }
})