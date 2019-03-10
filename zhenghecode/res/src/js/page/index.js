require(['./config'], function() {
    require(['jquery'], function($) {
        //折线图
        function ech() {
            var myChart = echarts.init(document.getElementById('box'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['做题量', '得分率']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: '做题量'
                    },
                    {
                        type: 'value',
                        name: '得分率'
                    }
                ],
                series: [{
                        name: '做题量',
                        type: 'bar',
                        data: [100, 50, 50, 50, 50, 50, 50]
                    },
                    {
                        name: '得分率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [10.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0]
                    }
                ]
            };
            myChart.setOption(option);
        }
        //获取地址栏参数
        var search = location.search.split(1);
        //截取一位以等号分割
        var id = url.split('=');
        var arr = {};
        arr[id[0]] = id[1];
        $.ajax({
            url: "/api/list",
            type: "post",
            dataType: "json",
            data: {
                id: arr.id
            },
            success: function(data) {
                var html = ``;
                html += ``;
                innerHTML = html;
                //渲染完后调用折线函数

            }
        })
    })

})