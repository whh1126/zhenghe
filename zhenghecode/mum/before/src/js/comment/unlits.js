define(function() {
    var parmas = location.search;
    console.log(parmas);
    var str = parmas.slice(1).split('&');
    var obj = {};
    console.log(str);
    str.forEach(function(v, i) {
        obj[v.split('=')[0]] = v.split('=')[1];
    })

    return obj;

})