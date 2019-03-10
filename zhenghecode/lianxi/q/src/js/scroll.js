/*
 * @Author: vk 
 * @Date: 2019-03-07 22:16:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-07 22:18:15
 */
define(['mui'], function(mui) {
    mui.init({
        pullRefresh: {
            container: ".refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {

                callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });



})