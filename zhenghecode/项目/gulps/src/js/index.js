$.ajax({
    url: "/api/list",
    dataType: 'json',
    success: function(data) {
        console.log(data);
        var html = ``;
        $.each(data.data, function(index, item) {
            html += `<li>
            <p>${item.user}</p>
            <p>${item.age}</p>
            </li>`
        })
        list.innerHTML = html;
    }


})